export async function shopifyQuery<T>(query: string, variables = {}): Promise<T> {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR if using Next 14+
    }
  );
  
  const json = await res.json();
  
  if (json.errors) {
    console.error('Shopify GraphQL Error:', json.errors);
    throw new Error(`Shopify GraphQL Error: ${json.errors[0].message}`);
  }
  
  return json.data;
} 