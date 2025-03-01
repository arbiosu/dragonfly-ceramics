import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
      },
    ]
  }
};

export default nextConfig;
