import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Allow builds to continue even if ESLint finds issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Allow builds to continue even if TypeScript finds errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // (optional) if you want to control image domains later:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ✅ Rewrites for PDFs and other static files
  async rewrites() {
    return [
      {
        source: '/pdfs/:path*',
        destination: '/pdfs/:path*',
      },
      {
        source: '/:path*.pdf',
        destination: '/:path*.pdf',
      },
    ];
  },
};

export default nextConfig;

