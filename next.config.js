/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["naszsklep-api.vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/products-csr",
        destination: "/products-csr/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
