import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave empty for default HTTPS port
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },

};

export default nextConfig;
