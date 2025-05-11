/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      // We're using local placeholder images now
    ],
  },
};

module.exports = nextConfig; 