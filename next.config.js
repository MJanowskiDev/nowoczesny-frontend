/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/products-csr",
        destination: "/products-csr/1",
      },
    ];
  },
};

module.exports = nextConfig;
