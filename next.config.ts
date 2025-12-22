import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Output standalone pour Docker/Railway
  output: 'standalone',

  // Transpile modern packages for better compatibility
  transpilePackages: ['zustand', 'lucide-react'],

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@/components/ui'],
  },

  // Exclure playwright-core du bundle client
  serverExternalPackages: ['playwright-core'],
};

export default nextConfig;
