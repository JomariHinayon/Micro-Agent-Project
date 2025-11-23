import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessStrategy } from '@/lib/openai';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body.topic !== 'string' || body.topic.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Invalid request. Please provide a "topic" field as a non-empty string.',
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: 'Server configuration error. OpenAI API key is missing.',
        },
        { status: 500 }
      );
    }

    const result = await generateBusinessStrategy(body.topic.trim());
    
    // Validate the result structure
    if (!result || !result.summary || !Array.isArray(result.summary) || result.summary.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to generate valid strategy points. Please try again.',
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          {
            error: 'Invalid API key configuration.',
          },
          { status: 500 }
        );
      }

      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded. Please try again later.',
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'An error occurred while generating the business strategy.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Please use POST.',
      message: 'This endpoint accepts POST requests with JSON body: {"topic": "your topic here"}',
    },
    { status: 405 }
  );
}

