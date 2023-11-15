/** @type {import('next').NextConfig} */

const NO_CACHE_HEADERS = [
  { key: 'Cache-Control', value: 'no-cache' },
  { key: 'CDN-Cache-Control', value: 'no-cache' },
  { key: 'Vercel-CDN-Cache-Control', value: 'no-cache' },
]

const nextConfig = {
  crossOrigin: 'use-credentials',
  async headers() {
    return [
      {
        source: '/',
        headers: [...NO_CACHE_HEADERS],
      },
      {
        source: '/api/leaderboard',
        headers: [...NO_CACHE_HEADERS],
      },
      {
        source: '/api/active-game',
        headers: [...NO_CACHE_HEADERS],
      },
    ]
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
