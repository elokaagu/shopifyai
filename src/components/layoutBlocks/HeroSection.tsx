'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shopifyQuery } from "@/utils/shopify";
import { mockShopifyQuery } from "@/utils/mockShopify";

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [shopName, setShopName] = useState('Your Store');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Use real Shopify query if credentials are available, otherwise use mock
        const useLive = !!process.env.SHOPIFY_STOREFRONT_TOKEN;
        const queryFn = useLive ? shopifyQuery : mockShopifyQuery;
        
        // Fetch shop data
        const { shop } = await queryFn<{ 
          shop: { 
            name: string;
            storefrontHomepageCollection?: { image?: { url: string } }
          } 
        }>(`
          { 
            shop { 
              name
              storefrontHomepageCollection { 
                image { 
                  url 
                } 
              } 
            } 
          }
        `);

        setShopName(shop.name || 'Your Store');
        
        // Set hero image if available, otherwise use Unsplash
        const heroUrl = shop.storefrontHomepageCollection?.image?.url || null;
        setHeroImage(heroUrl);
      } catch (error) {
        console.error('Error fetching shop data:', error);
        // If fetch fails, we'll fallback to default
        setHeroImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Default image URL as fallback
  const fallbackImageUrl = "https://picsum.photos/1600/900";

  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      ) : (
        <Image
          src={heroImage || fallbackImageUrl}
          alt="Modern storefront"
          fill
          priority
          className="object-cover brightness-75 z-0"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-center w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow mb-4">Welcome to {shopName}</h1>
        <p className="mt-2 text-lg sm:text-xl text-white/90 max-w-xl mx-auto drop-shadow">
          Beautiful, fast, and custom storefronts
        </p>
      </div>
    </section>
  );
} 