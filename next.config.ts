import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "titan-blog.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
