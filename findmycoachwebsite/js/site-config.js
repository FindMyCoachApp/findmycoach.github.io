/**
 * Site configuration
 *
 * ANALYTICS SETUP (pick one or both, both are free):
 *
 * Option 1: Cloudflare Web Analytics (recommended, no cookies)
 *   1. Go to https://dash.cloudflare.com/sign-up
 *   2. Open "Web Analytics" in the sidebar (not the same as full Cloudflare DNS)
 *   3. Click "Add a site" and enter your domain (e.g. findmycoach.my)
 *   4. Copy the token from the tracking snippet and paste it below
 *
 * Option 2: Google Analytics 4 (detailed dashboards, countries & cities)
 *   1. Go to https://analytics.google.com/
 *   2. Admin → Create property → Web stream
 *   3. Copy the Measurement ID (starts with G-) and paste it below
 */
window.SITE_CONFIG = {
  analytics: {
    // Paste your Cloudflare Web Analytics token here, or leave empty to disable
    cloudflareToken: '',

    // Paste your GA4 Measurement ID here (e.g. G-ABC123XYZ), or leave empty to disable
    googleAnalyticsId: ''
  }
};
