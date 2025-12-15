import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validate request payload
function validatePayload(body: unknown): { valid: boolean; error?: string; data?: { 
  calculatorName: string; 
  category: string; 
  inputs: Record<string, unknown>; 
  results: Record<string, unknown>;
  region?: string;
  locale?: string;
  currency?: string;
  currencySymbol?: string;
  isSimplified?: boolean;
} } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object' };
  }
  
  const payload = body as Record<string, unknown>;
  
  if (!payload.calculatorName || typeof payload.calculatorName !== 'string') {
    return { valid: false, error: 'calculatorName is required and must be a string' };
  }
  
  if (!payload.category || typeof payload.category !== 'string') {
    return { valid: false, error: 'category is required and must be a string' };
  }
  
  if (!payload.inputs || typeof payload.inputs !== 'object') {
    return { valid: false, error: 'inputs is required and must be an object' };
  }
  
  if (!payload.results || typeof payload.results !== 'object') {
    return { valid: false, error: 'results is required and must be an object' };
  }
  
  // Sanitize calculator name (max 100 chars, alphanumeric and spaces only)
  const sanitizedName = String(payload.calculatorName).slice(0, 100).replace(/[^a-zA-Z0-9\s\-]/g, '');
  
  // Normalize category
  const normalizedCategory = String(payload.category).toLowerCase().trim();
  
  return {
    valid: true,
    data: {
      calculatorName: sanitizedName,
      category: normalizedCategory,
      inputs: payload.inputs as Record<string, unknown>,
      results: payload.results as Record<string, unknown>,
      region: payload.region as string || 'global',
      locale: payload.locale as string || 'en-US',
      currency: payload.currency as string || 'USD',
      currencySymbol: payload.currencySymbol as string || '$',
      isSimplified: payload.isSimplified !== false
    }
  };
}

// Simple in-memory rate limiter (per Deno instance)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || now > current.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Region-specific context
const getRegionContext = (region: string, locale: string, currency: string, currencySymbol: string) => {
  const contexts: Record<string, string> = {
    uk: `
Use British English spelling and terminology (colour, favour, programme).
Currency: ${currencySymbol} (${currency}). Use UK tax terminology: PAYE, National Insurance, take-home pay, pension, tax year 2025/26.
Units: Metric (kg, km, °C, litres). Date format: DD/MM/YYYY.
Reference UK-specific context: HMRC guidelines, UK tax bands, pension allowances.`,
    us: `
Use American English spelling and terminology (color, favor, program).
Currency: ${currencySymbol} (${currency}). Use US tax terminology: Federal/State taxes, FICA, net income, 401(k), IRA, W-2.
Units: Imperial (lbs, miles, °F, gallons). Date format: MM/DD/YYYY.
Reference US-specific context: IRS guidelines, Federal tax brackets, Social Security.`,
    global: `
Use internationally neutral English.
Currency: ${currencySymbol} (${currency}).
Use metric units by default but be adaptable.
Provide context that applies broadly across regions.`
  };
  return contexts[region] || contexts.global;
};

// Category-specific system prompts with region awareness
const getCategoryPrompt = (category: string, region: string, locale: string, currency: string, currencySymbol: string, isSimplified: boolean) => {
  const regionContext = getRegionContext(region, locale, currency, currencySymbol);
  const lengthInstruction = isSimplified 
    ? "Keep responses to 2-3 sentences maximum. Be concise and actionable."
    : "Provide a detailed explanation in 4-6 sentences. Include specific numbers, percentages, and practical implications.";

  const basePrompts: Record<string, string> = {
    finance: `You are an AI Finance Advisor for SmartCalc Hub.
${regionContext}

Your role:
- Explain financial calculation results in clear, actionable terms
- Highlight key figures: effective rates, savings, monthly/annual amounts
- Provide context for ROI, interest rates, loan terms, and investment returns
- Use the correct regional currency symbol and format numbers appropriately

${lengthInstruction}
Be encouraging and practical. Never give specific financial advice.`,

    business: `You are an AI Business Analyst for SmartCalc Hub.
${regionContext}

Your role:
- Interpret business metrics: profit margins, break-even, ROI, growth rates
- Explain what the numbers mean for business decision-making
- Highlight key insights and optimization opportunities
- Use appropriate business terminology for the region

${lengthInstruction}
Be professional and insight-driven.`,

    'real-estate': `You are an AI Real Estate Advisor for SmartCalc Hub.
${regionContext}

Your role:
- Explain real estate calculations: cap rates, yields, mortgage payments, property taxes
- Compare buying vs renting scenarios with regional context
- Reference local market considerations (stamp duty for UK, closing costs for US)
- Provide practical property investment insights

${lengthInstruction}
Be informative and market-aware.`,

    health: `You are an AI Health Coach for SmartCalc Hub.
${regionContext}

Your role:
- Interpret health metrics: BMI, BMR, heart rate zones, calorie needs
- Explain what the numbers mean for overall health and fitness
- Provide supportive, encouraging wellness guidance
- Use appropriate units (metric or imperial based on region)

${lengthInstruction}
Be supportive and health-focused. Never provide medical diagnoses or treatment advice.`,

    math: `You are an AI Math Tutor for SmartCalc Hub.
${regionContext}

Your role:
- Explain mathematical concepts and formulas clearly
- Show the reasoning behind calculations
- Connect math to real-world applications
- Use clear, educational language

${lengthInstruction}
Be educational and approachable.`,

    science: `You are an AI Science Educator for SmartCalc Hub.
${regionContext}

Your role:
- Explain scientific calculations and their real-world significance
- Provide context for physics, chemistry, and biology formulas
- Make complex concepts accessible
- Use appropriate scientific terminology

${lengthInstruction}
Be informative and engaging.`,

    engineering: `You are an AI Engineering Consultant for SmartCalc Hub.
${regionContext}

Your role:
- Interpret engineering calculations: force, torque, power, stress
- Explain practical implications for design and safety
- Reference industry standards where relevant
- Highlight important safety considerations

${lengthInstruction}
Be precise and safety-conscious.`,

    crypto: `You are an AI Investment Analyst for SmartCalc Hub.
${regionContext}

Your role:
- Interpret cryptocurrency and investment calculations
- Explain potential returns, risks, and volatility
- Provide context for DCA strategies and profit projections
- Be balanced about risks without being alarmist

${lengthInstruction}
Be informative and balanced. This is not financial advice.`,

    conversion: `You are an AI Conversion Expert for SmartCalc Hub.
${regionContext}

Your role:
- Explain unit conversions and practical applications
- Provide context for when different units are used
- Share helpful comparisons and equivalencies
- Make conversions relatable

${lengthInstruction}
Be helpful and practical.`,

    tech: `You are an AI Tech Expert for SmartCalc Hub.
${regionContext}

Your role:
- Explain technical calculations and their applications
- Provide context for data, networking, and computing metrics
- Make technical concepts accessible
- Reference practical use cases

${lengthInstruction}
Be clear and technically accurate.`,
  };

  return basePrompts[category] || `You are an AI Assistant for SmartCalc Hub.
${regionContext}

Your role:
- Explain calculation results in simple, practical terms
- Provide useful context and real-world applications
- Be helpful and friendly

${lengthInstruction}`;
};

// Get the appropriate icon/module name for the category
const getCategoryModule = (category: string, region: string): { name: string; icon: string } => {
  const regionFlag = region === 'uk' ? '🇬🇧' : region === 'us' ? '🇺🇸' : '🌍';
  
  const modules: Record<string, { name: string; icon: string }> = {
    finance: { name: "AI Finance Advisor", icon: "💰" },
    business: { name: "AI Business Analyst", icon: "📊" },
    'real-estate': { name: "AI Real Estate Advisor", icon: "🏠" },
    health: { name: "AI Health Coach", icon: "❤️" },
    math: { name: "AI Math Tutor", icon: "🔢" },
    science: { name: "AI Science Educator", icon: "🔬" },
    engineering: { name: "AI Engineering Consultant", icon: "⚙️" },
    crypto: { name: "AI Investment Analyst", icon: "₿" },
    conversion: { name: "AI Conversion Expert", icon: "🔄" },
    tech: { name: "AI Tech Expert", icon: "💻" },
    utility: { name: "AI Assistant", icon: "✨" },
  };
  
  const normalized = category.toLowerCase().trim();
  const base = modules[normalized] || modules.utility;
  
  return {
    name: base.name,
    icon: `${base.icon}`
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!checkRateLimit(ip, 20, 60000)) { // 20 requests per minute
    return new Response(
      JSON.stringify({ 
        interpretation: "You're using AI insights very frequently. Please wait a moment before trying again.",
        moduleName: "AI Assistant",
        moduleIcon: "✨",
        error: true,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  try {
    const rawBody = await req.json();
    const validation = validatePayload(rawBody);
    
    if (!validation.valid) {
      console.error('Validation error:', validation.error);
      return new Response(
        JSON.stringify({ 
          interpretation: "Unable to process this calculation. Please try again.",
          moduleName: "AI Assistant",
          moduleIcon: "✨",
          error: true,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    
    const { calculatorName, category, inputs, results, region, locale, currency, currencySymbol, isSimplified } = validation.data!;
    console.log('AI Interpret request:', { calculatorName, category, region, from: ip });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = getCategoryPrompt(category, region || 'global', locale || 'en-US', currency || 'USD', currencySymbol || '$', isSimplified !== false);
    const moduleInfo = getCategoryModule(category, region || 'global');

    const userMessage = `Calculator: ${calculatorName}
Category: ${category}
Region: ${region || 'global'} (${locale || 'en-US'})
Currency: ${currencySymbol || '$'} (${currency || 'USD'})
Inputs: ${JSON.stringify(inputs)}
Results: ${JSON.stringify(results)}

Please provide a ${isSimplified !== false ? 'brief, concise' : 'detailed'} interpretation of these calculation results, adapted for ${region === 'uk' ? 'UK' : region === 'us' ? 'US' : 'international'} users.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            interpretation: "I'm processing a lot of requests. Your result is ready above!",
            moduleName: moduleInfo.name,
            moduleIcon: moduleInfo.icon,
            error: true,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            interpretation: "AI insights are temporarily unavailable. Your calculation is complete!",
            moduleName: moduleInfo.name,
            moduleIcon: moduleInfo.icon,
            error: true,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }

      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const interpretation = data.choices[0].message.content;

    console.log('AI interpretation generated successfully for ip:', ip);

    return new Response(
      JSON.stringify({ 
        interpretation,
        moduleName: moduleInfo.name,
        moduleIcon: moduleInfo.icon,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (error) {
    console.error('Error in AI interpret function:', error);

    // Return a graceful fallback
    return new Response(
      JSON.stringify({ 
        interpretation: "Your calculation is complete! Check the results above.",
        moduleName: "AI Assistant",
        moduleIcon: "✨",
        error: true,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
