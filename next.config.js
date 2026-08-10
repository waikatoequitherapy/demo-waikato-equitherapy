/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',

  basePath: isProd ? '/demo-waikato-equitherapy' : '',

  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.blob.core.windows.net' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
}

module.exports = nextConfig