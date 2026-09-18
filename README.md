# Ameritalk

Application d’apprentissage de l’anglais construite avec Expo, React Native et Expo Router.

## Version web

Le dossier `site/` contient l’export web statique prêt pour GitHub Pages. Le workflow
`.github/workflows/pages.yml` publie automatiquement son contenu à chaque mise à jour de
la branche `main`.

### Régénérer le site

```bash
pnpm build:web     # export Expo + post-traitement SEO
# ou, si l'export existe déjà :
pnpm seo
```

`scripts/inject-seo.mjs` complète l’export brut d’Expo, qui ne contient ni titres ni
métadonnées. Il doit être relancé **après chaque export**, sinon toutes les pages
repartent avec un `<title>` vide. Le script :

- remplit `<title>`, `description`, canonical, Open Graph, Twitter Card et JSON-LD ;
- passe `<html lang>` à `fr` ;
- met en `noindex` les pages techniques (`admin`, `dev/`, `oauth/`, onglets dupliqués,
  routes dynamiques `[id].html`) ;
- régénère `sitemap.xml`, `robots.txt` et `404.html` ;
- crée `.nojekyll`, indispensable pour que GitHub Pages serve le dossier `site/_expo/`.

Il est idempotent : on peut le relancer sans dupliquer les balises.

L’URL de base est `https://kevino2000.github.io/AMERITALK` ; elle doit rester cohérente
avec `experiments.baseUrl` dans `app.config.ts`. Pour publier ailleurs :

```bash
SITE_URL=https://mondomaine.com pnpm seo
```

### Routes profondes

GitHub Pages ne gère pas les routes dynamiques côté serveur. `404.html` est une copie de
l’app : toute URL inconnue (`/lesson/3`, `/chapter/2`…) charge le bundle, puis
Expo Router résout la route côté client.

## Version Android

L’APK release est généré localement à partir du projet Expo. Les dossiers natifs et
dépendances générés ne sont pas suivis dans ce dépôt.
