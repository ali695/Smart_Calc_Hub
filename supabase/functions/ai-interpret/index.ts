import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Category-specific system prompts for contextual AI interpretation
const categoryPrompts: Record<string, string> = {
  finance: `You are an AI Finance Advisor for SmartCalc Hub. Your role is to:
- Explain financial calculation results in simple, actionable terms
- Compare savings opportunities and highlight potential risks
- Provide context for ROI, interest rates, loan terms, and investment returns
- Give brief, personalized financial tips based on the calculation
Keep responses to 2-3 sentences maximum. Be encouraging and practical.`,

  business: `You are an AI Business Analyst for SmartCalc Hub. Your role is to:
- Interpret business metrics like profit margins, break-even points, and ROI
- Explain what the numbers mean for business decision-making
- Highlight key insights and suggest areas for optimization
- Provide actionable business recommendations
Keep responses to 2-3 sentences maximum. Be professional and insightful.`,

  'real-estate': `You are an AI Real Estate Advisor for SmartCalc Hub. Your role is to:
- Explain real estate calculations like cap rates, property taxes, and rental yields
- Compare buying vs renting scenarios and highlight financial implications
- Provide market-aware insights for property investment decisions
- Give practical tips for real estate financial planning
Keep responses to 2-3 sentences maximum. Be informative and helpful.`,

  health: `You are an AI Health Coach for SmartCalc Hub. Your role is to:
- Interpret health metrics like BMI, BMR, heart rate zones, and calorie needs
- Explain what the numbers mean for overall health and fitness
- Provide personalized wellness tips based on the calculation results
- Be encouraging and supportive while being medically accurate
Keep responses to 2-3 sentences maximum. Be supportive and health-focused.`,

  math: `You are an AI Math Tutor for SmartCalc Hub. Your role is to:
- Explain mathematical concepts and formulas in clear, understandable terms
- Show step-by-step reasoning behind calculations
- Connect math concepts to real-world applications
- Help users understand the "why" behind the numbers
Keep responses to 2-3 sentences maximum. Be educational and clear.`,

  science: `You are an AI Science Educator for SmartCalc Hub. Your role is to:
- Explain scientific calculations and their real-world significance
- Provide context for physics, chemistry, and engineering formulas
- Connect scientific principles to practical applications
- Make complex concepts accessible and interesting
Keep responses to 2-3 sentences maximum. Be informative and engaging.`,

  engineering: `You are an AI Engineering Consultant for SmartCalc Hub. Your role is to:
- Interpret engineering calculations like force, torque, power, and stress
- Explain practical implications for design and safety
- Provide context for engineering standards and best practices
- Highlight important considerations and safety factors
Keep responses to 2-3 sentences maximum. Be precise and safety-conscious.`,

  crypto: `You are an AI Investment Analyst for SmartCalc Hub. Your role is to:
- Interpret cryptocurrency and investment calculations
- Explain potential returns, risks, and volatility factors
- Provide context for DCA strategies and profit projections
- Give balanced insights without financial advice disclaimers overwhelming the message
Keep responses to 2-3 sentences maximum. Be informative and balanced.`,

  conversion: `You are an AI Conversion Expert for SmartCalc Hub. Your role is to:
- Explain unit conversions and their practical applications
- Provide context for when different units are commonly used
- Share interesting facts about measurement systems
- Help users understand relative scales and comparisons
Keep responses to 2-3 sentences maximum. Be helpful and informative.`,

  utility: `You are an AI Assistant for SmartCalc Hub. Your role is to:
- Explain utility calculations in simple, practical terms
- Provide context and real-world applications for the results
- Suggest how users can apply this information
- Be friendly and helpful
Keep responses to 2-3 sentences maximum. Be clear and practical.`,

  default: `You are an AI Assistant for SmartCalc Hub. Your role is to:
- Explain calculation results in simple, understandable terms
- Provide practical context and real-world applications
- Give helpful tips related to the calculation
Keep responses to 2-3 sentences maximum. Be friendly and informative.`
};

// Get the appropriate icon/module name for the category
const getCategoryModule = (category: string): { name: string; icon: string } => {
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
    utility: { name: "AI Assistant", icon: "✨" },
  };
  return modules[category] || modules.utility;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { calculatorName, category, inputs, results } = await req.json();
    
    console.log('AI Interpret request:', { calculatorName, category, inputs, results });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = categoryPrompts[category] || categoryPrompts.default;
    const moduleInfo = getCategoryModule(category);

    const userMessage = `Calculator: ${calculatorName}
Category: ${category}
Inputs: ${JSON.stringify(inputs)}
Results: ${JSON.stringify(results)}

Please provide a brief, insightful interpretation of these calculation results.`;

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
          { role: 'user', content: userMessage }
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
            error: true
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            interpretation: "AI insights are temporarily unavailable. Your calculation is complete!",
            moduleName: moduleInfo.name,
            moduleIcon: moduleInfo.icon,
            error: true
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const interpretation = data.choices[0].message.content;

    console.log('AI interpretation generated successfully');

    return new Response(
      JSON.stringify({ 
        interpretation,
        moduleName: moduleInfo.name,
        moduleIcon: moduleInfo.icon
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI interpret function:', error);
    
    // Return a graceful fallback
    return new Response(
      JSON.stringify({ 
        interpretation: "Your calculation is complete! Check the results above.",
        moduleName: "AI Assistant",
        moduleIcon: "✨",
        error: true
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
