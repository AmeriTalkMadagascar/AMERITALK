import fs from "node:fs";
import path from "node:path";

const siteDir = path.resolve("site");
const pages = {
  "index.html": {
    title: "Ameritalk — Apprendre l’anglais simplement",
    description: "Ameritalk est une application autonome pour apprendre l’anglais avec des leçons, des exercices et de la pratique.",
    type: "website",
    url: "https://kevino2000.github.io/AMERITALK/",
  },
  "about.html": {
    title: "Erica Vazahgasy Fabiola — Fondatrice d’Ameritalk",
    description: "Erica Vazahgasy Fabiola est la fondatrice d’Ameritalk. Elle habite à Mananara Nord et collabore avec Kevino Totozafy, créateur de Matour Guide Madagascar.",
    type: "profile",
    url: "https://kevino2000.github.io/AMERITALK/about.html",
  },
};

const escapeAttr = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

for (const [file, data] of Object.entries(pages)) {
  const filePath = path.join(siteDir, file);
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, "utf8");
  const structuredData = file === "about.html"
    ? {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: data.title,
        description: data.description,
        url: data.url,
        mainEntity: {
          "@type": "Person",
          name: "Erica Vazahgasy Fabiola",
          jobTitle: "Fondatrice d’Ameritalk",
          homeLocation: { "@type": "Place", name: "Mananara Nord" },
          worksFor: { "@type": "Organization", name: "Ameritalk" },
          sameAs: ["https://matourguidemadagascar.com"],
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Ameritalk",
        applicationCategory: "EducationalApplication",
        description: data.description,
        url: data.url,
      };
  const head = `<title>${data.title}</title><meta name="description" content="${escapeAttr(data.description)}"><link rel="canonical" href="${data.url}"><meta property="og:title" content="${escapeAttr(data.title)}"><meta property="og:description" content="${escapeAttr(data.description)}"><meta property="og:type" content="${data.type}"><meta property="og:url" content="${data.url}"><meta name="twitter:card" content="summary"><script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
  html = html.replace(/<title[^>]*>[\s\S]*?<\/script>/, head);
  fs.writeFileSync(filePath, html);
}
