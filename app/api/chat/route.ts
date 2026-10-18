import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { AI_SYSTEM_PROMPT } from '@/data/ai/ai-context'; // 👈 Import kiya

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const stream = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: AI_SYSTEM_PROMPT }, // 👈 Yahan use kiya
        ...messages.map((m: any) => ({ role: m.role, content: m.content })),
      ],
      stream: true,
      temperature: 0.2, // Strict and factual
      top_p: 0.9,
      max_tokens: 600,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}