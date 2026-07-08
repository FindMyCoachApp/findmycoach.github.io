(function loadAnalytics() {
  var config = (window.SITE_CONFIG && window.SITE_CONFIG.analytics) || {};
  var cloudflareToken = (config.cloudflareToken || '').trim();
  var googleAnalyticsId = (config.googleAnalyticsId || '').trim();
  var hasOptionalAnalytics = cloudflareToken || (googleAnalyticsId && /^G-[A-Z0-9]+$/i.test(googleAnalyticsId));

  function inject() {
    if (cloudflareToken) {
      var cfScript = document.createElement('script');
      cfScript.defer = true;
      cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      cfScript.setAttribute('data-cf-beacon', JSON.stringify({ token: cloudflareToken }));
      document.body.appendChild(cfScript);
    }

    if (googleAnalyticsId && /^G-[A-Z0-9]+$/i.test(googleAnalyticsId)) {
      var gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(googleAnalyticsId);
      document.head.appendChild(gtagScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', googleAnalyticsId, { anonymize_ip: true });
    }
  }

  window.loadFmcAnalytics = inject;

  if (!hasOptionalAnalytics) return;

  var consentGiven = window.FMC_ANALYTICS_CONSENT === true;
  var consentBanner = document.getElementById('cookie-consent');

  if (!consentBanner || consentGiven) {
    inject();
  }
})();
