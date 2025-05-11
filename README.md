# AI Storefront Generator

An AI-powered storefront generator using Next.js, OpenAI, and Shopify integration. Build beautiful storefronts from text prompts without coding.

## Features

- **AI Layout Generation**: Create storefronts by describing them in natural language
- **Shopify Integration**: Connect to live Shopify data or use the built-in mock data
- **Responsive Design**: Mobile-friendly layouts that work on all devices
- **Preview Mode**: See your store before finalizing
- **OpenAI Integration**: Generate product mockups (when API key is available)

## Demo

Visit the live demo:
- Vercel: [https://shopifyai.vercel.app](https://shopifyai.vercel.app)
- GitHub Pages: [https://elokaagu.github.io/shopifyai](https://elokaagu.github.io/shopifyai)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) OpenAI API key for image generation
- (Optional) Shopify storefront access token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/elokaagu/shopifyai.git
   cd shopifyai
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

### Deploying to GitHub Pages

The project is automatically deployed to GitHub Pages when you push to the main branch. You can also manually trigger the deployment from the Actions tab.

### CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Automated testing and linting
- Type checking
- Build verification
- Automatic deployment to Vercel and GitHub Pages

## Architecture

- **Next.js 15**: App Router, Server Components, Route Handlers
- **TailwindCSS**: Styling and responsive design
- **OpenAI**: For generating mockup images and layout suggestions
- **Shopify Storefront API**: For real product data (with fallback mock data)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## About

This project was created to demonstrate how AI can be used to generate beautiful storefronts quickly and efficiently.
