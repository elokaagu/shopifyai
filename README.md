# AI Storefront Generator

An AI-powered storefront generator using Next.js, OpenAI, and Shopify integration. Build beautiful storefronts from text prompts without coding.

## Features

- **AI Layout Generation**: Create storefronts by describing them in natural language
- **Shopify Integration**: Connect to live Shopify data or use the built-in mock data
- **Responsive Design**: Mobile-friendly layouts that work on all devices
- **Preview Mode**: See your store before finalizing
- **OpenAI Integration**: Generate product mockups (when API key is available)

## Demo

Visit the [live demo](https://storefront-generator.vercel.app) to try it out.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) OpenAI API key for image generation
- (Optional) Shopify storefront access token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-storefront-generator.git
   cd ai-storefront-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your API keys (optional):
   ```
   OPENAI_API_KEY=your_openai_api_key
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and import your GitHub repository
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Architecture

- **Next.js 15**: App Router, Server Components, Route Handlers
- **TailwindCSS**: Styling and responsive design
- **OpenAI**: For generating mockup images and layout suggestions
- **Shopify Storefront API**: For real product data (with fallback mock data)

## License

MIT
