'use server';

/**
 * @fileOverview Generates a list of low-competition keywords related to luxury real estate in Lagos, based on a property description.
 *
 * - generateKeywordsFromDescription - A function that generates keywords from a property description.
 * - GenerateKeywordsFromDescriptionInput - The input type for the generateKeywordsFromDescription function.
 * - GenerateKeywordsFromDescriptionOutput - The return type for the generateKeywordsFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeywordsFromDescriptionInputSchema = z.object({
  propertyDescription: z
    .string()
    .describe('The description of the property to generate keywords for.'),
});
export type GenerateKeywordsFromDescriptionInput = z.infer<
  typeof GenerateKeywordsFromDescriptionInputSchema
>;

const GenerateKeywordsFromDescriptionOutputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'A comma-separated list of low-competition keywords related to the property description.'
    ),
});
export type GenerateKeywordsFromDescriptionOutput = z.infer<
  typeof GenerateKeywordsFromDescriptionOutputSchema
>;

export async function generateKeywordsFromDescription(
  input: GenerateKeywordsFromDescriptionInput
): Promise<GenerateKeywordsFromDescriptionOutput> {
  return generateKeywordsFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKeywordsFromDescriptionPrompt',
  input: {schema: GenerateKeywordsFromDescriptionInputSchema},
  output: {schema: GenerateKeywordsFromDescriptionOutputSchema},
  prompt: `You are an SEO specialist for luxury real estate in Lagos, Nigeria. Generate a comma-separated list of low-competition keywords based on the following property description:

{{{propertyDescription}}}

Keywords:`, 
});

const generateKeywordsFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateKeywordsFromDescriptionFlow',
    inputSchema: GenerateKeywordsFromDescriptionInputSchema,
    outputSchema: GenerateKeywordsFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
