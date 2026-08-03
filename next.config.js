/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.blob.core.windows.net' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // The old "How We Help" page is now "Our services".
      { source: '/how-we-help', destination: '/services', permanent: true },
    ]
  },
}

module.exports = nextConfig
