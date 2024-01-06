/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'static.tvmaze.com',
        protocol: 'https',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
