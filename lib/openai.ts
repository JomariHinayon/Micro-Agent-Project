import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BusinessStrategyResponse {
  summary: string[];
}

/**
 * Generates a three-point business strategy summary for a given topic
 * @param topic - The business topic to generate strategy for
 * @returns - A structured response with three strategy points
 */
export async function generateBusinessStrategy(
  topic: string
): Promise<BusinessStrategyResponse> {
  const prompt = `Generate a three-point business strategy summary for the topic: "${topic}". 

Please provide exactly three concise, actionable business strategy points. Each point should be a complete sentence that offers strategic insight or actionable advice.

Format your response as three distinct points, numbered 1, 2, and 3.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a business strategy expert. Provide clear, actionable, and strategic business advice.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText =
      completion.choices[0]?.message?.content || 'No response generated';

    // Parse the response to extract three points
    const points = extractThreePoints(responseText);

    return {
      summary: points,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate business strategy');
  }
}

/**
 * Extracts three strategy points from the LLM response
 * Handles various formats (numbered lists, bullet points, etc.)
 */
function extractThreePoints(text: string): string[] {
  // Remove markdown formatting if present
  let cleaned = text.replace(/```[\s\S]*?```/g, '').trim();

  // Try to extract numbered points (1., 2., 3. or 1) 2) 3))
  const numberedPattern = /(?:^|\n)\s*(?:[1-3][\.\)]\s*)(.+?)(?=\n\s*(?:[1-3][\.\)]|$))/g;
  const numberedMatches = Array.from(cleaned.matchAll(numberedPattern));

  if (numberedMatches.length >= 3) {
    return numberedMatches.slice(0, 3).map((match) => match[1].trim());
  }

  // Try bullet points (-, *, •)
  const bulletPattern = /(?:^|\n)\s*[-*•]\s*(.+?)(?=\n\s*[-*•]|$)/g;
  const bulletMatches = Array.from(cleaned.matchAll(bulletPattern));

  if (bulletMatches.length >= 3) {
    return bulletMatches.slice(0, 3).map((match) => match[1].trim());
  }

  // Fallback: split by newlines and take first three non-empty lines
  const lines = cleaned
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.match(/^(point|strategy|summary)/i));

  if (lines.length >= 3) {
    return lines.slice(0, 3);
  }

  // Last resort: split the text into three roughly equal parts
  const words = cleaned.split(/\s+/);
  const chunkSize = Math.ceil(words.length / 3);
  return [
    words.slice(0, chunkSize).join(' '),
    words.slice(chunkSize, chunkSize * 2).join(' '),
    words.slice(chunkSize * 2).join(' '),
  ];
}

