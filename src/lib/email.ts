/**
 * Email Drip Campaign Engine
 * Uses Resend for transactional email delivery.
 * Install: npm install resend
 * Set RESEND_API_KEY in .env.local
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'noreply@www.krahejacorpvistas.com';
const SALES_EMAIL = 'sales@www.krahejacorpvistas.com';

interface LeadEmailData {
  name: string;
  email: string;
  phone: string;
  configuration: string;
  geoCity?: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    // Silent skip in production to avoid leaking structure
    return;
  }
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
    
    if (!response.ok) {
      console.error('[Email Error]', await response.text());
    }
  } catch (error) {
    console.error('[Email Error]', error);
  }
}

// EMAIL 1: Instant welcome + brochure (fires immediately on lead capture)
export async function sendWelcomeEmail(lead: LeadEmailData) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0f1724; color: #e8dcc8; padding: 40px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 30px; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: 400; color: #d4af37; letter-spacing: 0.1em;">K Raheja Vistas</h1>
        <p style="color: rgba(232,220,200,0.6); font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;">Mahalunge, Baner Annexe, Pune</p>
      </div>
      
      <p style="color: rgba(232,220,200,0.7);">Dear ${lead.name},</p>
      
      <p style="line-height: 1.8; color: rgba(232,220,200,0.8);">
        Thank you for your interest in <strong style="color: #d4af37;">K Raheja Vistas Mahalunge</strong>. 
        We are delighted to welcome you to Pune's most coveted ultra-luxury address.
      </p>
      
      <p style="line-height: 1.8; color: rgba(232,220,200,0.8);">
        Your interest in our <strong>${lead.configuration}</strong> residences has been registered. 
        One of our senior executives will contact you at <strong>${lead.phone}</strong> shortly.
      </p>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://www.krahejacorpvistas.com" style="display: inline-block; padding: 16px 40px; background: #d4af37; color: #0f1724; font-weight: bold; text-decoration: none; letter-spacing: 0.15em; text-transform: uppercase; font-size: 13px;">
          Explore the Masterplan
        </a>
      </div>

      <div style="border-top: 1px solid rgba(212,175,55,0.3); padding-top: 30px; margin-top: 30px;">
        <p style="color: rgba(232,220,200,0.5); font-size: 12px; text-align: center;">
          MahaRERA Reg: PR1260002501530 | K Raheja Corp<br/>
          Baner Annexe, Mahalunge, Pune 411045, Maharashtra
        </p>
      </div>
    </div>
  `;
  
  await sendEmail(lead.email, 'Welcome to K Raheja Vistas — Your Journey Begins', html);
  // Also notify the internal sales team
  await sendEmail(SALES_EMAIL, `🔔 New Lead: ${lead.name} (${lead.configuration}) from ${lead.geoCity}`,
    `<p><strong>Name:</strong> ${lead.name}<br/><strong>Phone:</strong> ${lead.phone}<br/><strong>Email:</strong> ${lead.email}<br/><strong>Interest:</strong> ${lead.configuration}<br/><strong>City:</strong> ${lead.geoCity}</p>`
  );
}

// EMAIL 2: Investment market report (scheduled Day 2 — call via cron or queue)
export async function sendMarketReportEmail(lead: LeadEmailData) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0f1724; color: #e8dcc8; padding: 40px;">
      <h2 style="color: #d4af37; font-weight: 400; font-size: 22px;">Why Mahalunge is Pune's #1 Investment Zone in 2026</h2>
      <p style="color: rgba(232,220,200,0.7);">Dear ${lead.name},</p>
      <ul style="line-height: 2; color: rgba(232,220,200,0.8);">
        <li>📈 <strong>18% YoY</strong> appreciation — 3x the national average</li>
        <li>🏙️ <strong>300,000+ IT professionals</strong> in Hinjewadi corridor driving rental demand</li>
        <li>🚇 <strong>Upcoming Metro Line 3</strong> will connect Mahalunge to Central Pune</li>
        <li>🏆 <strong>K Raheja Corp</strong> — 5-decade legacy of on-time delivery</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://www.krahejacorpvistas.com/investment/real-estate-investment-baner-annexe" style="display: inline-block; padding: 14px 36px; background: #d4af37; color: #0f1724; font-weight: bold; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">
          Read Full Market Report
        </a>
      </div>
    </div>
  `;
  
  await sendEmail(lead.email, 'Why Mahalunge is Pune\'s #1 Investment Zone — Market Report', html);
}

// EMAIL 3: VIP Site Visit CTA (Day 5)
export async function sendSiteVisitEmail(lead: LeadEmailData) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0f1724; color: #e8dcc8; padding: 40px;">
      <h2 style="color: #d4af37; font-weight: 400; font-size: 22px;">Your Private VIP Site Visit Awaits, ${lead.name}</h2>
      <p style="line-height: 1.8; color: rgba(232,220,200,0.8);">
        Experience the grandeur of K Raheja Vistas Mahalunge in person. Our executive team invites you 
        for an exclusive VIP site visit — complete with a curated experience of our model residences, 
        clubhouse, and 7.5-acre masterplan.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://wa.me/919999999999?text=Hi, I would like to schedule a VIP site visit for K Raheja Vistas Mahalunge." style="display: inline-block; padding: 14px 36px; background: #25D366; color: white; font-weight: bold; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.1em;">
          Book on WhatsApp
        </a>
      </div>
    </div>
  `;
  
  await sendEmail(lead.email, 'Your Private VIP Site Visit — K Raheja Vistas Mahalunge', html);
}
