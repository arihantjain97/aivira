/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable server components for static export
    serverComponentsExternalPackages: [],
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in all environments to prevent ENOENT errors
    config.cache = false;
    
    // Handle client-side only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Suppress Supabase WebSocket warnings
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Can't resolve 'encoding'/,
    ];
    
    return config;
  },
};

module.exports = nextConfig;