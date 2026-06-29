# Project Instructions

## Project Background

- Project path: `/Users/zhaobingkun/dev/droughttolerantgrassseed`
- Site name: `Drought Tolerant Grass Seed Guide`
- Production domain: `https://droughttolerantgrassseed.com/`
- Site type: static SEO content site
- Main topic: drought tolerant grass seed and low-water lawn planning
- Current detailed project context is also recorded in `PROJECT-MEMORY.md`.

## Goal And Scope

- Build a long-term SEO site around drought tolerant grass seed.
- Serve homeowners who need practical grass seed guidance by climate, soil, sun/shade, pets, region, and planting window.
- Keep the site focused on useful guidance instead of thin affiliate or keyword-stuffed pages.
- Maintain a clear hub structure: homepage, guides, seed types, regions, planting calendar, FAQ, and supporting long-tail pages.

## Work Rules

- Before each work session, read `agents.md`, `memory.md`, and `PROJECT-MEMORY.md`.
- Record important project decisions, fixes, checks, pitfalls, and next steps in `memory.md`.
- Keep existing project decisions unless the user asks to change them.
- Do not reuse competitor images directly. Use original SVGs, licensed/self-owned photos, generated bitmap assets, or safe embeds.
- Keep pages static and crawlable. Important page content must be visible in raw HTML.
- Preserve absolute production canonicals using `https://droughttolerantgrassseed.com/`.

## SEO Standards

- Every public SEO page should have a unique title, meta description, canonical, robots meta, Open Graph tags, Twitter card tags, favicon, and viewport meta.
- Each page should have exactly one H1 and an answer-first opening.
- Use relevant internal links from homepage to hubs, hubs to child pages, child pages back to hubs, and related pages to each other.
- Prefer pages that answer a clear search intent: best, how to plant, vs, region, shade, dogs, soil, water restrictions, and planting timing.
- Avoid making many pages with identical structure and no new information gain.
- Use structured data where appropriate: `WebSite`, `Organization`, `Article`, `CollectionPage`, `BreadcrumbList`, and `FAQPage`.
- Keep `robots.txt` and `sitemap.xml` current after adding or removing pages.
- Use `rel="noopener"` for links that open in a new tab, and use `nofollow`/`sponsored`/`ugc` where link trust or sponsorship requires it.

## Current Technical Shape

- Plain HTML/CSS/JS static site.
- Shared stylesheet: `assets/css/site.css`.
- Shared script: `assets/js/site.js`.
- Main sitemap: `sitemap.xml`.
- Core sitemap: `sitemap-core.xml`.
- Vercel config redirects `www.droughttolerantgrassseed.com` to the apex domain.

