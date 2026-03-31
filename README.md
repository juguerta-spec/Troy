# B&T Quality Construction — Website

Bilingual (FR/EN) conversion-optimized website for B&T Quality Construction.

## Stack
- Next.js 14 (hybrid: Pages Router for pages, App Router for API routes)
- TypeScript strict, Tailwind CSS, next-i18next (FR/EN)
- React Hook Form + Zod, Framer Motion
- Anthropic API streaming chatbot (claude-sonnet-4-20250514)

---

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

FR: http://localhost:3000 — EN: http://localhost:3000/en

### Environment Variables

| Variable | Description |
|---|---|
| NEXT_PUBLIC_PHONE | Business phone e.g. +15141234567 |
| NEXT_PUBLIC_WEBHOOK_URL | CRM webhook URL |
| NEXT_PUBLIC_FB_PIXEL_ID | Facebook Pixel ID |
| NEXT_PUBLIC_GTAG_ID | Google tag ID e.g. G-XXXXXXXXXX |
| ANTHROPIC_API_KEY | Anthropic API key (server-side only) |
| NEXT_PUBLIC_SITE_URL | Production URL |

---

## Image Placement

| File | Location | Used for |
|---|---|---|
| project1.jpg | public/images/ | Hero background (best photo) |
| project2-4.jpg | public/images/ | Service card thumbnails |
| project1-12.jpg | public/images/ | Gallery grid |
| logo-main.png | public/logos/ | Navbar + footer |
| logo-gutters.png | public/logos/ | Gutters service |
| logo-siding.png | public/logos/ | Siding service |
| logo-roofing.png | public/logos/ | Roofing service |

---

## Landing Page URL Params

/?service=gutters   -> gutters hero + pre-filled form
/?service=roofing   -> roofing hero + pre-filled form
/?service=siding    -> siding hero + pre-filled form

Combine with UTM: /?service=gutters&utm_source=facebook&utm_campaign=gouttières

---

## Translations

All text: public/locales/fr/common.json and public/locales/en/common.json

---

## Vercel Deployment

1. Push to GitHub
2. Import on vercel.com, set env vars from .env.example
3. Deploy

Add to package.json for auto sitemap:
  "postbuild": "next-sitemap"

---

## Webhook Payload Schema

{
  "name": "", "phone": "", "email": "", "address": "",
  "service": "", "message": "", "photos_count": 0,
  "source": "website | chatbot",
  "utm_source": "", "utm_medium": "", "utm_campaign": "",
  "referral_source": "", "timestamp": "", "language": "fr | en"
}

---

## Analytics Events

call_click  -> phone number click (location param)
lead        -> form submitted successfully
contact     -> chatbot collects name + phone
