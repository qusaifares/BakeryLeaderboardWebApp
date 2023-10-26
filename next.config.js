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
      },
      {
        protocol: 'https',
        hostname: 'opgg-static.akamaized.net',
        port: '',
        pathname: '/meta/images/lol/champion/**'
      }
    ]
  }
}

module.exports = nextConfig;
