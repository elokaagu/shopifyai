/**
 * Generates placeholder images for products
 * No OpenAI dependencies to avoid deployment issues
 */
export async function generateImages(prompts: string[]): Promise<string[]> {
  // Always use placeholder images to avoid OpenAI API issues
  return prompts.map((_, index) => {
    // Generate a somewhat unique seed for each product 
    const seed = `product${index + 1}`;
    return `/placeholder-product.jpg?seed=${seed}`;
  });
} 