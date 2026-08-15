import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photo.yupoo.com",
        pathname: "/jerseywholesale888/**",
      },
    ],
  },
};

export default nextConfig;
