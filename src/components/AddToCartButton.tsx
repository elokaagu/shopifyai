'use client';

import { useState } from 'react';
import { createCheckout } from '@/utils/checkout';

interface AddToCartButtonProps {
  variantId: string;
  productTitle: string;
  quantity?: number;
}

export default function AddToCartButton({ 
  variantId, 
  productTitle, 
  quantity = 1 
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!variantId) {
      console.error('No variant ID available');
      return;
    }

    setIsLoading(true);
    try {
      const { checkoutUrl } = await createCheckout([
        { variantId, quantity }
      ]);
      
      if (checkoutUrl === '#mock-checkout') {
        // For mock checkout, show an alert
        alert(`Added to cart: ${quantity} x ${productTitle}`);
      } else {
        // For real checkout, redirect to Shopify checkout
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding this item to your cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || !variantId}
      className="w-full py-3 px-6 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
    </button>
  );
} 