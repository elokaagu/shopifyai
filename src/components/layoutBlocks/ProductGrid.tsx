'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { shopifyQuery } from "@/utils/shopify";
import { mockShopifyQuery } from "@/utils/mockShopify";

type Product = {
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use real Shopify query if credentials are available, otherwise use mock
        const useLive = !!process.env.SHOPIFY_STOREFRONT_TOKEN;
        const queryFn = useLive ? shopifyQuery : mockShopifyQuery;
        
        // Fetch products
        const data = await queryFn<{
          products: {
            edges: Array<{
              node: Product;
            }>;
          };
        }>(`
          {
            products(first: 8) {
              edges {
                node {
                  id
                  handle
                  title
                  featuredImage {
                    url
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        `);
        
        const fetchedProducts = data.products.edges.map(edge => edge.node);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              href={`/products/${product.handle}`} 
              key={product.id}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-gray-100">
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-lg">{product.title}</h3>
              <p className="text-gray-700">
                {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('en-US', {
                  style: 'currency',
                  currency: product.priceRange.minVariantPrice.currencyCode
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
} 