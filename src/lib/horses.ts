export type Horse = {
  name: string
  image: string
  /** Short intro shown on the card. Left blank until Nickie sends each horse's story. */
  bio?: string
  /** Optional detail rows, e.g. ['Breed', 'Welsh pony']. */
  facts?: [string, string][]
}

// Ten horses and ponies, matching the portraits Nickie supplied.
// To add a horse's story, fill in `bio` (and `facts` if you have them),
// the card layout adjusts on its own.
export const horses: Horse[] = [
  { name: 'Atlas', image: '/images/horses/atlas.jpg' },
  { name: 'Inca', image: '/images/horses/inca.jpg' },
  { name: 'Ivy', image: '/images/horses/ivy.jpg' },
  { name: 'Kojak', image: '/images/horses/kojak.jpg' },
  { name: 'Lacey', image: '/images/horses/lacey.jpg' },
  { name: 'Lorna', image: '/images/horses/lorna.jpg' },
  { name: 'Midnight', image: '/images/horses/midnight.jpg' },
  { name: 'Pippa', image: '/images/horses/pippa.jpg' },
  { name: 'Poppy', image: '/images/horses/poppy.jpg' },
  { name: 'Rikki', image: '/images/horses/rikki.jpg' },
]
