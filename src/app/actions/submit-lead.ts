'use server';

import { z } from 'zod';
import { submitLead as recordLead } from './leads';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').or(z.literal('')).optional(),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  configuration: z.string().optional().default('Undecided'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function submitLead(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
      configuration: (formData.get('configuration') as string) || 'Undecided',
      utmSource: (formData.get('utm_source') as string) || undefined,
      utmMedium: (formData.get('utm_medium') as string) || undefined,
      utmCampaign: (formData.get('utm_campaign') as string) || undefined,
    };

    // Validate data using Zod
    const validatedData = formSchema.parse(rawData);

    // Save lead to database, trigger email and CRM webhook
    const result = await recordLead({
      name: validatedData.name,
      email: validatedData.email || 'not-provided@example.com',
      phone: validatedData.phone,
      configuration: validatedData.configuration || 'Undecided',
    });

    if (!result.success) {
      return { success: false, message: result.error || 'Failed to submit lead.' };
    }

    return {
      success: true,
      message: 'Thank you for your interest. A luxury consultant will contact you shortly.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
