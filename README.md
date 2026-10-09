# Shivam Kumar — Portfolio

Next.js portfolio with featured work, experience, skills and direct email contact.

## Development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

If the local Turbopack CSS worker fails to start, use the supported alternative:

```sh
npm run build -- --webpack
```

The existing Montserrat font setup requires Google Fonts access at build time.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin before building, for example `https://your-domain.example`. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically if no explicit URL is set. Local development falls back to `http://localhost:3000`. The origin is used for social preview image URLs.

## Content and contact

- Shared biography, experience and skills: `src/data/portfolio.ts`.
- Case-study narratives: `src/components/FeaturedProjects.tsx`.
- Contact opens the visitor’s email app; copying the address is also supported. No message is sent by the website itself.
- The résumé action requests a copy by email. Replace it with a real PDF link when an approved résumé is available.
- Add genuine project screenshots and supporting documents when available; avoid publishing invented metrics or evidence.

The site includes a generated social preview, an SK favicon, keyboard-friendly mobile navigation and reduced-motion handling.
