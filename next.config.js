/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wunderflatsng.blob.core.windows.net',
        port: '',
        pathname: '/imagesproduction/**',
      },
    ],
  }, 
}

module.exports = nextConfig
