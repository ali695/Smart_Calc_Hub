import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

    if (!DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY is not configured');
    }

    console.log('Calling DeepSeek API with messages:', messages.length);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a helpful calculator assistant for SmartCalc Hub. Your role is to:
1. Help users find the right calculator for their needs
2. Explain how to use calculators and interpret results
3. Provide context about calculations (e.g., BMI ranges, loan terms, etc.)
4. Guide users to specific calculators based on their questions

Available calculator categories:
- Finance: Loan, Mortgage, EMI, Investment, Retirement, Tax, Budget, etc.
- Health: BMI, BMR, Calorie, TDEE, Macro, Body Fat, Protein, Water Intake, etc.
- Math: Percentage, Fraction, Average, Quadratic, Pythagoras, Geometry, etc.
- Conversions: Length, Weight, Temperature, Currency, Pressure, Energy, etc.
- Science: Force, Power, Torque, Ohm's Law, pH Calculator, etc.

Be concise, friendly, and helpful. Direct users to specific calculators when appropriate.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('DeepSeek response received');

    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in deepseek-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: "I'm having trouble connecting right now. Please try asking about our calculators - I can help you find the right tool for finance, health, math, or unit conversions!"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
