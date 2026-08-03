# Waikato Equitherapy website: enhancement handover

Built on the existing Next.js 14 project. **No new dependencies were added.** All
animation is CSS plus `IntersectionObserver`, so `npm install && npm run build`
works exactly as before and deploys to Vercel unchanged.

---

## 0. Round two: theme, logo and polish (latest pass)

### Colour theme rebuilt to the logo

The palette is now black, red and white, per the prototype review feedback.
The green and warm-oat scheme from the first pass is gone entirely.

| Token | Value | Used for |
| --- | --- | --- |
| `--red` | `#de3226` | Sampled from the "Equi" in the logo. Buttons, accents, the hoofprint motif. |
| `--red-deep` | `#b4231a` | Small red text, eyebrows, pills. The logo red is only 4.6:1 on white, which is too tight for 11px labels, so small type uses this instead. |
| `--red-bright` | `#ff7063` | Red that still reads against black. |
| `--black` | `#101010` | Dark sections and the footer. |
| `--grey` | `#f4f4f4` | Alternating section backgrounds. Deliberately neutral so red stays the only colour on the page. |
| `--white` | `#ffffff` | Page ground. |

Old token names (`--clay`, `--paddock`, `--sand`, `--oat`) are kept as aliases
pointing at the new values, so nothing breaks if a stray reference turns up.
`.bg-paddock` is now `.bg-dark`, `.pill-green` is now `.pill-mono`.

### Logo

`logo.jpg` was converted to transparent PNGs in `/public`:

- `logo.png` and `logo-white.png` are the full stacked lockup, used for
  Open Graph and schema.
- `logo-mark.png` and `logo-mark-white.png` are the horse-and-rider mark alone.
- `src/app/icon.png` and `src/app/apple-icon.png` are the browser and
  home-screen icons.

**One judgement call worth knowing about.** The supplied logo is a stacked
lockup with the wordmark under the mark. At header size the wordmark inside
that artwork renders about 9px tall and turns to mush. So `Logo.tsx` uses the
mark on its own and sets "Waikato **Equi**therapy" in type beside it, keeping
the red "Equi". It stays crisp at any size and on any screen. If you would
rather use the artwork exactly as supplied, swap the component contents for a
single `<Image src="/logo.png">` and expect it to need roughly 120px of header
height to stay legible.

### Tab / favicon

The globe icon is gone: `src/app/icon.png` and `apple-icon.png` use Next's
file convention, so the mark shows in the tab and on iOS home screens. The
title template is now `%s | Waikato Equitherapy`. Every em dash has been
removed from the source, titles and copy included.

### Animations now replay

`Reveal` and `CountUp` previously called `observer.disconnect()` on first
intersection, which is why the animation only ran once per page load. Both now
reset when the element is well clear of the viewport (more than 90% of a
screen below, or 80px above) and play again on the way back. The threshold is
deliberately generous so a small scroll nudge near the edge doesn't cause
flicker. `prefers-reduced-motion` still short-circuits both.

### Footer layout

The contact block was dropping to a row of its own because the grid used
`auto-fit` with a `minmax(210px, 1fr)` track and the brand column had its own
`min-width`. It now uses explicit tracks: one column on mobile, two from
560px, four from 900px (brand spanning two), and a five-track
`1.7fr 0.9fr 0.9fr 1fr 1.4fr` row from 1100px, with contact given the widest
track. The address is capped at 22 characters per line so it no longer wraps
awkwardly.

### Other fixes found while going through each page

- Ghost buttons had a white hover state on a white page, so hovering did
  nothing visible. Now they go grey.
- Red on the red tint background failed AA at small sizes. Eyebrows, pills and
  date chips now use `--red-deep`.
- Header height trimmed to 72px to sit properly with the new lockup.
- The chatbot avatar now uses the logo mark rather than a generic horseshoe.
- Verified: all 11 routes return 200, the `/how-we-help` redirect lands on
  `/services`, the 404 page renders, every `next/image` source resolves, all
  four form PDFs and the QR code download, and each page has exactly one `h1`.

---

## 1. Content corrections from Nickie's 13 July email

These were wrong on the previous site and are now fixed everywhere:

| Item | Was | Now |
| --- | --- | --- |
| Sunday riding | $30 per lesson | **$35 per lesson** |
| Holiday programme | $200 for 3 days | **$250 for 3 days** |
| Horses | 11 | **10** |
| Riders | 120 | **111 (2025)** |
| Riding days per year | 232 | **160** |
| Volunteers | "70+" | **~85 a year, ~25 weekly, ~6 hrs each, ~6,000 hrs a year** |
| Founding | "incorporated 1980" | **Established 1972**; 1980 Foreman Park (Avalon Dr); 2006 moved to 68 Vaile Rd; 2018 renamed |
| General enquiries | admin@ only | **secretary@waikatoequi.co.nz** (Sarah) |
| Billing | not shown | **admin@waikatoequi.co.nz , David Leong** |
| Phone | listed | **021 378 030, texts welcome, no voice messages** |

Also added from the notes: twenty riding sessions a week, up to four riders per
slot, four terms a year at ~10 weeks, ~46 Sundays a year, 8 holiday programmes
catering for ~90 children.

**Every one of these figures lives in one file: `src/lib/site.ts`.** Change it
there and it updates across the whole site.

---

## 2. New pages

| Route | What it is |
| --- | --- |
| `/services` | "Our Services" , the heading Nickie asked for. Covers all three programmes, fees, session times, the getting-started steps and all four downloadable forms. |
| `/horses` | Horse sponsorship. All ten portraits, a per-horse "Sponsor {name}" link that pre-fills the contact form, and a breakdown of what sponsorship covers. |
| `/how-we-help` | Now a permanent 301 redirect to `/services`. |
| `/sitemap.xml`, `/robots.txt` | Generated by Next. `/admin` is disallowed. |
| 404 page | Branded, with useful links out. |

## 3. New features

- **FAQ page** , search box, five category filters, accordion, and `FAQPage`
  JSON-LD schema so Google can surface the answers directly. 20 questions,
  up from 8.
- **Chatbot ("Paddock guide")** , floating, rule-based, no API key and no cost.
  It scores the visitor's question against the same FAQ data plus a set of
  shortcuts (phone, forms, booking, greetings), and links through to the right
  page. When it isn't confident it says so and hands off to Nickie's number
  rather than guessing.
- **Gallery** , masonry layout, category filter (Riders / Hoofbeats /
  Volunteers / Horses), and a lightbox with arrow-key and Escape support.
  Still falls back to the API images the moment the admin panel has some.
- **Quiz night** , dedicated block on `/events` with the QR code you supplied.
- **Forms** , all four PDFs are on the site and linked from the footer,
  `/services#forms`, `/volunteer#forms` and the chatbot.
- **Contact form** , inline validation, honeypot spam trap, enquiry-type
  dropdown, and a `?subject=` parameter so the horse sponsorship links arrive
  pre-filled. Still posts to the same `/api/contacts` endpoint.

## 4. UI and motion

- Palette extended: brand red kept, deep paddock green added as the second
  surface colour, oat and sand as backgrounds. Tokens in `globals.css`.
- Typography: Fraunces (display) + Karla (body), loaded from Google Fonts.
- A stable-door arch shape is used consistently for hero images, horse cards
  and the herd strip , it's the one visual signature carried across pages.
- Scroll-reveal animations, count-up impact figures, an auto-advancing
  testimonial carousel, a horizontally scrollable herd strip on the home page,
  a sticky header that changes on scroll, a slide-in mobile drawer, hover
  micro-interactions, and a back-to-top button.
- Accessibility: skip link, visible focus rings, `aria-expanded` /
  `aria-pressed` on toggles, keyboard-navigable lightbox, and
  `prefers-reduced-motion` respected throughout.
- SEO: per-page metadata, Open Graph tags, and NGO schema in the layout.

## 5. Images

All 27 images were re-encoded (progressive JPEG, quality 82, capped at
1600px , Kojak's portrait alone was 5.4 MB). Total image payload is now 4.5 MB.

- `/public/images/horses/` , the ten portraits
- `/public/images/gallery/` , seven additional photos, duplicates removed
- `/public/forms/` , the four consent forms
- `/public/images/quiz-night-qr.png`

---

## 6. Still needed from Nickie

1. **Horse descriptions.** She said "I will send through some info." Drop each
   one into `src/lib/horses.ts` as `bio: '...'` and, optionally,
   `facts: [['Breed', '...'], ['Age', '...']]`. The card layout adjusts on its
   own , nothing else to change. Cards currently show the photo, name and
   sponsor button, which stands up fine in the meantime.
2. **Police vetting form** (adult volunteers) and the **Volunteer Handbook**.
   Both are named in her email but weren't in the zip. Add the PDFs to
   `/public/forms/`, then move the entries from `pendingForms` into the `forms`
   array in `src/lib/site.ts`. Until then the site says "coming soon, ask at
   the office".
3. **Facebook URL.** I used `facebook.com/waikatoequitherapy` as a placeholder
   in `src/lib/site.ts` , worth confirming the exact page URL.
4. **Sponsorship pricing.** The page explains what sponsorship covers but
   doesn't name a figure, because none was supplied. If there are tiers, they
   belong on `/horses`.
5. **Testimonial attribution.** The quotes are from the existing site content,
   credited generically ("Rider's mum", "Volunteer"). Worth checking families
   are happy with how they appear.

## 7. Not yet built (from the Final Task List)

The public site is done. Phases 1.5 and 4–10 of the task list , Firebase auth,
role-based volunteer and sponsor dashboards, the roster management system,
event registration and the applications approval queue , are unchanged. The
existing `/admin` PIN-gated panel is untouched and still works; note the PIN is
hard-coded and should not go live as-is.
