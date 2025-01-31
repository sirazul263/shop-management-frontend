/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary's domain
  },
  env: {
    API_URL: process.env.API_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
  },
};

export default nextConfig;
