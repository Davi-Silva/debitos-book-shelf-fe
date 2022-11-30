/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BOOK_SHELF_API_ENDPOINT: process.env.BOOK_SHELF_API_ENDPOINT,
  },
};

module.exports = nextConfig;
