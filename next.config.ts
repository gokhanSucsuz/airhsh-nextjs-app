import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      },
    ]
  }
};

export default nextConfig;
