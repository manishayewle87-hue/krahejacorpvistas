'use server';

import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { sendWelcomeEmail } from '@/lib/email';

export async function submitLead(data: {
  name: string;
  email: string;
  phone: string;
  configuration: string;
}) {
  try {
    const headersList = await headers();
    const city = headersList.get('x-user-city') || 'Unknown';
    const referer = headersList.get('referer') || 'Direct';

    if (!data.name || !data.phone) {
      throw new Error('Name and Phone are required fields.');
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email || 'not-provided@example.com',
        phone: data.phone,
        configuration: data.configuration,
        geoCity: city,
        utmSource: referer,
        utmMedium: 'organic',
        utmCampaign: 'ai-widget-capture'
      }
    });

    // 🚀 Fire Email Drip — Email 1: Welcome + Brochure (instant)
    await sendWelcomeEmail({
      name: data.name,
      email: data.email || '',
      phone: data.phone,
      configuration: data.configuration,
      geoCity: city,
    });

    // 🚀 Fire CRM Webhook (Fallback/Enterprise Sync)
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'new_lead',
            source: 'K Raheja Vistas Website',
            data: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              configuration: data.configuration,
              city: city,
              referer: referer
            }
          }),
        });
      } catch (webhookError) {
        // Silently log webhook failures so we don't break the user experience
        console.error('[CRM Webhook Error] Failed to sync to external CRM:', webhookError);
      }
    }

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error('[CRM Error] Failed to submit lead:', error);
    return { success: false, error: 'Failed to capture lead. Please try again.' };
  }
}
