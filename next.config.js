/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost", "www.pexels.com", "icons8.com"],
  },
  publicRuntimeConfig: {
    mongodb_uri: process.env.DATABASE_URL,
  },
  output: "standalone",
};

module.exports = nextConfig;
