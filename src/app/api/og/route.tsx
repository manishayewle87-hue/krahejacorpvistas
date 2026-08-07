import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Fallback values
    const hasTitle = searchParams.has('title');
    const title = hasTitle 
      ? searchParams.get('title')?.slice(0, 100) 
      : 'K Raheja Vistas Mahalunge';

    const hasCategory = searchParams.has('category');
    const category = hasCategory
      ? searchParams.get('category')?.toUpperCase()
      : 'ULTRA-PREMIUM RESIDENCES';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundImage: 'url(https://www.krahejacorpvistas.com/assets/hero-masterpiece.jpg)',
            backgroundSize: '1200px 630px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Gradient Overlay for Text Readability */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 100%)',
            }}
          />
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '60px',
              color: 'white',
              zIndex: 10,
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: 24,
                letterSpacing: '0.2em',
                color: '#d4af37', // Luxury Gold
                marginBottom: 20,
                fontWeight: 'bold',
              }}
            >
              {category}
            </div>
            
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
                textShadow: '0 4px 10px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </div>
            
            <div
              style={{
                fontSize: 32,
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
              }}
            >
              A 7.5-Acre Masterpiece at Baner Annex
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
