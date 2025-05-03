import OpenAI from 'openai';

/**
 * Generates mock product images when OpenAI API is not available
 */
function generateMockImages(prompts: string[]): string[] {
  return prompts.map((_, index) => {
    return `https://picsum.photos/seed/product${index + 1}/1024/1024`;
  });
}

/**
 * Attempts to generate real images with OpenAI
 * Falls back to mock images if anything fails
 */
async function generateRealImages(prompts: string[], apiKey: string): Promise<string[]> {
  if (!apiKey) {
    return generateMockImages(prompts);
  }
  
  try {
    const openai = new OpenAI({ apiKey });
    
    const results = await Promise.all(
      prompts.map(async (prompt, index) => {
        try {
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Professional product photography: ${prompt}. High-end, minimalist, clean background.`,
            n: 1,
            size: "1024x1024",
          });
          
          if (response.data?.[0]?.url) {
            return response.data[0].url;
          }
          
          return `https://picsum.photos/seed/product${index}/1024/1024`;
        } catch (error) {
          console.error(`Error generating image for prompt "${prompt}":`, error);
          return `https://picsum.photos/seed/product${index}/1024/1024`;
        }
      })
    );
    return results;
  } catch (error) {
    console.error('Error initializing OpenAI or generating images:', error);
    return generateMockImages(prompts);
  }
}

/**
 * Main export function for generating images
 * Automatically handles API key presence
 */
export async function generateImages(prompts: string[]): Promise<string[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('Using mock images from Picsum (OpenAI API key not available)');
    return generateMockImages(prompts);
  }
  
  return generateRealImages(prompts, apiKey);
} 