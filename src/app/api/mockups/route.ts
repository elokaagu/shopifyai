import { NextResponse } from 'next/server';

/**
 * Simple mockup API that returns Picsum images
 * No need to use OpenAI in this version
 */
export async function POST(req: Request) {
  try {
    const { prompts } = await req.json();
    
    if (!Array.isArray(prompts)) {
      return NextResponse.json({ error: 'Prompts must be an array' }, { status: 400 });
    }
    
    // Generate fallback URLs directly without OpenAI
    const imageUrls = prompts.map((_prompt, index) => 
      `https://picsum.photos/seed/product${index + 1}/1024/1024`
    );
    
    return NextResponse.json({ 
      urls: imageUrls,
      mockData: true
    });
    
  } catch (error) {
    console.error('Error in mockups API:', error);
    
    // Return a default set of image URLs on error
    return NextResponse.json({ 
      urls: [
        'https://picsum.photos/seed/fallback1/1024/1024',
        'https://picsum.photos/seed/fallback2/1024/1024',
        'https://picsum.photos/seed/fallback3/1024/1024',
        'https://picsum.photos/seed/fallback4/1024/1024'
      ],
      mockData: true,
      error: 'Used default fallback images due to error'
    });
  }
} 