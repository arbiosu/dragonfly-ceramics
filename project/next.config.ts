import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "trdshamrxoipypgbujnx.supabase.co",
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [640, 750, 828, 1080, 1200], // Limit size variations
    imageSizes: [16, 32, 64, 96], // Limit size variations
  }
};

export default nextConfig;
