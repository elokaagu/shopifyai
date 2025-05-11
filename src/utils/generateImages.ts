/**
 * Generates placeholder images for products (no OpenAI)
 */
export async function generateImages(prompts: string[]): Promise<string[]> {
  return prompts.map((_, index) => `/placeholder-product.jpg?seed=${index + 1}`);
} 