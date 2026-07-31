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

export async function submitLead(prevState: any, formData: FormData) {
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

    // MOCK: Simulate saving to CRM / Database (e.g., Salesforce, Hubspot)
    console.log('--- ENRICHED ENTERPRISE LEAD RECEIVED ---');
    console.log(`Lead Name: ${validatedData.name}`);
    console.log(`Contact: ${validatedData.phone} | ${validatedData.email}`);
    console.log(`Interested In: ${validatedData.configuration}`);
    if (validatedData.utmSource) {
      console.log(`[ATTRIBUTION] Source: ${validatedData.utmSource} | Medium: ${validatedData.utmMedium} | Campaign: ${validatedData.utmCampaign}`);
    } else {
      console.log('[ATTRIBUTION] Organic/Direct');
    }
    console.log('--- POSTING TO SALESFORCE API (Simulated) ---');
    
    // Simulate network latency for CRM
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Phase 9.3: Automated Omnichannel Follow-ups (WhatsApp)
    console.log(`--- TRIGGERING WHATSAPP API (Simulated) ---`);
    console.log(`To: +91${validatedData.phone}`);
    console.log(`Message: "Hi ${validatedData.name}, thank you for your interest in K Raheja Vistas Mahalunge. Here is your requested brochure: https://krahejavistasmahalunge.com/brochure.pdf. A luxury consultant will call you shortly."`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true, message: 'Thank you for your interest. A luxury consultant will contact you shortly.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
