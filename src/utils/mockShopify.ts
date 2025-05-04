// utils/mockShopify.ts
export async function mockShopifyQuery<T>(query: string, vars: { handle?: string } = {}): Promise<T> {
  // Check what data to return based on the query
  if (query.includes("shop")) {
    return {
      shop: { 
        name: "Demo Store", 
        storefrontHomepageCollection: { 
          image: { 
            url: "/placeholder-hero.jpg"
          } 
        } 
      }
    } as unknown as T;
  }
  
  if (query.includes("products")) {
    // If the query contains a handle, return a single product
    if (query.includes("handle:") && vars.handle) {
      const handle = vars.handle;
      const product = MOCK_PRODUCTS.find(p => p.handle === handle);
      
      return {
        product: product || MOCK_PRODUCTS[0]
      } as unknown as T;
    }
    
    // Otherwise return all products
    return {
      products: {
        edges: MOCK_PRODUCTS.map(product => ({ node: product }))
      }
    } as unknown as T;
  }
  
  if (query.includes("checkoutCreate")) {
    return {
      checkoutCreate: {
        checkout: {
          webUrl: "#mock-checkout"
        },
        checkoutUserErrors: []
      }
    } as unknown as T;
  }
  
  // Default fallback
  return {} as T;
}

// Mock checkout creation
export async function mockCheckoutCreate(items: any[]) {
  console.log("Mock checkout created with items:", items);
  return { checkoutUrl: "#mock-checkout" };
}

// Mock product data
const MOCK_PRODUCTS = [
  { 
    id: "prod_1", 
    handle: "modern-chair", 
    title: "Modern Chair", 
    description: "A sleek, minimalist chair perfect for any modern home.",
    priceRange: {
      minVariantPrice: {
        amount: "149.99",
        currencyCode: "USD"
      }
    },
    featuredImage: { 
      url: "/placeholder-product.jpg?seed=chair"
    },
    images: {
      edges: [
        { node: { url: "/placeholder-product.jpg?seed=chair" } },
        { node: { url: "/placeholder-product.jpg?seed=chair2" } }
      ]
    },
    variants: {
      edges: [
        { node: { id: "variant_1_1" } }
      ]
    }
  },
  { 
    id: "prod_2", 
    handle: "desk-lamp", 
    title: "Desk Lamp", 
    description: "Adjustable desk lamp with warm lighting for your workspace.",
    priceRange: {
      minVariantPrice: {
        amount: "49.99",
        currencyCode: "USD"
      }
    },
    featuredImage: { 
      url: "/placeholder-product.jpg?seed=lamp"
    },
    images: {
      edges: [
        { node: { url: "/placeholder-product.jpg?seed=lamp" } },
        { node: { url: "/placeholder-product.jpg?seed=lamp2" } }
      ]
    },
    variants: {
      edges: [
        { node: { id: "variant_2_1" } }
      ]
    }
  },
  { 
    id: "prod_3", 
    handle: "throw-pillow", 
    title: "Decorative Throw Pillow", 
    description: "Soft, comfortable throw pillows to accent your furniture.",
    priceRange: {
      minVariantPrice: {
        amount: "29.99",
        currencyCode: "USD"
      }
    },
    featuredImage: { 
      url: "/placeholder-product.jpg?seed=pillow"
    },
    images: {
      edges: [
        { node: { url: "/placeholder-product.jpg?seed=pillow" } },
        { node: { url: "/placeholder-product.jpg?seed=pillow2" } }
      ]
    },
    variants: {
      edges: [
        { node: { id: "variant_3_1" } }
      ]
    }
  },
  { 
    id: "prod_4", 
    handle: "coffee-table", 
    title: "Minimalist Coffee Table", 
    description: "Elegant coffee table with clean lines and sturdy construction.",
    priceRange: {
      minVariantPrice: {
        amount: "199.99",
        currencyCode: "USD"
      }
    },
    featuredImage: { 
      url: "/placeholder-product.jpg?seed=table"
    },
    images: {
      edges: [
        { node: { url: "/placeholder-product.jpg?seed=table" } },
        { node: { url: "/placeholder-product.jpg?seed=table2" } }
      ]
    },
    variants: {
      edges: [
        { node: { id: "variant_4_1" } }
      ]
    }
  }
]; 