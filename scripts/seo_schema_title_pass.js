const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://droughttolerantgrassseed.com";
const SITE_NAME = "Drought Tolerant Grass Seed Guide";

const titleUpdates = {
  "faq/index.html": "Drought Tolerant Grass Seed FAQ",
  "guides/best-drought-tolerant-grass-seed/index.html": "Best Drought Tolerant Grass Seed Choices",
  "guides/drought-tolerant-grass-for-dogs/index.html": "Drought Tolerant Grass for Dogs",
  "guides/drought-tolerant-lawn-seed-reviews/index.html": "Drought Tolerant Lawn Seed Reviews",
  "guides/how-to-plant-drought-tolerant-grass-seed/index.html": "How to Plant Drought Tolerant Grass Seed",
  "guides/index.html": "Drought Tolerant Grass Seed Guides",
  "guides/xeriscape-lawn-alternatives/index.html": "Xeriscape Lawn Alternatives",
  "index.html": "Drought Tolerant Grass Seed Guide",
  "planting-calendar/index.html": "Drought Tolerant Grass Seed Planting Calendar",
  "regions/arizona/index.html": "Arizona Drought Tolerant Grass Seed",
  "regions/california/index.html": "California Drought Tolerant Grass Seed",
  "regions/florida/index.html": "Florida Drought Tolerant Grass Seed",
  "regions/index.html": "Drought Tolerant Grass Seed by Region",
  "regions/texas/index.html": "Texas Drought Tolerant Grass Seed",
  "seed-types/bermuda-grass-seed/index.html": "Bermuda Grass Seed for Drought",
  "seed-types/buffalograss-seed/index.html": "Buffalograss Seed for Drought",
  "seed-types/fine-fescue-for-drought/index.html": "Fine Fescue for Drought",
  "seed-types/index.html": "Drought Tolerant Grass Seed Types",
  "seed-types/kentucky-bluegrass/index.html": "Kentucky Bluegrass for Drought",
  "seed-types/perennial-ryegrass-for-drought/index.html": "Perennial Ryegrass for Drought",
  "seed-types/zoysia-grass-seed/index.html": "Zoysia Grass Seed for Drought"
};

const descriptionUpdates = {
  "guides/best-drought-tolerant-grass-seed-for-curb-appeal/index.html": "Find drought tolerant grass seed for curb appeal when the lawn needs to look intentional from the street while using less water.",
  "guides/best-drought-tolerant-grass-seed/index.html": "Compare drought tolerant grass seed by climate, sun, traffic, soil, and watering limits, including bermuda, zoysia, tall fescue, and buffalograss.",
  "guides/best-grass-for-shared-yards/index.html": "Find the best grass for shared yards when visibility, mixed use, and lower irrigation all matter across more than one household.",
  "guides/best-low-water-grass-for-dog-runs/index.html": "Find low-water grass for dog runs that can handle repeated traffic paths, concentrated wear, and realistic irrigation.",
  "guides/drought-tolerant-grass-for-backyard-entertaining/index.html": "Choose drought tolerant grass for backyard entertaining when the lawn must handle gatherings, furniture, traffic, and lower irrigation.",
  "guides/drought-tolerant-grass-seed-for-erosion-control/index.html": "Find drought tolerant grass seed for erosion control when the goal is to hold soil without relying on a thirsty lawn.",
  "guides/drought-tolerant-lawn-seed-reviews/index.html": "Compare drought tolerant lawn seed by grass type, climate fit, and real yard tradeoffs before trusting marketing-heavy roundups.",
  "guides/index.html": "Browse drought tolerant grass seed guides for best seed choices, planting steps, and warm-season vs cool-season decisions.",
  "guides/low-maintenance-grass-for-water-restrictions/index.html": "Choose low-maintenance grass for water restrictions when the yard needs to stay presentable with less irrigation and fewer interventions.",
  "guides/low-water-lawn-for-hoa-neighborhoods/index.html": "Plan a low-water lawn for HOA neighborhoods that looks controlled, stays presentable, and uses less water.",
  "guides/low-water-lawn-for-rental-properties/index.html": "Plan a low-water lawn for rental properties that stays presentable and durable under real tenant use and lower irrigation.",
  "guides/low-water-lawn-for-small-yards/index.html": "Plan a low-water lawn for small yards where every visible patch needs to look deliberate under lower irrigation.",
  "seed-types/centipede-grass-seed/index.html": "Understand when centipede grass seed makes sense for drought-minded lawns where lower-input expectations matter most.",
  "seed-types/fine-fescue-for-drought/index.html": "Learn when fine fescue fits a drought-tolerant lawn plan, especially in lower-input cool-season yards.",
  "seed-types/index.html": "Compare bermuda, zoysia, tall fescue, buffalograss, and Kentucky bluegrass for drought tolerance, traffic, and watering needs.",
  "seed-types/perennial-ryegrass-for-drought/index.html": "Learn when perennial ryegrass belongs in drought lawn seed mixes and when tall fescue or warm-season grasses make more sense."
};

const sectionNames = {
  guides: "Guides",
  "seed-types": "Seed Types",
  regions: "Regions",
  "planting-calendar": "Planting Calendar",
  faq: "FAQ",
  about: "About",
  contact: "Contact"
};

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.name.endsWith(".html")) files.push(absolute);
  }
  return files;
}

function readSitemapDates() {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const dates = new Map();
  for (const match of xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)) {
    dates.set(match[1], match[2]);
  }
  return dates;
}

function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

function pageUrlFromRel(rel) {
  if (rel === "index.html") return `${SITE}/`;
  return `${SITE}/${rel.replace(/index\.html$/, "")}`;
}

function pageType(rel) {
  if (rel === "about/index.html") return "AboutPage";
  if (rel === "contact/index.html") return "ContactPage";
  if (["guides/index.html", "seed-types/index.html", "regions/index.html", "planting-calendar/index.html"].includes(rel)) return "CollectionPage";
  return "Article";
}

function breadcrumbItems(rel, title) {
  const url = pageUrlFromRel(rel);
  const urlPath = new URL(url).pathname.replace(/^\/|\/$/g, "");
  const parts = urlPath ? urlPath.split("/") : [];
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }];
  if (!parts.length) return items;

  let currentPath = "";
  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === parts.length - 1;
    const name = isLast ? title : sectionNames[part] || titleCase(part);
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name,
      item: `${SITE}${currentPath}/`
    });
  });
  return items;
}

function titleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildSchema(rel, html, dates) {
  const url = extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i) || pageUrlFromRel(rel);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const description = extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const image = extract(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  const type = pageType(rel);
  const lastmod = dates.get(url) || "2026-06-29";

  const basePage = {
    "@type": type,
    "@id": `${url}#primary`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` }
  };

  if (type === "Article") {
    Object.assign(basePage, {
      headline: title,
      image,
      author: { "@id": `${SITE}/#organization` },
      datePublished: lastmod,
      dateModified: lastmod,
      mainEntityOfPage: url
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      basePage,
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbItems(rel, title)
      }
    ]
  };

  return `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2).split("\n").map((line) => `  ${line}`).join("\n")}\n  </script>\n`;
}

function buildBreadcrumbOnly(rel, html) {
  const url = extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i) || pageUrlFromRel(rel);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/i);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: breadcrumbItems(rel, title)
  };
  return `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2).split("\n").map((line) => `  ${line}`).join("\n")}\n  </script>\n`;
}

function updateMeta(rel, html) {
  let next = html;
  if (titleUpdates[rel]) {
    const title = titleUpdates[rel];
    next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
    next = next.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']>/i, `<meta property="og:title" content="${title}">`);
    next = next.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']>/i, `<meta name="twitter:title" content="${title}">`);
  }

  if (descriptionUpdates[rel]) {
    const description = descriptionUpdates[rel];
    next = next.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']>/i, `<meta name="description" content="${description}">`);
    next = next.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']>/i, `<meta property="og:description" content="${description}">`);
    next = next.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']>/i, `<meta name="twitter:description" content="${description}">`);
  }
  return next;
}

function updateSchema(rel, html, dates) {
  if (rel === "index.html") return html;
  if (!html.includes("application/ld+json")) {
    return html.replace("</head>", `${buildSchema(rel, html, dates)}</head>`);
  }
  if (!html.includes("BreadcrumbList")) {
    return html.replace("</head>", `${buildBreadcrumbOnly(rel, html)}</head>`);
  }
  return html;
}

const dates = readSitemapDates();
let changed = 0;

for (const file of walk(ROOT).sort()) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const original = fs.readFileSync(file, "utf8");
  let next = updateMeta(rel, original);
  next = updateSchema(rel, next, dates);
  if (next !== original) {
    fs.writeFileSync(file, next);
    changed += 1;
  }
}

console.log(`Updated ${changed} HTML files.`);
