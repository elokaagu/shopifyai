import OpenAI from 'openai';

// Initialize OpenAI only if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateImages(prompts: string[]): Promise<string[]> {
  // If OpenAI is not available, use Picsum for mock images
  if (!openai) {
    console.log('Using mock images from Picsum (OpenAI API key not available)');
    return prompts.map((_, index) => {
      // Use different seed for each image to get varied results
      return `https://picsum.photos/seed/product${index + 1}/1024/1024`;
    });
  }

  // If OpenAI is available, use it
  try {
    const results = await Promise.all(
      prompts.map(async (prompt) => {
        try {
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Professional product photography: ${prompt}. High-end, minimalist, clean background.`,
            n: 1,
            size: "1024x1024",
          });
          
          // Ensure we have a valid URL
          if (response.data?.[0]?.url) {
            return response.data[0].url;
          }
          
          // Fallback to Picsum if OpenAI doesn't return a valid URL
          return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1024/1024`;
        } catch (error) {
          console.error(`Error generating image for prompt "${prompt}":`, error);
          // Fallback to Picsum on error
          return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1024/1024`;
        }
      })
    );
    return results;
  } catch (error) {
    console.error('Error generating images:', error);
    // Return Picsum URLs on error
    return prompts.map((_, index) => `https://picsum.photos/seed/fallback${index}/1024/1024`);
  }
} 