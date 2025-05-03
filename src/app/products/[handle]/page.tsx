import Image from 'next/image';
import { notFound } from 'next/navigation';
import { shopifyQuery } from '@/utils/shopify';
import { mockShopifyQuery } from '@/utils/mockShopify';
import AddToCartButton from '@/components/AddToCartButton';

// TypeScript interfaces
interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
      };
    }>;
  };
}

// This ensures the page is server-side rendered
export const dynamic = 'force-dynamic';

async function getProduct(handle: string): Promise<Product | null> {
  try {
    // Use real Shopify query if credentials are available, otherwise use mock
    const useLive = !!process.env.SHOPIFY_STOREFRONT_TOKEN;
    const queryFn = useLive ? shopifyQuery : mockShopifyQuery;
    
    const { product } = await queryFn<{
      product: Product | null;
    }>(`
      {
        product(handle: "${handle}") {
          id
          handle
          title
          description
          featuredImage {
            url
          }
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `, { handle });
    
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  const formattedPrice = parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode
  });

  // Get the first variant ID for the add to cart button
  const variantId = product.variants.edges[0]?.node.id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Thumbnail gallery */}
          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.edges.map((image, i) => (
                <div key={i} className="relative aspect-square rounded overflow-hidden border">
                  <Image
                    src={image.node.url}
                    alt={`${product.title} - Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">{formattedPrice}</p>
          
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          
          {/* Add to Cart Button */}
          <AddToCartButton
            variantId={variantId}
            productTitle={product.title}
          />
        </div>
      </div>
    </div>
  );
} 