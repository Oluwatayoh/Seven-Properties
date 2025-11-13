'use server';

import { z } from 'zod';
import { generateKeywordsFromDescription } from '@/ai/flows/generate-keywords-from-description';

const schema = z.object({
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
});

export type FormState = {
  message: string;
  keywords?: string[];
  fields?: {
    description?: string;
  };
  issues?: string[];
};

export async function handleGenerateKeywords(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to generate keywords.',
      issues: validatedFields.error.flatten().fieldErrors.description,
    };
  }

  try {
    const result = await generateKeywordsFromDescription({ propertyDescription: validatedFields.data.description });
    const keywords = result.keywords.split(',').map(k => k.trim()).filter(Boolean);
    
    return {
      message: 'Keywords generated successfully.',
      keywords,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
