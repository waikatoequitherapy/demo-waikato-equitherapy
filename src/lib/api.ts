const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? 'Request failed')
  return data
}

export async function getEvents() {
  try {
    const res = await fetch(`${BASE}/api/events`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch { return [] }
}

export async function submitContactForm(data: unknown) {
  return post('/api/contacts', data)
}

export async function submitVolunteerApplication(data: unknown) {
  return post('/api/applications/volunteer', data)
}

export async function submitRiderApplication(data: unknown) {
  return post('/api/applications/rider', data)
}

export async function registerForEvent(eventId: string, data: unknown) {
  return post(`/api/events/${eventId}/register`, data)
}

export async function getGallery() {
  try {
    const res = await fetch(`${BASE}/api/gallery`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch { return [] }
}

export async function uploadGalleryImage(file: File, title: string, category: string) {
  const form = new FormData()
  form.append('file', file)
  form.append('title', title)
  form.append('category', category)
  const res = await fetch(`${BASE}/api/gallery/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export async function createEvent(data: unknown) {
  const res = await fetch(`${BASE}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create event')
  return res.json()
}
