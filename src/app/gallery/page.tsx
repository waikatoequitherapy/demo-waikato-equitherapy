import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import GalleryGrid, { GalleryItem } from '@/components/GalleryGrid'
import { getGallery } from '@/lib/api'
import { horses } from '@/lib/horses'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from the arena, the paddock and the events at Waikato Equitherapy in Newstead, Hamilton.',
}

// Shown until photos are uploaded through the admin panel. As soon as
// getGallery() returns images, those replace this list entirely.
const FALLBACK: GalleryItem[] = [
  { id: 'g1', imageUrl: '/images/hero-horse-bond.jpg', title: 'A quiet moment between a rider and her horse', category: 'Riders' },
  { id: 'g2', imageUrl: '/images/how-we-help-riding.jpg', title: 'A therapy session in progress', category: 'Riders' },
  { id: 'g3', imageUrl: '/images/about-multigenerational.jpg', title: 'A volunteer walking beside a young rider', category: 'Riders' },
  { id: 'g4', imageUrl: '/images/gallery/rider-and-leader.jpg', title: 'Rider and horse leader, mid-session', category: 'Riders' },
  { id: 'g5', imageUrl: '/images/gallery/in-the-saddle.jpg', title: 'Settled in the saddle', category: 'Riders' },
  { id: 'g6', imageUrl: '/images/gallery/ride-together.jpg', title: 'Out on the track together', category: 'Riders' },
  { id: 'g7', imageUrl: '/images/hoofbeats-family.jpg', title: 'Family time at a Sunday session', category: 'Hoofbeats' },
  { id: 'g8', imageUrl: '/images/gallery/sunny-session.jpg', title: 'A sunny morning at the centre', category: 'Hoofbeats' },
  { id: 'g9', imageUrl: '/images/gallery/group-outdoors.jpg', title: 'A group out in the paddock', category: 'Hoofbeats' },
  { id: 'g10', imageUrl: '/images/volunteer-team.jpg', title: 'Volunteers with one of our horses', category: 'Volunteers' },
  { id: 'g11', imageUrl: '/images/gallery-group-arena.jpg', title: 'Volunteers and a rider in the arena', category: 'Volunteers' },
  { id: 'g12', imageUrl: '/images/gallery-winter-team.jpg', title: 'A winter morning session', category: 'Volunteers' },
  { id: 'g13', imageUrl: '/images/gallery/arena-session.jpg', title: 'Working through an exercise in the arena', category: 'Volunteers' },
  { id: 'g14', imageUrl: '/images/gallery/amber-and-kojak.jpg', title: 'Amber and Kojak', category: 'Horses' },
  ...horses.map<GalleryItem>(h => ({
    id: `horse-${h.name}`,
    imageUrl: h.image,
    title: h.name,
    category: 'Horses',
  })),
]

export default async function GalleryPage() {
  // const apiImages = await getGallery().catch(() => [])
  // const images: GalleryItem[] = apiImages.length > 0 ? apiImages : FALLBACK
  const images: GalleryItem[] = FALLBACK
  return (
    <>
      <section style={{ background: 'var(--oat)', paddingTop: 56, paddingBottom: 48 }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Our world</span>
            <h1 className="display-xl" style={{ margin: '20px 0 18px' }}>Gallery</h1>
            <p className="lede" style={{ maxWidth: 560 }}>
              Moments from the arena and the paddock. Tap any photo to open it, then use the arrow keys to move through.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 72 }}>
        <div className="wrap">
          <GalleryGrid images={images} />
        </div>
      </section>

      <section className="bg-sand section-sm">
        <div className="wrap center">
          <Reveal>
            <h2 className="display-md" style={{ marginBottom: 12 }}>Photos of your own rider?</h2>
            <p className="lede" style={{ maxWidth: 520, margin: '0 auto 26px' }}>
              We would love to share them, with your permission. Send them through and let us know how you would like them credited.
            </p>
            <Link href="/contact" className="btn btn-primary">Send us a photo</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
