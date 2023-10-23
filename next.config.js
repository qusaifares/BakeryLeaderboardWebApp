/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'use-credentials',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**'
      }
    ]
  }
}

module.exports = nextConfig;
