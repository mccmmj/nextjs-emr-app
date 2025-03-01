/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/icons/icon-192x192.png',
        destination: '/icons/icon.svg',
        permanent: true,
      },
      {
        source: '/icons/icon-512x512.png',
        destination: '/icons/icon.svg',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 