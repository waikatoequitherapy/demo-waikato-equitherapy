import type { MetadataRoute } from 'next'

const base = 'https://www.waikatoequi.co.nz'

const routes = ['', '/about', '/services', '/hoofbeats', '/horses', '/volunteer', '/events', '/gallery', '/faq', '/contact', '/support']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/events' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
