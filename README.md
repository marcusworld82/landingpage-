# Empossible — Landing Page

High-end glassmorphism landing page for Empossible.
Vanilla HTML + CSS + JS. Zero build tools. Vercel-ready.

## Deploy

1. Push this repo to GitHub (already done).
2. Go to [vercel.com](https://vercel.com) → New Project → Import this repo.
3. Vercel auto-detects static HTML. Click **Deploy**. Done.

## File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Placeholders to Replace

| Location | What to replace |
|---|---|
| `index.html` line ~180 | Calendly/booking URL (`https://calendly.com/empossible/audit`) |
| Case study cards (3x) | Real client names, cities, and metrics |
| Case study quotes (3x) | Real client testimonial quotes |
| Footer links | Real privacy policy and terms pages |
| `<title>` meta description | Confirm final SEO copy |

## Third-Party Connectors (when ready)

- **Booking:** Calendly embed or Acuity Scheduling
- **Forms:** Formspree or Netlify Forms for any contact form
- **Analytics:** Plausible or Google Analytics 4
- **CRM:** GoHighLevel (if adopted)

## Browser Support

Chrome, Safari, Firefox, Edge — last 2 versions.
`backdrop-filter` is supported in all modern browsers.
`@supports` fallback included for older clients.

## Mobile Breakpoints

- Base: 320px+
- Tablet: 640px+
- Desktop: 1024px+
- Wide: 1280px+
