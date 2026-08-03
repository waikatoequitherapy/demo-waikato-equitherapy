// Single source of truth for the facts that appear all over the site.
// Figures below come from Nickie Dove's July 2026 content notes.

export const site = {
  name: 'Waikato Equitherapy Incorporated',
  shortName: 'Waikato Equitherapy',
  tagline: 'Horses helping humans',
  charityNumber: 'CC29067',
  established: 1972,
  address: '68 Vaile Road, Newstead, Hamilton 3286',
  mapQuery: '68+Vaile+Road,+Newstead,+Hamilton',
  phone: '021 378 030',
  phoneHref: 'tel:+64213780 30'.replace(/\s/g, ''),
  phoneNote: 'Texts are welcome. Please avoid voice messages.',
  emailGeneral: 'secretary@waikatoequi.co.nz',
  emailBilling: 'admin@waikatoequi.co.nz',
  billingContact: 'David Leong',
  manager: 'Nickie Dove',
  facebook: 'https://www.facebook.com/waikatoequitherapy',
  givealittle: 'https://givealittle.co.nz/org/waikato',
  bankAccount: '03 0306 0204743 00',
  bankReference: 'Donation',
}

export const fees = {
  therapyTerm: '$105 per term',
  sundayRide: '$35 per lesson',
  holidayProgramme: '$250 for a three-day programme',
}

// Impact figures, 2025 season.
export const impact = [
  { number: 111, suffix: '', label: 'Therapeutic riders in 2025' },
  { number: 160, suffix: '', label: 'Days of riding sessions a year' },
  { number: 6000, suffix: '', label: 'Volunteer hours given each year', format: 'k' as const },
  { number: 10, suffix: '', label: 'Horses and ponies in the herd' },
]

export const volunteerFacts = [
  ['85', 'volunteers helped out across the year'],
  ['25', 'on the roster in an average week'],
  ['6 hrs', 'given by each volunteer each week'],
  ['6,000', 'volunteer hours a year, all up'],
]

export const forms = [
  {
    name: 'Rider Consent Form 2026',
    file: '/forms/rider-consent-form-2026.pdf',
    who: 'Therapy Programme',
    note: 'Start here to join the term-based Equitherapy programme.',
  },
  {
    name: 'Medical Consent Form 2026',
    file: '/forms/medical-consent-form-2026.pdf',
    who: 'Therapy Programme',
    note: 'Goes with the rider form. Your doctor signs this one.',
  },
  {
    name: 'Hoofbeats Consent Form 2026',
    file: '/forms/hoofbeats-consent-form-2026.pdf',
    who: 'Sunday riding & holiday programmes',
    note: 'One form covers both Sunday riding and the holiday programme.',
  },
  {
    name: 'Volunteer Form 2026',
    file: '/forms/volunteer-form-2026.pdf',
    who: 'Volunteers',
    note: 'Tell us your availability and the roles that interest you.',
  },
]

// Documents Nickie has flagged but not yet supplied. Add the file to
// /public/forms and move the entry into `forms` above when they arrive.
export const pendingForms = ['Police vetting form (adult volunteers)', 'Volunteer Handbook']
