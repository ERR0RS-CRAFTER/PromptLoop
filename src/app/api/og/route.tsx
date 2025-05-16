import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    
    if (!title) {
      return new Response('Missing title parameter', { status: 400 });
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            color: 'white',
            background: 'linear-gradient(to bottom, #4F46E5, #4338CA)',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            fontWeight: 700,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 36,
                opacity: 0.9,
                marginBottom: 24,
              }}
            >
              PromptLoop
            </span>
          </div>
          <div
            style={{
              maxWidth: 900,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              opacity: 0.8,
              marginTop: 24,
            }}
          >
            Discover high-quality AI prompts
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
} 