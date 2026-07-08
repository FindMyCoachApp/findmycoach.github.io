/**
 * Site configuration: edit values here to update links across the site.
 *
 * WAITLIST REDIRECT (required once in Google Forms):
 *   1. Open your Google Form → Settings (gear) → Presentation
 *   2. Enable "Show link to submit another response" OFF
 *   3. Set "Redirect to a URL" → https://www.findmycoach.my/thank-you.html
 *      (Coach signups use sessionStorage to show the coach thank-you page.)
 *
 * ANALYTICS (pick one or both, both are free):
 *   Cloudflare: https://dash.cloudflare.com → Web Analytics → Add site
 *   GA4: https://analytics.google.com → Admin → Create property → Web stream
 */
window.SITE_CONFIG = {
  siteUrl: 'https://www.findmycoach.my',
  companyName: 'Find My Coach',
  contactEmail: 'findmycoach.contact@gmail.com',
  contactPhone: '+60178708065',
  whatsappUrl: 'https://wa.me/60178708065',
  location: 'Kuala Lumpur, Malaysia',

  waitlist: {
    pageUrl: 'waitlist.html',
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScsacqoQMduWuLd3_ESdPxxeDIxZ3ua82yrTwjTM-sjaMEHjQ/viewform',
    googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScsacqoQMduWuLd3_ESdPxxeDIxZ3ua82yrTwjTM-sjaMEHjQ/viewform?embedded=true',
    thankYouUrl: 'thank-you.html',
    roleStorageKey: 'fmc-waitlist-role',
    coachRole: 'coach'
  },

  social: {
    instagram: 'https://www.instagram.com/findmycoach.official/',
    linkedin: 'https://www.linkedin.com/company/find-my-coach-malaysia',
    linkedinFounder: 'https://www.linkedin.com/in/mikolajgross/'
  },

  legal: {
    privacyPolicyUrl: 'privacy.html',
    privacyPolicyExternal: 'https://www.termsfeed.com/live/9dfcdae5-3102-4b55-a3c2-f654b8c270d8',
    termsUrl: 'tos.html',
    cookiesUrl: 'cookies.html'
  },

  analytics: {
    cloudflareToken: 'ba77ed194424417a8726ce8cbac90a45',
    googleAnalyticsId: ''
  },

  stats: {
    waitlistCount: '50+'
  },

  i18n: {
    enPrefix: '',
    msPrefix: 'ms/'
  }
};
