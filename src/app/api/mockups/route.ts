import { NextResponse } from 'next/server';

/**
 * Simple mockup API that returns local placeholder images
 */
export async function POST(req: Request) {
  try {
    const { prompts } = await req.json();
    
    if (!Array.isArray(prompts)) {
      return NextResponse.json({ error: 'Prompts must be an array' }, { status: 400 });
    }
    
    // Generate image URLs using local placeholder
    const imageUrls = prompts.map((_prompt, index) => 
      `/placeholder-product.jpg?seed=${index + 1}`
    );
    
    return NextResponse.json({ 
      urls: imageUrls,
      mockData: true
    });
    
  } catch (error) {
    console.error('Error in mockups API:', error);
    
    // Return default placeholder images on error
    return NextResponse.json({ 
      urls: [
        '/placeholder-product.jpg?seed=fallback1',
        '/placeholder-product.jpg?seed=fallback2',
        '/placeholder-product.jpg?seed=fallback3',
        '/placeholder-product.jpg?seed=fallback4'
      ],
      mockData: true,
      error: 'Used default fallback images due to error'
    });
  }
} 