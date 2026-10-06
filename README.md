# COMPRENDS PAS

A small Astro + Leaflet site: a full-page map, a diary index, two article layouts, and an English / German / French selector. The original `COMPRENDS PAS/` drafts are untouched.

## Run

Requires Node.js 22.12+.

Run commands from this repository folder: `C:\Users\Paul\Desktop\Sync\lina_website\comprendspas`.

```sh
npm install
npm run dev
```

Open http://localhost:4321. In Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`.

```sh
npm run check
npm run build
npm run preview
```

## Add or edit content

Everything the author needs is in [content/](content/README.md). Start with its plain-language guide. Each entry has its own folder containing info.yaml, its photos, and optional en.md, de.md, and fr.md translations. Copy content/_new-entry to start.

Astro reads shared metadata from content/*/info.yaml and text from the language files in the same folder. Folders beginning with an underscore are excluded. Photos are bundled directly from entry folders. Shared metadata is combined with translated text when pages are generated; existing article URLs are preserved.

## Map

Hover or keyboard-focus a pin for a preview; click to open the entry. On touch screens, tap the pin, then the preview. There are no map cards, lists, or filters. With JavaScript disabled or tiles unavailable, the diary link provides access to the entries.

OpenStreetMap works without configuration. For the cleaner **CARTO Voyager** tiles, request a free key at https://www.carto.com/basemaps/, copy `.env.example` to `.env`, and set `PUBLIC_CARTO_KEY`. Restart the local server. This is a public browser key; restrict it to your domains. For GitHub Pages, add the same key as a repository Actions variable named `PUBLIC_CARTO_KEY`.

Without a key the map remains on OpenStreetMap, with a muted colour treatment. Attribution remains visible for either provider. Follow the provider's usage terms; CARTO currently offers a free non-commercial allowance of five million requests per month. OpenStreetMap's policy: https://operations.osmfoundation.org/policies/tiles/.

## GitHub Pages

This repository is connected to `https://github.com/linadeiss-star/comprendspas` on branch `main`.

1. Commit and push the website files to `main`.
2. In the GitHub repository's **Settings → Pages**, choose **GitHub Actions** as the source.
3. Under **Actions → Publish to GitHub Pages**, choose **Run workflow** on `main` (or push another change).

The workflow checks the content, builds the site, and deploys only `dist/`. It handles the `/comprendspas/` URL prefix automatically. The expected address is `https://linadeiss-star.github.io/comprendspas/`. Future pushes to `main` publish automatically. GitHub Free requires a public repository; GitHub Pro supports a private personal repository. No site has been published from this workspace yet.

## Checks

`npm run test:smoke` tests the local site using Playwright and installed Chrome. It checks the remaining pages, pin colours, previews, article navigation, language selection, and mobile layout. Screenshots are saved in ignored `.local/`. Set `TEST_URL` to test another origin or repository prefix.

## Files

- `content/`: author guide and one self-contained folder per entry.
- `src/layouts/`: shared page, diary, and spot layouts.
- `src/components/EntryMap.astro`: map and previews.
- `src/styles/global.css`: responsive styling.
- `src/lib/i18n.ts`: interface translations.

The photos are licensed stand-ins with credits at `/credits/`. The diary adapts supplied text; the spot entry is demonstration content. Fonts load from Google Fonts, with system fallbacks. Photos and articles are local; map tiles need a network connection.


