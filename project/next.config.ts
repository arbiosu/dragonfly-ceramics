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
  }
};

export default nextConfig;
