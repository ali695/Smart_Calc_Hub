import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 15, windowMs = 60000): boolean {
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

const getModeSystemPrompt = (mode: string, modeContext: string) => {
  const basePrompts: Record<string, string> = {
    math: `You are a **Math & Science Expert** for SmartCalc Hub. 

EXPERTISE:
- Solve equations step-by-step with clear explanations
- Show mathematical notation using LaTeX ($..$ for inline, $$...$$ for block)
- Explain formulas, theorems, and scientific concepts
- Cover algebra, calculus, trigonometry, geometry, physics, chemistry

RESPONSE STYLE:
- Always show your work step-by-step
- Use markdown formatting for clarity
- Include the formula before solving
- Explain WHY each step is taken`,

    finance: `You are a **Finance & Business Advisor** for SmartCalc Hub.

EXPERTISE:
- Investment calculations (compound interest, ROI, NPV)
- Loan and mortgage analysis
- Tax planning and estimation
- Budgeting and savings strategies
- Business metrics (break-even, profit margin, CAGR)

RESPONSE STYLE:
- Provide actionable financial insights
- Show calculations with clear breakdowns
- Include relevant disclaimers for financial advice
- Suggest related calculators on SmartCalc Hub`,

    health: `You are a **Health & Wellness Coach** for SmartCalc Hub.

EXPERTISE:
- BMI, BMR, TDEE calculations and interpretation
- Calorie and macro tracking guidance
- Heart rate zones and fitness metrics
- Sleep and hydration recommendations
- Weight management strategies

RESPONSE STYLE:
- Be encouraging and supportive
- Explain health metrics in simple terms
- Provide evidence-based recommendations
- Include health disclaimers when appropriate`,

    general: `You are **SmartCalc AI** - a knowledgeable, friendly assistant for SmartCalc Hub.

CAPABILITIES:
- Help users find the right calculator
- Explain calculation results clearly
- Answer questions about formulas and concepts
- Provide context for financial, health, math calculations

GUIDELINES:
- Be conversational and helpful
- Use markdown for formatting
- Suggest relevant calculators
- Keep responses clear and actionable`
  };

  return basePrompts[mode] || basePrompts.general;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!checkRateLimit(ip, 15, 60000)) {
    return new Response(
      JSON.stringify({ 
        message: "You're sending messages too quickly. Please wait a moment.",
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { messages, context, calculator, mode = 'general', modeContext, hasImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('SmartCalc AI request:', { mode, hasImage, calculator, messageCount: messages.length, ip });

    const systemPrompt = getModeSystemPrompt(mode, modeContext);
    
    const fullSystemPrompt = `${systemPrompt}

CURRENT CONTEXT: ${context || 'User is browsing SmartCalc Hub'}
${calculator ? `ACTIVE CALCULATOR: ${calculator}` : ''}

AVAILABLE CALCULATORS (100+):
📊 Finance: Loan, Mortgage, Compound Interest, Tax (US/UK/CA/IN/AU), Retirement, Savings Goal, Break-Even, Profit Margin, Credit Card Payoff, Net Worth
❤️ Health: BMI, BMR, TDEE, Calorie, Macro, Body Fat, Heart Rate, Sleep, Water Intake, Ideal Weight
🔢 Math: Percentage, Quadratic, Logarithm, Square Root, Factorial, Probability, Standard Deviation
📐 Geometry: Pythagoras, Triangle, Circle, Area, Volume
🔄 Conversions: Currency, Length, Weight, Temperature, Time Zone, Speed, Pressure
⚡ Engineering: Ohm's Law, Force, Power, Torque, Kinetic Energy
🔬 Science: pH, Molarity, Half-Life, Density

${hasImage ? 'IMAGE ANALYSIS: The user has uploaded an image. Analyze it carefully and provide helpful insights. If it contains math problems, solve them step-by-step.' : ''}

RESPONSE FORMAT:
- Use **bold** for important terms
- Use \`code\` for numbers and formulas
- Use bullet points for lists
- For math: use $...$ for inline and $$...$$ for block equations
- Keep responses helpful and concise (2-4 paragraphs typically)`;

    // Use vision-capable model if image is present
    const modelToUse = hasImage ? 'google/gemini-2.5-flash' : 'google/gemini-2.5-flash';

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: 'system', content: fullSystemPrompt },
          ...messages,
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            message: "I'm getting many requests right now. Please try again in a moment! Meanwhile, browse our **100+ calculators** for Finance, Health, Math, and more.",
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            message: "The AI service needs more credits. You can still use all our calculators! What would you like to calculate?",
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    console.log('SmartCalc AI response received for:', ip);

    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        message: "I can help you find the right calculator!\n\n📊 **Finance** - Loans, investments, budgeting\n❤️ **Health** - BMI, calories, fitness\n🔢 **Math** - Percentages, algebra, geometry\n🔄 **Conversions** - Length, weight, temperature\n\nWhat would you like to calculate?",
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});