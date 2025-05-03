export function promptToLayout(prompt: string): string[] {
  const lower = prompt.toLowerCase();

  const layout: string[] = [];

  if (lower.includes("hero")) layout.push("HeroSection");
  if (lower.includes("product") || lower.includes("grid")) layout.push("ProductGrid");
  if (lower.includes("story")) layout.push("StorySection");
  if (lower.includes("testimonial")) layout.push("TestimonialSection");
  if (lower.includes("cta")) layout.push("CTASection");
  if (lower.includes("footer")) layout.push("FooterSection");
  if (layout.length === 0) layout.push("HeroSection", "ProductGrid"); // fallback

  return layout;
} 