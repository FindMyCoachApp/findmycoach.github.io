# Images Directory

This directory contains static images used throughout the Find My Coach application.

## Directory Structure

- `hero/` - Hero section images and banners
- `coaches/` - Coach profile images and photos
- `sports/` - Sport-specific images and icons
- `testimonials/` - User testimonial photos
- `about/` - About page images
- `icons/` - Application icons and logos

## Usage

Images in this directory can be referenced in your Next.js components using:

```jsx
import Image from 'next/image'

<Image 
  src="/images/hero/coach-hero.jpg" 
  alt="Coach training session"
  width={800}
  height={600}
/>
```

## Image Guidelines

- Use WebP format when possible for better performance
- Optimize images before adding them
- Include both light and dark mode versions when applicable
- Use descriptive filenames
- Keep file sizes reasonable (under 500KB for most images)
