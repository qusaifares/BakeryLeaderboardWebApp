/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'use-credentials',
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'CDN-Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ]
      }]
  },
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
