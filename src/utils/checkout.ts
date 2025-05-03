import { shopifyQuery } from './shopify';
import { mockCheckoutCreate } from './mockShopify';

type CheckoutItem = {
  variantId: string;
  quantity: number;
};

export async function createCheckout(items: CheckoutItem[]): Promise<{ checkoutUrl: string }> {
  try {
    // Use real Shopify checkout if credentials are available, otherwise use mock
    const useLive = !!process.env.SHOPIFY_STOREFRONT_TOKEN;
    
    if (useLive) {
      // Use real Shopify checkout
      const { checkoutCreate } = await shopifyQuery<{
        checkoutCreate: {
          checkout: {
            webUrl: string;
          };
          checkoutUserErrors: Array<{
            message: string;
          }>;
        };
      }>(`
        mutation createCheckout($input: CheckoutCreateInput!) {
          checkoutCreate(input: $input) {
            checkout {
              webUrl
            }
            checkoutUserErrors {
              message
            }
          }
        }
      `, {
        input: {
          lineItems: items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }))
        }
      });

      if (checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(checkoutCreate.checkoutUserErrors[0].message);
      }

      return { checkoutUrl: checkoutCreate.checkout.webUrl };
    } else {
      // Use mock checkout
      return mockCheckoutCreate(items);
    }
  } catch (error) {
    console.error('Error creating checkout:', error);
    return { checkoutUrl: '#error-creating-checkout' };
  }
} 