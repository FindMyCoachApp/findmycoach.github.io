(function injectNewsSchema() {
  var seo = window.SEO_CONFIG || {};
  var newsData = window.NEWS_DATA || {};
  var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;
  var locale = isMs ? newsData.ms : newsData.en;
  var siteUrl = (seo.siteUrl || 'https://www.findmycoach.my').replace(/\/$/, '');
  var pageId = document.body && document.body.getAttribute('data-seo-page');
  var slug = document.body && document.body.getAttribute('data-article-slug');
  var prefix = isMs ? '/ms' : '';
  var homeUrl = siteUrl + (isMs ? '/ms/' : '/');
  var newsIndexUrl = siteUrl + prefix + '/news/';
  var breadcrumbHome = isMs ? 'Laman Utama' : 'Home';
  var breadcrumbNews = isMs ? 'Berita' : 'News';

  if (pageId === 'news' && locale) {
    var graph = [
      {
        '@type': 'CollectionPage',
        '@id': newsIndexUrl + '#webpage',
        url: newsIndexUrl,
        name: locale.indexTitle + ' | Find My Coach',
        description: locale.indexDescription,
        isPartOf: { '@id': siteUrl + '/#website' },
        about: { '@id': siteUrl + '/#organization' },
        inLanguage: isMs ? 'ms-MY' : 'en-MY'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbNews, item: newsIndexUrl }
        ]
      },
      {
        '@type': 'ItemList',
        itemListElement: (locale.posts || []).map(function (post, index) {
          return {
            '@type': 'ListItem',
            position: index + 1,
            url: newsIndexUrl + post.slug + '.html',
            name: post.title
          };
        })
      }
    ];

    appendSchema(graph);
    return;
  }

  if (pageId === 'news-article' && slug && locale) {
    var post = (locale.posts || []).find(function (item) {
      return item.slug === slug;
    });
    if (!post) return;

    var articleUrl = newsIndexUrl + slug + '.html';
    var graph = [
      {
        '@type': 'BlogPosting',
        '@id': articleUrl + '#article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        image: post.image,
        url: articleUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        author: {
          '@type': 'Organization',
          name: 'Find My Coach',
          url: siteUrl + '/'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Find My Coach',
          logo: {
            '@type': 'ImageObject',
            url: seo.organization && seo.organization.logo
          }
        },
        articleSection: post.category,
        inLanguage: isMs ? 'ms-MY' : 'en-MY'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbNews, item: newsIndexUrl },
          { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl }
        ]
      }
    ];

    appendSchema(graph);
  }

  function appendSchema(graph) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });
    document.head.appendChild(script);
  }
})();
