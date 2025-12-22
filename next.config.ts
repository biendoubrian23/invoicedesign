import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

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
};

export default nextConfig;
