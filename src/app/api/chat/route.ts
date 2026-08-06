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

When asked about the portfolio, tech stack, or projects, use this background context:
- Portfolio Tech Stack: Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel AI SDK, and Groq (Llama 3.3 70B model). Deployed on Vercel.
- Core Engineering Focus: Multi-tenant backends, JWT authorization, PostgreSQL data isolation, and modern web application design.
- Major Featured Projects:
  1. NexLodge — Smart Hostel & Flat Management System (React, Flutter, Node.js, PostgreSQL).
  2. EventVibe Enterprise Systems — Full-stack event management platform (MERN stack).
- Zainab's Primary Stack: MERN (MongoDB, Express, React, Node.js), Next.js, Python, Java, Flutter, C++.

Keep answers concise, professional, direct, and well-formatted.`,
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