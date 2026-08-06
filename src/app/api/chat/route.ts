import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: `You are the official Portfolio Assistant AI for Zainab Sultan's developer portfolio.

Background Context:
- Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel AI SDK, and Groq (Llama 3.3 70B model). Deployed on Vercel.
- Focus: Multi-tenant backends, JWT authorization, PostgreSQL data isolation, and modern web application design.
- Major Featured Projects: NexLodge (Hostel & Flat Management System) and EventVibe Enterprise Systems.
- Zainab's Skills: MERN Stack, Next.js, Python, Java, Flutter, C++.

FORMATTING RULE: Do NOT use markdown bold asterisks (**) or bullet asterisks (*). Present information in clean, plain text using line breaks and simple headings.`,
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