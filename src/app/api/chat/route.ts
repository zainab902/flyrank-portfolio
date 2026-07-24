import { streamText } from 'ai';
import { CHAT_MODEL, CHAT_SYSTEM_PROMPT } from '../../../config/ai-model';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: CHAT_MODEL,
      system: CHAT_SYSTEM_PROMPT,
      messages,
    });

    // Replace toDataStreamResponse with toTextStreamResponse
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Streaming route error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat stream' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}