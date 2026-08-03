export type Faq = {
  q: string
  a: string
  category: 'Riding with us' | 'Costs & funding' | 'On the day' | 'Volunteering' | 'Supporting us'
  keywords: string[]
}

export const faqCategories = [
  'Riding with us',
  'Costs & funding',
  'On the day',
  'Volunteering',
  'Supporting us',
] as const

export const faqs: Faq[] = [
  {
    q: 'What is Equitherapy?',
    a: 'Equitherapy is therapeutic riding and horse interaction for children and adults with a wide range of special needs. The aim is to improve physical, socio-emotional and cognitive wellbeing in a supportive and fun environment. Every session is supervised by an experienced coach and trained volunteers.',
    category: 'Riding with us',
    keywords: ['equitherapy', 'therapy', 'what is', 'therapeutic riding', 'about'],
  },
  {
    q: 'What is the minimum age to ride?',
    a: 'Usually two years, though we look at each rider individually: their condition, weight and how much they are likely to get out of the programme.',
    category: 'Riding with us',
    keywords: ['age', 'minimum', 'how old', 'child', 'toddler', 'years old'],
  },
  {
    q: 'What conditions do you work with?',
    a: 'A wide range, including cerebral palsy, autism spectrum disorder, Down syndrome, acquired brain injury and many others. If you are not sure whether riding would suit, ring or text Nickie on 021 378 030 and talk it through.',
    category: 'Riding with us',
    keywords: ['conditions', 'disability', 'autism', 'cerebral palsy', 'special needs', 'suitable'],
  },
  {
    q: 'How do I get started?',
    a: 'Get in touch first, then we arrange a free assessment ride. From there we talk about goals and, if you need it, help you sort funding. Riders on the Therapy Programme complete a rider form and a medical form.',
    category: 'Riding with us',
    keywords: ['start', 'begin', 'sign up', 'enrol', 'join', 'first step', 'assessment'],
  },
  {
    q: 'Is there a waiting list?',
    a: 'Sometimes, for the Therapy Programme. Ring or text and we will tell you exactly where things sit at the moment.',
    category: 'Riding with us',
    keywords: ['waiting list', 'wait', 'availability', 'spaces', 'places'],
  },
  {
    q: 'When do sessions run?',
    a: 'We deliver about twenty riding sessions a week across roughly 160 days a year, with up to four riders in each time slot. The Therapy Programme runs over four terms a year, each around ten weeks. Sunday riding runs about 46 Sundays a year.',
    category: 'Riding with us',
    keywords: ['when', 'times', 'days', 'timetable', 'schedule', 'terms', 'sunday'],
  },
  {
    q: 'How much does it cost?',
    a: 'Therapy Programme riding is $105 per term. Sunday riding is $35 per lesson. A three-day Hoofbeats holiday programme is $250.',
    category: 'Costs & funding',
    keywords: ['cost', 'price', 'fee', 'how much', 'pay', 'money', '$'],
  },
  {
    q: 'Can I use my disability funding?',
    a: 'Most disability funding providers will pay for Equitherapy, including Enabling Good Lives. Get in touch and we will help you work out which option fits.',
    category: 'Costs & funding',
    keywords: ['funding', 'egl', 'enabling good lives', 'subsidy', 'msd', 'support funding'],
  },
  {
    q: 'Who do I talk to about an invoice?',
    a: 'Billing questions go to David Leong at admin@waikatoequi.co.nz. General enquiries go to secretary@waikatoequi.co.nz.',
    category: 'Costs & funding',
    keywords: ['invoice', 'billing', 'account', 'payment', 'receipt', 'david'],
  },
  {
    q: 'Do I need a riding helmet?',
    a: 'Yes, every rider wears a correctly fitted riding helmet. We keep a range at the centre, so you do not need to buy one to get started.',
    category: 'On the day',
    keywords: ['helmet', 'hat', 'safety gear', 'equipment', 'wear'],
  },
  {
    q: 'What should we wear?',
    a: 'Long trousers, closed-in shoes with a small heel if you have them, and a warm layer, because the arena is open to the weather. We supply the helmet.',
    category: 'On the day',
    keywords: ['wear', 'clothes', 'clothing', 'shoes', 'boots', 'dress'],
  },
  {
    q: 'Can caregivers stay and watch?',
    a: 'Yes. Caregivers and whānau are welcome to stay, and most riders like having someone there.',
    category: 'On the day',
    keywords: ['caregiver', 'parent', 'watch', 'stay', 'family', 'attend'],
  },
  {
    q: 'Where are you?',
    a: 'At 68 Vaile Road, Newstead, Hamilton. We have been on these grounds since 2006, and running riding programmes in the Waikato since 1972.',
    category: 'On the day',
    keywords: ['where', 'address', 'location', 'directions', 'vaile', 'newstead', 'find you'],
  },
  {
    q: 'Do I need horse experience to volunteer?',
    a: 'No. Plenty of our volunteers had never touched a horse before they started. We train you, and there are roles well away from the horses too: admin, fundraising, marketing, maintenance and event help.',
    category: 'Volunteering',
    keywords: ['volunteer experience', 'no experience', 'horse experience', 'training'],
  },
  {
    q: 'How much time does volunteering take?',
    a: 'Our regular volunteers give around six hours a week, but it is flexible and seasonal help is genuinely useful. Around 85 people helped out across the year, and about 25 are on the roster in a typical week.',
    category: 'Volunteering',
    keywords: ['time', 'hours', 'commitment', 'how often', 'shifts', 'roster'],
  },
  {
    q: 'How do I sign up as a volunteer?',
    a: 'Download the volunteer form, fill it in and send it back. Adult volunteers also complete a police vetting form. We will then match you with a role and pair you with an experienced volunteer for your first sessions.',
    category: 'Volunteering',
    keywords: ['volunteer sign up', 'volunteer form', 'apply', 'police check', 'vetting', 'join'],
  },
  {
    q: 'How old do volunteers have to be?',
    a: 'Our volunteers run from 14 through to 80-plus. Younger volunteers work alongside an experienced adult.',
    category: 'Volunteering',
    keywords: ['volunteer age', 'young', 'teenager', 'student', 'school'],
  },
  {
    q: 'Can I sponsor a horse?',
    a: 'Yes. Horse sponsorship helps cover feed, farrier and vet costs for the ten horses and ponies in our herd. You can sponsor a specific horse and we will keep you posted on how they are getting on.',
    category: 'Supporting us',
    keywords: ['sponsor', 'sponsorship', 'adopt a horse', 'horse', 'feed', 'support a horse'],
  },
  {
    q: 'How can I donate?',
    a: 'Through Givealittle, or by direct bank transfer to 03 0306 0204743 00 with the reference "Donation". Donations of $5 or more to a registered charity qualify for a tax credit in New Zealand.',
    category: 'Supporting us',
    keywords: ['donate', 'donation', 'give', 'money', 'givealittle', 'bank', 'tax'],
  },
  {
    q: 'Do you get government funding?',
    a: 'No. We rely on fees, grants, fundraising events and the generosity of the Waikato community.',
    category: 'Supporting us',
    keywords: ['government', 'funded', 'grant', 'where does money come from'],
  },
]
