'use client'
import { useState, useEffect } from 'react'
import { createEvent, updateEvent, deleteEvent, getEvents, uploadGalleryImage, updateGalleryImage, deleteGalleryImage, getGallery } from '@/lib/api'
const ADMIN_PIN = 'Equitherapy@2026'
const c = { red: 'var(--red)', creamDark: 'var(--grey)', redLight: 'var(--red-tint)', dark: '#1a1a1a', muted: '#7a6f67', border: 'var(--line)' }
const inputStyle = { width: '100%', border: `1px solid ${c.border}`, borderRadius: '8px', padding: '10px 14px', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box' as const }
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600 as const, color: 'var(--muted-text)', marginBottom: '6px' }
const smallBtn = { padding: '6px 14px', borderRadius: '6px', border: 'none', fontWeight: 600 as const, fontSize: '12px', cursor: 'pointer' }

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [tab, setTab] = useState<'events'|'gallery'>('events')
  const [gallery, setGallery] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [editingEvent, setEditingEvent] = useState<any|null>(null)
  const [deletingId, setDeletingId] = useState<string|number|null>(null)
  const [eventStatus, setEventStatus] = useState<'idle'|'saving'|'saved'|'updated'|'error'>('idle')
  const [uploadStatus, setUploadStatus] = useState<'idle'|'uploading'|'done'|'error'>('idle')
  const [editingImageId, setEditingImageId] = useState<string|number|null>(null)
  const [deletingImageId, setDeletingImageId] = useState<string|number|null>(null)

  useEffect(() => {
    if (authed) {
      getGallery().then(setGallery).catch(() => {})
      getEvents().then(setEvents).catch(() => {})
    }
  }, [authed])

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: c.creamDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '360px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.dark, marginBottom: '8px' }}>Admin panel</h1>
        <p style={{ color: c.muted, fontSize: '14px', marginBottom: '24px' }}>Waikato Equitherapy, Nickie's dashboard</p>
        <label style={labelStyle}>Password</label>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key==='Enter'&&pin===ADMIN_PIN&&setAuthed(true)} style={{...inputStyle, marginBottom: '16px'}} placeholder="Enter admin password" />
        <button onClick={() => pin===ADMIN_PIN?setAuthed(true):alert('Incorrect password')} style={{ width: '100%', background: c.red, color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Sign in</button>
      </div>
    </div>
  )

  async function handleDelete(ev: any) {
    if (!confirm(`Delete "${ev.name}"? This cannot be undone.`)) return
    setDeletingId(ev.id)
    try {
      await deleteEvent(ev.id)
      setEvents(evts => evts.filter(e => e.id !== ev.id))
      if (editingEvent?.id === ev.id) setEditingEvent(null)
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  async function handleDeleteImage(img: any) {
    if (!confirm(`Delete "${img.title || 'this photo'}"? This cannot be undone.`)) return
    setDeletingImageId(img.id)
    try {
      await deleteGalleryImage(img.id)
      setGallery(g => g.filter(i => i.id !== img.id))
      if (editingImageId === img.id) setEditingImageId(null)
    } catch {
      alert('Delete failed. Please try again.')
    } finally {
      setDeletingImageId(null)
    }
  }

  async function handleSaveImage(img: any) {
    const title = (document.getElementById(`gallery-title-${img.id}`) as HTMLInputElement)?.value ?? ''
    const category = (document.getElementById(`gallery-category-${img.id}`) as HTMLSelectElement)?.value ?? ''
    try {
      const updated = await updateGalleryImage(img.id, { title, category })
      setGallery(g => g.map(i => i.id === img.id ? updated : i))
      setEditingImageId(null)
    } catch {
      alert('Update failed. Please try again.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: c.creamDark }}>
      <div style={{ background: 'white', borderBottom: `1px solid ${c.border}`, padding: '0 1rem', position: 'sticky', top: 'var(--header-h)', zIndex: 30 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px' }}>
          <div><p style={{ fontWeight: 700, color: c.dark, margin: 0, fontSize: '15px' }}>Admin panel</p></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['events','gallery'] as const).map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: tab===t?c.redLight:'transparent', color: tab===t?c.red:c.muted, fontWeight: tab===t?600:400, cursor: 'pointer', fontSize: '13px', textTransform: 'capitalize' }}>{t}</button>)}
            <button onClick={() => setAuthed(false)} style={{ padding: '6px 12px', border: 'none', background: 'transparent', color: c.muted, cursor: 'pointer', fontSize: '13px' }}>Sign out</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 1rem' }}>
        {tab === 'events' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.dark, margin: 0 }}>{editingEvent ? `Edit event — ${editingEvent.name}` : 'Create new event'}</h2>
              {editingEvent && <button onClick={() => { setEditingEvent(null); setEventStatus('idle') }} style={{ ...smallBtn, background: 'transparent', color: c.muted, border: `1px solid ${c.border}` }}>Cancel edit</button>}
            </div>
            <form key={editingEvent?.id ?? 'new'} style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: '12px', padding: '32px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}
              onSubmit={async e => {
                e.preventDefault(); setEventStatus('saving')
                const form = e.currentTarget
                const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement|HTMLTextAreaElement)?.value??''
                const capacityVal = get('capacity')
                const payload = {
                  ...editingEvent,
                  name: get('name'),
                  eventDate: get('eventDate'),
                  location: get('location'),
                  description: get('description'),
                  price: parseFloat(get('price'))||0,
                  capacity: capacityVal ? parseInt(capacityVal) : null,
                  published: true,
                }
                const wasEditing = !!editingEvent
                try {
                  if (editingEvent) {
                    const updated = await updateEvent(editingEvent.id, payload)
                    setEvents(evts => evts.map(ev => ev.id===updated.id ? updated : ev))
                    setEditingEvent(null)
                  } else {
                    const created = await createEvent(payload)
                    setEvents(evts => [...evts, created])
                    form.reset()
                  }
                  setEventStatus(wasEditing ? 'updated' : 'saved')
                } catch { setEventStatus('error') }
              }}>
              <div><label style={labelStyle}>Event name *</label><input name="name" required defaultValue={editingEvent?.name} style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={labelStyle}>Date and time *</label><input name="eventDate" type="datetime-local" required defaultValue={editingEvent?.eventDate?.slice(0,16)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Price ($), 0 for free</label><input name="price" type="number" step="0.01" defaultValue={editingEvent?.price ?? 0} style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Location</label><input name="location" defaultValue={editingEvent?.location} style={inputStyle} /></div>
              <div><label style={labelStyle}>Description</label><textarea name="description" rows={3} defaultValue={editingEvent?.description} style={{...inputStyle, resize:'none'}} /></div>
              <div><label style={labelStyle}>Capacity (blank for unlimited)</label><input name="capacity" type="number" defaultValue={editingEvent?.capacity ?? ''} style={inputStyle} /></div>
              {(eventStatus==='saved'||eventStatus==='updated')&&<div style={{ background:c.redLight, color:c.red, borderRadius:'8px', padding:'12px', fontSize:'13px', fontWeight:600 }}>✓ {eventStatus==='updated' ? 'Event updated!' : 'Event saved and live on the website!'}</div>}
              {eventStatus==='error'&&<p style={{ color:c.red, fontSize:'13px' }}>Something went wrong. Please try again.</p>}
              <button type="submit" disabled={eventStatus==='saving'} style={{ background:c.red, color:'white', border:'none', padding:'12px', borderRadius:'8px', fontWeight:600, fontSize:'14px', cursor:'pointer', opacity:eventStatus==='saving'?0.6:1 }}>
                {eventStatus==='saving' ? 'Saving…' : editingEvent ? 'Update event' : 'Save event, goes live immediately'}
              </button>
            </form>

            <h3 style={{ fontWeight: 700, color: c.dark, marginBottom: '16px' }}>Published events ({events.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {events.map((ev: any) => (
                <div key={ev.id} style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: c.dark, margin: 0, fontSize: '14px' }}>{ev.name}</p>
                    <p style={{ fontSize: '12px', color: c.muted, margin: '2px 0 0' }}>
                      {ev.eventDate ? new Date(ev.eventDate).toLocaleString('en-NZ', { dateStyle: 'medium', timeStyle: 'short' }) : '—'} · {ev.location || 'No location'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditingEvent(ev); setEventStatus('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ ...smallBtn, background: c.redLight, color: c.red }}>Edit</button>
                    <button onClick={() => handleDelete(ev)} disabled={deletingId===ev.id} style={{ ...smallBtn, background: 'transparent', color: c.red, border: `1px solid ${c.red}`, opacity: deletingId===ev.id?0.6:1 }}>
                      {deletingId===ev.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
              {events.length===0 && <p style={{ color:c.muted, fontSize:'14px' }}>No published events yet.</p>}
            </div>
          </div>
        )}

        {tab === 'gallery' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: c.dark, marginBottom: '24px' }}>Upload photo</h2>
            <form style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: '12px', padding: '32px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}
              onSubmit={async e => {
                e.preventDefault(); setUploadStatus('uploading')
                const form = e.currentTarget
                const file = (form.elements.namedItem('file') as HTMLInputElement).files?.[0]
                const title = (form.elements.namedItem('title') as HTMLInputElement).value
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value
                if (!file) return
                try { const img = await uploadGalleryImage(file, title, category); setGallery(g => [...g, img]); setUploadStatus('done'); form.reset() } catch { setUploadStatus('error') }
              }}>
              <div><label style={labelStyle}>Photo *</label><input name="file" type="file" accept="image/*" required style={{ width: '100%', fontSize: '13px' }} /></div>
              <div><label style={labelStyle}>Photo title</label><input name="title" style={inputStyle} placeholder="Therapy session, Quiz night…" /></div>
              <div><label style={labelStyle}>Category</label><select name="category" style={inputStyle}><option value="horses">Horses</option><option value="riders">Riders</option><option value="volunteers">Volunteers</option><option value="events">Events</option></select></div>
              {uploadStatus==='done'&&<div style={{ background:c.redLight, color:c.red, borderRadius:'8px', padding:'12px', fontSize:'13px', fontWeight:600 }}>✓ Photo uploaded and live on the gallery page!</div>}
              {uploadStatus==='error'&&<p style={{ color:c.red, fontSize:'13px' }}>Upload failed. Please try again.</p>}
              <button type="submit" disabled={uploadStatus==='uploading'} style={{ background:c.red, color:'white', border:'none', padding:'12px', borderRadius:'8px', fontWeight:600, fontSize:'14px', cursor:'pointer', opacity:uploadStatus==='uploading'?0.6:1 }}>
                {uploadStatus==='uploading'?'Uploading…':'Upload photo'}
              </button>
            </form>
            <h3 style={{ fontWeight: 700, color: c.dark, marginBottom: '16px' }}>Current gallery ({gallery.length} photos)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
              {gallery.map((img: any) => (
                <div key={img.id} style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${c.border}`, background: 'white' }}>
                  <img src={img.imageUrl} alt={img.title} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                  {editingImageId === img.id ? (
                    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <input id={`gallery-title-${img.id}`} defaultValue={img.title} placeholder="Title" style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }} />
                      <select id={`gallery-category-${img.id}`} defaultValue={img.category} style={{ ...inputStyle, fontSize: 12, padding: '6px 8px' }}>
                        <option value="horses">Horses</option>
                        <option value="riders">Riders</option>
                        <option value="volunteers">Volunteers</option>
                        <option value="events">Events</option>
                      </select>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => handleSaveImage(img)} style={{ ...smallBtn, background: c.red, color: 'white', flex: 1, padding: '4px 8px', fontSize: 11 }}>Save</button>
                        <button onClick={() => setEditingImageId(null)} style={{ ...smallBtn, background: 'transparent', color: c.muted, border: `1px solid ${c.border}`, padding: '4px 8px', fontSize: 11 }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '6px 10px' }}>
                      <p style={{ fontSize: '11px', color: c.muted, margin: '0 0 6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.title||'Untitled'}</p>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setEditingImageId(img.id)} style={{ ...smallBtn, background: c.redLight, color: c.red, flex: 1, padding: '4px 8px', fontSize: 11 }}>Edit</button>
                        <button onClick={() => handleDeleteImage(img)} disabled={deletingImageId===img.id} style={{ ...smallBtn, background: 'transparent', color: c.red, border: `1px solid ${c.red}`, flex: 1, padding: '4px 8px', fontSize: 11, opacity: deletingImageId===img.id?0.6:1 }}>
                          {deletingImageId===img.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {gallery.length===0&&<p style={{ color:c.muted, fontSize:'14px', gridColumn:'1/-1' }}>No photos yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
