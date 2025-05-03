import { NextResponse } from 'next/server';
import { generateImages } from '../../../utils/generateImages';

export async function POST(req: Request) {
  try {
    const { prompts } = await req.json();
    
    if (!Array.isArray(prompts)) {
      return NextResponse.json({ error: 'Prompts must be an array' }, { status: 400 });
    }

    const imageUrls = await generateImages(prompts);
    return NextResponse.json({ urls: imageUrls });
  } catch (error) {
    console.error('Error in mockups API:', error);
    
    // Use a fallback approach for errors
    try {
      // Try to extract prompts from the request if available
      const data = await req.json();
      const reqPrompts = Array.isArray(data?.prompts) ? data.prompts : [];
      
      // Generate fallback URLs 
      const fallbackUrls = reqPrompts.map((_: unknown, index: number) => 
        `https://picsum.photos/seed/fallback${index}/800/800`
      );
      
      return NextResponse.json({ 
        urls: fallbackUrls,
        error: 'Used fallback images due to error'
      });
    } catch {
      // If we can't even read the request, just return a simple fallback array
      return NextResponse.json({ 
        urls: [
          'https://picsum.photos/seed/fallback1/800/800',
          'https://picsum.photos/seed/fallback2/800/800',
          'https://picsum.photos/seed/fallback3/800/800'
        ],
        error: 'Used default fallback images due to error'
      });
    }
  }
} 