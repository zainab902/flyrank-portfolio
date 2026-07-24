import { createAnthropic } from '@ai-sdk/anthropic';

// Initialize Anthropic provider with server-side environment key
export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Primary model configuration used across streaming routes
export const CHAT_MODEL = anthropic('claude-3-5-sonnet-20240620');

// System prompt defining persona and behavioral rules
export const CHAT_SYSTEM_PROMPT = `
You are an intelligent, concise AI assistant for Zainab Sultan's portfolio website.
Your goal is to answer questions about full-stack engineering, web architecture, MERN stack, Next.js, and projects like NexLodge and EventVibe.
Provide clear, well-structured, and helpful answers. Format code snippets cleanly using markdown code blocks.
`;