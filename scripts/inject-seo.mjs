/**
 * Post-traitement SEO de l'export web statique (dossier `site/`).
 *
 * - remplace le <title> vide généré par Expo Router
 * - injecte description / canonical / Open Graph / Twitter / JSON-LD
 * - marque en noindex les pages techniques et les routes dynamiques
 * - régénère sitemap.xml, robots.txt, 404.html et .nojekyll
 *
 * Le script est idempotent : il retire son propre bloc avant de le réécrire,
 * et il ne touche jamais au reste du <head> (styles, polices, hydratation).
 *
 * Usage : node scripts/inject-seo.mjs
 */
import fs from "node:fs";
import path from "node:path";

const siteDir = path.resolve("site");
const baseUrl = (process.env.SITE_URL ?? "https://ameritalkmadagascar.github.io/AMERITALK").replace(/\/+$/, "");
const lang = "fr";
const ogImage = `${baseUrl}/assets/assets/images/promo-ameritalk.6f35c7806e667258538a80e74c9296ea.png`;
const today = new Date().toISOString().slice(0, 10);

const siteName = "AmeriTalk Madagascar";
const defaultDescription =
  "AmeriTalk Madagascar est une application autonome pour apprendre l’anglais avec des leçons, des exercices et de la pratique orale.";

/** Pages publiques : indexées et listées dans le sitemap. */
const pages = {
  "index.html": {
    title: "AmeriTalk Madagascar — Apprendre l’anglais simplement",
    description: defaultDescription,
    type: "website",
    priority: "1.0",
  },
  "about.html": {
    title: "Ericka Vazahgasy Fabiola — Fondatrice d’AmeriTalk Madagascar",
    description:
      "Ericka Vazahgasy Fabiola est la fondatrice d’AmeriTalk Madagascar. Elle habite à Mananara Nord et collabore avec Kevino Totozafy, créateur de Matour Guide Madagascar.",
    type: "profile",
    priority: "0.8",
  },
  "learn.html": {
    title: "Leçons d’anglais — AmeriTalk Madagascar",
    description:
      "Progressez chapitre par chapitre : salutations, famille, météo, nombres, santé. Chaque leçon combine vocabulaire, audio et exercices.",
    priority: "0.9",
  },
  "practice.html": {
    title: "Pratiquer l’anglais — AmeriTalk Madagascar",
    description:
      "Entraînez-vous à l’oral et à l’écrit avec des sessions de pratique, des exercices guidés et un travail de prononciation.",
    priority: "0.9",
  },
  "practice-pronounce.html": {
    title: "Prononciation anglaise — AmeriTalk Madagascar",
    description:
      "Écoutez un modèle audio, répétez et comparez : l’atelier de prononciation d’Ameritalk aide à corriger l’accent mot par mot.",
    priority: "0.7",
  },
  "kids.html": {
    title: "Anglais pour enfants — AmeriTalk Madagascar Kids",
    description:
      "Des activités ludiques pour les plus jeunes : reconnaître les lettres, les écouter et les retrouver en jouant.",
    priority: "0.8",
  },
  "kids/letters.html": {
    title: "L’alphabet anglais — AmeriTalk Madagascar Kids",
    description: "Découvrez les 26 lettres de l’alphabet anglais avec leur prononciation.",
    priority: "0.6",
  },
  "kids/listen-letter.html": {
    title: "Écoute la lettre — AmeriTalk Madagascar Kids",
    description: "Un jeu d’écoute pour associer le son d’une lettre anglaise à son écriture.",
    priority: "0.6",
  },
  "kids/find-letter.html": {
    title: "Trouve la lettre — AmeriTalk Madagascar Kids",
    description: "Un jeu de reconnaissance visuelle des lettres de l’alphabet anglais.",
    priority: "0.6",
  },
  "progress.html": {
    title: "Ma progression — AmeriTalk Madagascar",
    description: "Suivez vos leçons terminées, vos séries de révision et vos scores d’exercices.",
    priority: "0.5",
  },
};

/** Pages techniques ou dupliquées : noindex, hors sitemap. */
const isPrivatePage = (rel) =>
  rel.includes("[") || // routes dynamiques exportées comme fichiers littéraux
  rel.startsWith("(tabs)/") || // doublons des onglets
  rel.startsWith("dev/") ||
  rel.startsWith("oauth/") ||
  rel === "admin.html" ||
  rel === "test-voice.html" ||
  rel === "_sitemap.html" ||
  rel === "+not-found.html" ||
  rel === "404.html" ||
  rel.startsWith("google"); // fichier de vérification Search Console

const escapeAttr = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const canonicalFor = (rel) => (rel === "index.html" ? `${baseUrl}/` : `${baseUrl}/${rel}`);

function structuredData(rel, data, url) {
  if (rel === "about.html") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: data.title,
      description: data.description,
      url,
      image: `${baseUrl}/assets/assets/images/ceo-ericka.1bf33cc31d12f778e91b30b2394c152f.png`,
      mainEntity: {
        "@type": "Person",
        name: "Ericka Vazahgasy Fabiola",
        givenName: "Ericka",
        familyName: "Vazahgasy Fabiola",
        jobTitle: "Fondatrice d’AmeriTalk Madagascar",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mananara Nord",
          addressCountry: "MG",
        },
        homeLocation: { "@type": "Place", name: "Mananara Nord, Madagascar" },
        worksFor: { "@type": "Organization", name: siteName },
        knowsAbout: ["Apprentissage de l’anglais", "Éducation", "Madagascar"],
        sameAs: ["https://matourguidemadagascar.com/Kevino.html"],
      },
    };
  }
  if (rel === "index.html") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteName,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, Android",
      inLanguage: "fr",
      description: data.description,
      url,
      image: ogImage,
    };
  }
  return null;
}

function buildHead(rel, data) {
  const url = canonicalFor(rel);
  const tags = [
    `<title>${escapeAttr(data.title)}</title>`,
    `<meta name="description" content="${escapeAttr(data.description)}">`,
    `<link rel="icon" href="${baseUrl}/favicon.ico">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}/favicon-32.png">`,
    `<link rel="apple-touch-icon" href="${baseUrl}/apple-touch-icon.png">`,
  ];

  if (data.noindex) {
    tags.push('<meta name="robots" content="noindex,follow">');
  } else {
    tags.push('<meta name="robots" content="index,follow">');
    tags.push(`<link rel="canonical" href="${url}">`);
  }

  tags.push(
    `<meta property="og:site_name" content="${escapeAttr(siteName)}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:title" content="${escapeAttr(data.title)}">`,
    `<meta property="og:description" content="${escapeAttr(data.description)}">`,
    `<meta property="og:type" content="${escapeAttr(data.type ?? "website")}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1536">`,
    `<meta property="og:image:height" content="699">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(data.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(data.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<meta name="theme-color" content="#0B5FFF">`,
    `<meta name="apple-mobile-web-app-title" content="${escapeAttr(siteName)}">`,
  );

  const ld = structuredData(rel, data, url);
  if (ld) tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);

  return `<!--seo:start-->${tags.join("")}<!--seo:end-->`;
}

/** Retire l'ancien bloc SEO (marqué ou non) sans toucher au reste du <head>. */
function cleanHead(head) {
  return head
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/g, "")
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(
      /<meta[^>]+(?:name|property)="(?:description|robots|theme-color|apple-mobile-web-app-title|og:[^"]*|twitter:[^"]*)"[^>]*>/gi,
      "",
    )
    .replace(/<link[^>]+rel="canonical"[^>]*>/gi, "")
    .replace(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/gi, "")
    .replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "");
}

function listHtmlFiles(dir, prefix = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name === "_expo" || entry.name === "assets") continue;
      out.push(...listHtmlFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".html")) {
      out.push(rel);
    }
  }
  return out;
}

if (!fs.existsSync(siteDir)) {
  console.error(`Dossier introuvable : ${siteDir}. Lancez d'abord l'export web.`);
  process.exit(1);
}

const files = listHtmlFiles(siteDir).sort();
let patched = 0;

for (const rel of files) {
  if (rel === "404.html") continue; // régénéré plus bas
  const filePath = path.join(siteDir, rel);
  let html = fs.readFileSync(filePath, "utf8");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    console.warn(`  ! <head> introuvable, page ignorée : ${rel}`);
    continue;
  }

  const known = pages[rel];
  const data = {
    title: known?.title ?? `${siteName} — Apprendre l’anglais`,
    description: known?.description ?? defaultDescription,
    type: known?.type,
    noindex: !known || isPrivatePage(rel),
  };

  const newHead = buildHead(rel, data) + cleanHead(headMatch[1]);
  html =
    html.slice(0, headMatch.index) +
    `<head>${newHead}</head>` +
    html.slice(headMatch.index + headMatch[0].length);
  html = html.replace(
    /<html([^>]*)>/i,
    (_m, attrs) => `<html${attrs.replace(/\s*lang="[^"]*"/i, "")} lang="${lang}">`,
  );

  if (rel === "index.html") {
    html = html
      .replace(/<!--about-link:start-->[\s\S]*?<!--about-link:end-->/g, "")
      .replace(
        /<\/body>/i,
        '<!--about-link:start--><a href="./about.html" aria-label="À propos d’AmeriTalk Madagascar" style="position:fixed;top:18px;right:18px;z-index:2147483647;padding:10px 15px;border:1px solid #58cc02;border-radius:999px;background:#0f1a22;color:#58cc02;font:800 14px system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.3)">À propos</a><!--about-link:end--></body>',
      );
  }

  fs.writeFileSync(filePath, html);
  patched += 1;
}

// --- 404.html : GitHub Pages le sert pour toute URL inconnue.
// On y place une copie de l'app pour que les routes dynamiques
// (/lesson/3, /chapter/2...) soient prises en charge côté client.
const indexPath = path.join(siteDir, "index.html");
if (fs.existsSync(indexPath)) {
  const notFound = fs
    .readFileSync(indexPath, "utf8")
    .replace(/<link[^>]+rel="canonical"[^>]*>/i, "")
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="noindex,follow">');
  fs.writeFileSync(path.join(siteDir, "404.html"), notFound);
}

// --- sitemap.xml
const sitemapEntries = Object.entries(pages)
  .filter(([rel]) => fs.existsSync(path.join(siteDir, rel)))
  .map(
    ([rel, data]) =>
      `  <url>\n    <loc>${canonicalFor(rel)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${data.priority ?? "0.5"}</priority>\n  </url>`,
  )
  .join("\n");
fs.writeFileSync(
  path.join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);

// --- robots.txt
fs.writeFileSync(
  path.join(siteDir, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin.html",
    "Disallow: /dev/",
    "Disallow: /oauth/",
    "Disallow: /test-voice.html",
    "Disallow: /_sitemap.html",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n"),
);

// --- .nojekyll : évite que GitHub Pages ignore le dossier /_expo/
fs.writeFileSync(path.join(siteDir, ".nojekyll"), "");

console.log(`SEO injecté dans ${patched} page(s).`);
console.log(`Générés : 404.html, sitemap.xml, robots.txt, .nojekyll (base : ${baseUrl})`);
