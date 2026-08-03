/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.blob.core.windows.net' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  basePath: isProd ? '/demo-waikato-equitherapy' : '',
  assetPrefix: isProd ? '/demo-waikato-equitherapy/' : '',

  trailingSlash: true,
}

module.exports = nextConfig