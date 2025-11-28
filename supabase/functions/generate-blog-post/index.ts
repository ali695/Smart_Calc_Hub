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
    const { topic, category, keywords } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating blog post for topic:', topic);

    const systemPrompt = `You are an expert SEO content writer for SmartCalc Hub, a comprehensive online calculator platform. Your task is to write high-quality, SEO-optimized blog posts about calculators and related topics.

Guidelines:
- Write in-depth articles (1500+ words minimum)
- Use clear, engaging language that's accessible to general audiences
- Include practical examples and real-world applications
- Structure content with clear headings and sections
- Optimize for search engines while maintaining readability
- Include actionable tips and best practices
- Write in a professional yet conversational tone

Your output should be a JSON object with this structure:
{
  "title": "Engaging blog post title (max 60 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Compelling excerpt (150-160 chars)",
  "seoTitle": "SEO-optimized title (max 60 chars)",
  "seoDescription": "Meta description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "content": {
    "introduction": "Opening paragraph that hooks the reader and explains what they'll learn",
    "sections": [
      {
        "heading": "Section heading",
        "content": "Detailed content for this section (multiple paragraphs separated by \\n\\n)"
      }
    ],
    "conclusion": "Summary paragraph that reinforces key takeaways"
  }
}`;

    const userPrompt = `Write a comprehensive, SEO-optimized blog post about: "${topic}"

Category: ${category}
Target Keywords: ${keywords.join(', ')}

Create an engaging, informative article that:
1. Explains the topic clearly with practical examples
2. Includes 5-7 well-structured sections
3. Provides actionable tips and best practices
4. Is optimized for the target keywords naturally
5. Has a compelling introduction and strong conclusion
6. Uses real-world scenarios and case studies where relevant

Make it valuable for readers searching for calculator guides and mathematical/financial education.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Extract JSON from the response (handle markdown code blocks)
    let blogPost;
    try {
      // Try to parse the content directly
      blogPost = JSON.parse(generatedContent);
    } catch {
      // If that fails, try to extract JSON from markdown code blocks
      const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)\n```/) || 
                       generatedContent.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        blogPost = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse blog post JSON from AI response');
      }
    }

    // Add metadata
    blogPost.date = new Date().toISOString().split('T')[0];
    blogPost.author = "Ali Haider";
    blogPost.readTime = `${Math.ceil(blogPost.content.sections.reduce((acc: number, s: any) => acc + s.content.split(' ').length, 0) / 200)} min read`;

    console.log('Blog post generated successfully:', blogPost.slug);

    return new Response(
      JSON.stringify({ blogPost }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating blog post:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate blog post'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
