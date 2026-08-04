import { tool } from 'ai';
import { z } from 'zod';

export const projectScoreTool = tool({
  description: 'Evaluates and scores a web application project based on architecture and performance.',
  inputSchema: z.object({
    projectName: z.string().describe('Name of the project being evaluated'),
    category: z.string().describe('Primary technology stack or category'),
  }),
  execute: async ({ projectName, category }) => {
    await new Promise((res) => setTimeout(res, 1000));

    if (projectName.toLowerCase().includes('fail')) {
      throw new Error(`Unable to fetch metrics for "${projectName}". Server unverified.`);
    }

    return {
      projectName,
      category,
      score: 94,
      metrics: {
        architecture: '96/100',
        accessibility: '92/100',
        performance: '94/100',
      },
      status: 'VERIFIED',
      evaluatedAt: new Date().toISOString(),
    };
  },
});