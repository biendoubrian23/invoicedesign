import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Transpile modern packages for better compatibility
  transpilePackages: ['zustand', 'lucide-react'],

  // Optimize images for better LCP and CLS
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow multiple quality levels for optimization
    qualities: [75, 90, 100],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@/components/ui'],
  },
};

export default nextConfig;
