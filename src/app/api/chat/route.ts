import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("API Route Error:", error);

    return new Response(
      JSON.stringify({
        error: error.message ?? "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}