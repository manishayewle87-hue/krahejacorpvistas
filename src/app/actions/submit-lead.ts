'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  configuration: z.enum(['2BHK', '3BHK', 'Duplex', 'Undecided']),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLead(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      configuration: formData.get('configuration'),
      utmSource: formData.get('utm_source'),
      utmMedium: formData.get('utm_medium'),
      utmCampaign: formData.get('utm_campaign'),
    };

    // Validate data using Zod
    const validatedData = formSchema.parse(rawData);

    // Send email using Resend
    await resend.emails.send({
      from: 'Leads <onboarding@resend.dev>',
      to: 'propsmartrealty@gmail.com',
      subject: `New Lead: ${validatedData.name} - K Raheja Vistas Mahalunge`,
      text: `
--- NEW ENQUIRY LEAD ---

Name: ${validatedData.name}
Phone: ${validatedData.phone}
Email: ${validatedData.email}
Configuration: ${validatedData.configuration}

--- ATTRIBUTION ---
Source: ${validatedData.utmSource || 'Organic/Direct'}
Medium: ${validatedData.utmMedium || 'N/A'}
Campaign: ${validatedData.utmCampaign || 'N/A'}
      `,
    });

    return { success: true, message: 'Thank you for your interest. A luxury consultant will contact you shortly.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
