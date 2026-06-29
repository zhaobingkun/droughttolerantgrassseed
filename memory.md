# Project Memory

## Session Log

### 2026-06-29 SEO playbook optimization pass

- Applied the SEO playbook recommendations to the current static site without restructuring the site.
- Added reusable script `scripts/seo_schema_title_pass.js` for this schema/title pass.
- Added JSON-LD coverage across the site:
  - hub pages use `CollectionPage` plus `BreadcrumbList`
  - guide, seed-type, region, and planting pages use `Article` plus `BreadcrumbList`
  - existing FAQ and main best-seed schema were preserved and supplemented with breadcrumbs where needed
- Shortened high-priority title tags and synchronized matching `og:title` and `twitter:title`.
- Shortened meta descriptions over the preferred range and synchronized matching OG/Twitter descriptions.
- Post-pass validation:
  - 62 HTML pages checked
  - 64 JSON-LD blocks found and all parse correctly
  - 0 pages with title over 60 characters
  - 0 pages with meta description over 160 characters
  - 0 duplicate titles
  - 0 duplicate canonicals
  - 0 missing sitemap URLs
  - 0 broken local links or asset references

### 2026-06-29 Project review

- Read existing project context from `PROJECT-MEMORY.md` and `README.md`.
- Confirmed the site is a static SEO content site for `droughttolerantgrassseed.com`.
- Confirmed there are 62 HTML pages and 62 URLs in `sitemap.xml`.
- Confirmed `sitemap.xml` has no missing or extra HTML page URLs.
- Confirmed no duplicate titles and no duplicate canonicals in the current HTML set.
- Confirmed local HTML links and local image/script/style references have no broken targets.
- Confirmed `robots.txt` allows crawling and points to both `sitemap-core.xml` and `sitemap.xml`.
- Created `agents.md` and `memory.md` so future sessions have the requested project rules and working notes.

## Current Strengths

- The site already has a real hub-and-spoke SEO structure.
- Core metadata is broadly present: title, meta description, canonical, robots, OG, Twitter image, favicon, and viewport.
- The domain is consistently set to `https://droughttolerantgrassseed.com/`.
- The page set covers useful long-tail intent: regions, grass types, shade, dogs, soil, water restrictions, comparisons, and planting timing.
- Internal references and local assets currently resolve cleanly.

## Current Risks And Next Fixes

- Structured data, long title, and long meta description issues were addressed in the 2026-06-29 SEO playbook optimization pass.
- `sitemap-core.xml` is a curated subset, not a full sitemap. Keep using `sitemap.xml` as the complete sitemap and update both intentionally.
- Future content additions should avoid repeating the same template too closely; each page needs a distinct user problem and practical information gain.

## Operating Notes

- Start future work by reading `agents.md`, `memory.md`, and `PROJECT-MEMORY.md`.
- After adding pages, run checks for metadata, one H1, canonical uniqueness, sitemap coverage, and broken local links.
- Keep monetization secondary until the information value and page coverage are strong.
