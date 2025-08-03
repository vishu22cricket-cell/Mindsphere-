import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sourceType, content, title } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Generate comprehensive course content based on input
    const systemPrompt = `You are an expert educational content creator. Generate comprehensive, detailed, and practical course content including notes, quizzes, and flashcards. Make the content professional, actionable, and suitable for adult learners. Focus on practical applications and real-world examples.`;

    let userPrompt = '';
    if (sourceType === 'youtube') {
      userPrompt = `Based on this YouTube video: "${content}", create a comprehensive course titled "${title}". Generate:

1. DETAILED NOTES (3 sections, each 400+ words):
   - Core concepts with deep explanations
   - Implementation strategies with step-by-step guidance  
   - Advanced insights with practical applications

2. CHALLENGING QUIZZES (5 questions):
   - Multiple choice questions testing comprehension
   - Include detailed explanations for correct answers
   - Cover beginner to advanced concepts

3. FLASHCARDS (6 cards):
   - Key concepts and definitions
   - Important formulas or frameworks
   - Practical tips and best practices

Make the content professional, comprehensive, and immediately applicable. Include specific examples, case studies, and actionable insights.`;
    } else {
      userPrompt = `Based on this PDF document: "${content}", create a comprehensive course titled "${title}". Generate:

1. DETAILED NOTES (3 sections, each 400+ words):
   - Core concepts from the document with deep analysis
   - Practical implementation guidelines
   - Advanced applications and case studies

2. CHALLENGING QUIZZES (5 questions):
   - Multiple choice questions testing document comprehension
   - Include detailed explanations for correct answers
   - Progressive difficulty from basic to advanced

3. FLASHCARDS (6 cards):
   - Key terminology and definitions from the document
   - Important frameworks or methodologies
   - Critical insights and takeaways

Make the content professional, comprehensive, and immediately applicable. Extract the most valuable insights and present them in an engaging, educational format.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Parse the generated content to extract structured data
    const parseContent = (content: string) => {
      const sections = content.split(/(?=\d+\.\s+(?:DETAILED NOTES|CHALLENGING QUIZZES|FLASHCARDS))/);
      
      const notes = [];
      const quizzes = [];
      const flashcards = [];

      sections.forEach(section => {
        if (section.includes('DETAILED NOTES')) {
          // Extract notes sections
          const noteMatches = section.match(/### (.+?)\n([\s\S]*?)(?=###|$)/g);
          if (noteMatches) {
            noteMatches.forEach(match => {
              const [, title] = match.match(/### (.+?)\n/) || [];
              const content = match.replace(/### .+?\n/, '').trim();
              if (title && content) {
                notes.push({
                  title,
                  content,
                  duration: `${Math.ceil(content.split(' ').length / 200)} min read`
                });
              }
            });
          }
        } else if (section.includes('CHALLENGING QUIZZES')) {
          // Extract quiz questions
          const quizMatches = section.match(/\*\*Question \d+:\*\*(.+?)(?=\*\*Question \d+:\*\*|$)/gs);
          if (quizMatches) {
            quizMatches.forEach(match => {
              const questionMatch = match.match(/\*\*Question \d+:\*\*\s*(.+?)\n/);
              const optionsMatch = match.match(/(?:a\)|A\)).+/g);
              const correctMatch = match.match(/\*\*Correct:\*\*\s*([a-dA-D])/);
              const explanationMatch = match.match(/\*\*Explanation:\*\*\s*([\s\S]+?)(?=\n\n|$)/);

              if (questionMatch && optionsMatch && correctMatch) {
                const options = optionsMatch.map(opt => opt.replace(/^[a-dA-D]\)\s*/, ''));
                const correctIndex = correctMatch[1].toLowerCase().charCodeAt(0) - 97;
                
                quizzes.push({
                  question: questionMatch[1].trim(),
                  options,
                  correct: correctIndex,
                  explanation: explanationMatch ? explanationMatch[1].trim() : 'Explanation not provided.'
                });
              }
            });
          }
        } else if (section.includes('FLASHCARDS')) {
          // Extract flashcards
          const cardMatches = section.match(/\*\*Front:\*\*(.+?)\*\*Back:\*\*(.+?)(?=\*\*Front:|$)/gs);
          if (cardMatches) {
            cardMatches.forEach(match => {
              const frontMatch = match.match(/\*\*Front:\*\*\s*(.+?)\n/);
              const backMatch = match.match(/\*\*Back:\*\*\s*([\s\S]+?)(?=\n\n|$)/);
              
              if (frontMatch && backMatch) {
                flashcards.push({
                  front: frontMatch[1].trim(),
                  back: backMatch[1].trim(),
                  category: "Generated Content"
                });
              }
            });
          }
        }
      });

      return { notes, quizzes, flashcards };
    };

    const parsedContent = parseContent(generatedContent);

    // Fallback content if parsing fails
    if (parsedContent.notes.length === 0) {
      parsedContent.notes = [
        {
          title: "Core Concepts and Fundamentals",
          content: generatedContent.substring(0, 800) + "...",
          duration: "8 min read"
        }
      ];
    }

    return new Response(JSON.stringify({
      success: true,
      courseContent: parsedContent,
      rawContent: generatedContent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-course-content function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});