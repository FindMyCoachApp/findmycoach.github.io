(function injectPageSchema() {
  var seo = window.SEO_CONFIG || {};
  var pageId = document.body && document.body.getAttribute('data-seo-page');
  if (!pageId || pageId === 'home') return;

  var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;
  var pages = isMs ? (seo.pagesMs || {}) : (seo.pages || {});
  var page = pages[pageId];
  if (!page) return;

  var breadcrumbNames = {
    waitlist: isMs ? 'Senarai Tunggu' : 'Join Waitlist',
    coaches: isMs ? 'Untuk Jurulatih' : 'For Coaches',
    news: isMs ? 'Berita' : 'News',
    privacy: isMs ? 'Dasar Privasi' : 'Privacy Policy',
    tos: isMs ? 'Terma Perkhidmatan' : 'Terms of Service',
    cookies: isMs ? 'Dasar Kuki' : 'Cookie Policy'
  };

  var siteUrl = (seo.siteUrl || '').replace(/\/$/, '');
  var pageUrl = siteUrl + page.path;
  var breadcrumbHome = isMs ? 'Laman Utama' : 'Home';
  var breadcrumbs = [{ name: breadcrumbHome, url: siteUrl + (isMs ? '/ms/' : '/') }];

  if (pageId !== 'home') {
    breadcrumbs.push({ name: breadcrumbNames[pageId] || page.title.split('|')[0].trim(), url: pageUrl });
  }

  var graph = [
    {
      '@type': 'WebPage',
      '@id': pageUrl + '#webpage',
      url: pageUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': siteUrl + '/#website' },
      about: { '@id': siteUrl + '/#organization' },
        inLanguage: isMs ? 'ms-MY' : (seo.language || 'en-MY')
    },
    {
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: breadcrumbs.map(function (crumb, index) {
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        };
      })
    }
  ];

  if (pageId === 'coaches') {
    graph.push({
      '@type': 'Service',
      '@id': pageUrl + '#service',
      name: isMs ? 'Penyenaraian Jurulatih Sukan, Find My Coach' : 'Sports Coach Listing, Find My Coach',
      description: page.description,
      provider: { '@id': siteUrl + '/#organization' },
      areaServed: {
        '@type': 'City',
        name: 'Kuala Lumpur',
        containedInPlace: { '@type': 'Country', name: 'Malaysia' }
      },
      offers: {
        '@type': 'Offer',
        price: '30',
        priceCurrency: 'MYR',
        description: isMs ? 'Keahlian jurulatih dari RM 30/bulan dengan 0% komisen ke atas tempahan' : 'Coach membership from RM 30/month with 0% commission on bookings'
      }
    });
  }

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });
  document.head.appendChild(script);
})();
