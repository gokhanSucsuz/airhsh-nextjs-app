import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "nddzbywrtjksexatittj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },{
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w320/**",
      },
    ]
  }
};

export default nextConfig;
