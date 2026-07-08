/**
 * Central SEO configuration: used by seo-schema.js and documented for HTML meta tags.
 * Keep page titles/descriptions in each HTML <head> in sync with these values.
 */
window.SEO_CONFIG = {
  siteName: 'Find My Coach',
  siteUrl: 'https://www.findmycoach.my',
  defaultLocale: 'en_MY',
  language: 'en-MY',
  twitterHandle: '@findmycoach.official',
  ogImage: 'https://www.findmycoach.my/images/og-share.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Find My Coach, sports coaching app connecting athletes with coaches in Kuala Lumpur',
  geo: {
    region: 'MY-14',
    placename: 'Kuala Lumpur, Malaysia',
    position: '3.1390;101.6869'
  },
  organization: {
    name: 'Find My Coach',
    legalName: 'Find My Coach',
    description: 'Find My Coach is a Kuala Lumpur sports platform connecting athletes with independent coaches for tennis, badminton, swimming, padel, and more.',
    foundingDate: '2025',
    email: 'findmycoach.contact@gmail.com',
    phone: '+60178708065',
    logo: 'https://www.findmycoach.my/images/logo/findmycoachlogo.jpg',
    sameAs: [
      'https://www.instagram.com/findmycoach.official/',
      'https://www.linkedin.com/company/find-my-coach-malaysia'
    ]
  },
  pages: {
    home: {
      path: '/',
      title: 'Find Sports Coaches in Kuala Lumpur | Tennis, Badminton & Swimming',
      description: 'Find My Coach connects athletes with verified sports coaches in Kuala Lumpur. Book tennis, badminton, swimming & padel sessions. Coaches: 0% commission. Join the waitlist.',
      keywords: 'sports coach Kuala Lumpur, tennis coach KL, badminton coach Malaysia, swimming coach KL, find coach app, sports coaching platform Malaysia'
    },
    waitlist: {
      path: '/waitlist.html',
      title: 'Join the Waitlist | Early Access to Find My Coach',
      description: 'Sign up for early access to Find My Coach in Kuala Lumpur. Coaches on the waitlist get a 3 month free trial at launch. Takes one minute.',
      keywords: 'Find My Coach waitlist, early access sports app Malaysia, coach signup KL'
    },
    coaches: {
      path: '/coaches.html',
      title: 'Become a Sports Coach in KL | 0% Commission | Find My Coach',
      description: 'Grow your coaching business in Kuala Lumpur with Find My Coach. Set your rates, get discovered by athletes, 0% commission. From RM 30/month.',
      keywords: 'become sports coach Kuala Lumpur, coaching platform Malaysia, tennis coach jobs KL, badminton coach listing, 0 commission coaching app'
    },
    privacy: {
      path: '/privacy.html',
      title: 'Privacy Policy | Find My Coach',
      description: 'How Find My Coach collects, uses, and protects your personal data. Read our privacy policy for athletes, coaches, and website visitors in Malaysia.',
      keywords: 'Find My Coach privacy policy, data protection Malaysia'
    },
    tos: {
      path: '/tos.html',
      title: 'Terms of Service | Find My Coach',
      description: 'Terms of Service for Find My Coach, the sports coaching platform connecting athletes and coaches in Kuala Lumpur, Malaysia.',
      keywords: 'Find My Coach terms of service, legal terms Malaysia'
    },
    cookies: {
      path: '/cookies.html',
      title: 'Cookie Policy | Find My Coach',
      description: 'Cookie Policy for Find My Coach. Learn what cookies we use, why we use them, and how to manage your preferences.',
      keywords: 'Find My Coach cookies policy'
    },
    news: {
      path: '/news/',
      title: 'News & Updates | Find My Coach',
      description: 'Launch updates, coach news, and sports coverage from Find My Coach in Kuala Lumpur.',
      keywords: 'Find My Coach news, sports coaching Kuala Lumpur updates'
    }
  },
  pagesMs: {
    home: {
      path: '/ms/',
      title: 'Cari Jurulatih Sukan di Kuala Lumpur | Tenis, Badminton, Renang & Padel',
      description: 'Find My Coach menghubungkan atlet dengan jurulatih sukan dipercayai di Kuala Lumpur. Tempah sesi tenis, badminton, renang & padel. Jurulatih: 0% komisen. Sertai senarai tunggu.',
      keywords: 'jurulatih sukan Kuala Lumpur, jurulatih tenis KL, jurulatih badminton Malaysia, jurulatih renang KL, aplikasi jurulatih, platform jurulatih sukan Malaysia'
    },
    waitlist: {
      path: '/ms/waitlist.html',
      title: 'Sertai Senarai Tunggu | Akses Awal Find My Coach',
      description: 'Daftar untuk akses awal Find My Coach di Kuala Lumpur. Jurulatih dalam senarai tunggu mendapat percubaan percuma 3 bulan semasa pelancaran.',
      keywords: 'senarai tunggu Find My Coach, aplikasi sukan Malaysia, daftar jurulatih KL'
    },
    coaches: {
      path: '/ms/coaches.html',
      title: 'Jadi Jurulatih Sukan di KL | 0% Komisen | Find My Coach',
      description: 'Kembangkan perniagaan kejurulatihan anda di Kuala Lumpur. Tetapkan kadar sendiri, 0% komisen. Keahlian jurulatih dari RM 30/bulan.',
      keywords: 'jadi jurulatih sukan Kuala Lumpur, platform kejurulatihan Malaysia, senarai jurulatih tenis KL, 0 komisen'
    },
    privacy: {
      path: '/ms/privacy.html',
      title: 'Dasar Privasi | Find My Coach',
      description: 'Cara Find My Coach mengumpul, menggunakan dan melindungi data peribadi anda di Malaysia.',
      keywords: 'dasar privasi Find My Coach, perlindungan data Malaysia'
    },
    news: {
      path: '/ms/news/',
      title: 'Berita & Kemas Kini | Find My Coach',
      description: 'Kemas kini pelancaran, berita jurulatih, dan liputan sukan dari Find My Coach di Kuala Lumpur.',
      keywords: 'berita Find My Coach, kemas kini kejurulatihan sukan Kuala Lumpur'
    }
  }
};
