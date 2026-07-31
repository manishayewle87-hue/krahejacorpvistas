import { NextResponse } from 'next/server';
import seoDatabase from '@/data/seo-database.json';

const DOMAIN = 'krahejavistasmahalunge.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'default-indexnow-key'; // Ensure this matches the key file hosted on root

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { startIndex = 0, count = 50 } = body;
    
    // Grab a batch of URLs from our database
    const dynamicSlugs = Object.keys(seoDatabase);
    const chunkedSlugs = dynamicSlugs.slice(startIndex, startIndex + count);
    
    const urlList = chunkedSlugs.map((slug) => `https://${DOMAIN}/${slug}`);
    
    const indexNowPayload = {
      host: DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
      urlList: urlList
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: `Submitted ${urlList.length} URLs to IndexNow`, urls: urlList });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: 'IndexNow submission failed', details: errorText }, { status: response.status });
    }
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
