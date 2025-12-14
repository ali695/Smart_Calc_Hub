import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiter (per Deno instance)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!checkRateLimit(ip, 10, 60000)) {
    return new Response(
      JSON.stringify({ 
        message: "Too many requests from your IP. Please wait a moment before trying again.",
      }),
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Calling Lovable AI with messages:', messages.length, 'from ip:', ip);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a helpful calculator assistant for SmartCalc Hub. Your role is to:

1. Help users find the right calculator for their needs
2. Explain how to use calculators and interpret results
3. Provide context about calculations (e.g., BMI ranges, loan terms, financial planning)
4. Guide users to specific calculators based on their questions
5. Be conversational, friendly, and provide detailed explanations when needed

Available calculator categories on SmartCalc Hub:

**Finance (20+ calculators):**
- Loans: Loan Calculator, Mortgage Calculator, EMI Calculator, Car Loan
- Investments: Compound Interest, Simple Interest, Investment Return, Retirement Calculator
- Budgeting: Budget Planner, Savings Goal, Tax Calculator, Salary After Tax
- Analysis: Break-Even, Profit Margin, Discount, Inflation, Credit Card Payoff, Net Worth, Debt-to-Income, LTV

**Health & Fitness (18+ calculators):**
- Body Metrics: BMI, Body Fat, Ideal Weight, Waist-to-Height Ratio, Body Surface Area
- Nutrition: BMR, TDEE, Calorie Calculator, Macro Calculator, Protein Calculator, Calorie Deficit, Water Intake
- Fitness: Heart Rate Calculator, Blood Pressure, Steps Calculator, Sleep Calculator
- Women's Health: Pregnancy Calculator, Menstrual Calculator, Basal Temperature

**Math (18+ calculators):**
- Basic: Percentage, Percentage Change, Fraction, Average, Ratio
- Algebra: Quadratic, Exponent, Logarithm, Scientific Notation, Square Root
- Geometry: Pythagoras, Triangle Area, Circle, Area-Perimeter, Volume
- Advanced: Factorial, Permutation-Combination, Prime Number

**Trigonometry (7 calculators):**
- Sine, Cosine, Tangent, Arcsin, Arccos, Arctan, Radian-Degree Converter

**Conversions (9 calculators):**
- Length, Weight, Temperature, Currency, Area, Speed, Pressure, Energy, Timezone

**Science & Physics (5 calculators):**
- Force, Power, Torque, Ohm's Law, pH Calculator

**Utilities (4 calculators):**
- Age Calculator, Base64 Encoder/Decoder, Hash Generator, JSON Formatter

When helping users:
- Ask clarifying questions if needed
- Provide specific calculator recommendations with brief explanations
- Explain what inputs they'll need
- Share relevant tips or context about the calculation
- Keep responses clear, concise, and helpful (2-4 sentences typically)
- Use emojis sparingly for friendliness

Be knowledgeable, accurate, and guide users confidently to the right tools.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            message: "I'm getting a lot of requests right now. Please try again in a moment! In the meantime, feel free to browse our 90+ calculators for Finance, Health, Math, and more.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            message: "The AI service needs more credits. But don't worry - you can still browse all our calculators! What would you like to calculate? Finance, Health, Math, or Conversions?",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Lovable AI response received successfully for ip:', ip);

    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        message: "I can help you find the right calculator! We have 90+ tools:\n\n📊 Finance - Loans, investments, budgeting\n❤️ Health - BMI, calories, fitness tracking\n🔢 Math - Percentages, algebra, geometry\n🔄 Conversions - Length, weight, temperature\n\nWhat would you like to calculate?",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
