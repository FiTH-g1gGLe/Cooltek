# Cooltek

Website and service report app for Cooltek Ltd: air conditioning and heat pumps, Nottinghamshire.

| Folder | What it is |
|---|---|
| `/` (index.html, air-conditioning.html, heat-pumps.html, servicing.html, contact.html) | The website |
| `/reports/` | The engineers' service report app (fill in on site → Create PDF → share) |
| `/assets/` | Website styles, script, logo |
| `_build/build.py` | Generates the website pages. Edit contact details, areas and page text here, then run `python3 _build/build.py` |

## Website: things to fill in
- `_build/build.py` → `BIZ`: address, company number, MCS certificate number.
- `assets/site.js` → `FORM_ENDPOINT`: paste a free Web3Forms/Formspree form address so enquiries arrive by email automatically. Until then the form opens the visitor's email app, pre-filled to info@coolteklimited.com.
- Real install photos and Google reviews can be added when available.
- Grant figures were checked against gov.uk in November 2026. Re-check after March 2027, when the £9,000 off-gas uplift is due to end.

## Report app
See the notes at the top of `reports/app.js`. Footer details are in its `BUSINESS` block.
After changing report files, bump `VERSION` in `reports/sw.js` so installed copies update.

## Sync between devices (Cloudflare)
Reports save on the device first, then sync through `functions/api/[[path]].js` to a Cloudflare D1 database,
so they appear on every phone and PC that has the access code. Most recent edit wins. Works offline and catches up later.

One-off setup in Cloudflare:
1. **Workers & Pages → Create → Pages → Connect to Git** → pick `FiTH-g1gGLe/Cooltek`. Framework: None. Build command: empty. Output directory: `/`. Deploy.
2. **Storage & Databases → D1 → Create** a database called `cooltek`.
3. In the Pages project: **Settings → Bindings → Add → D1 database**. Variable name `DB`, database `cooltek`.
4. **Settings → Variables and Secrets → Add** → type *Secret*, name `SYNC_KEY`, value = a long access code.
5. **Deployments → Retry deployment** (settings only apply to new deployments).
6. Open `https://<project>.pages.dev/reports/`, tap **Sync off**, enter the access code. Repeat once per device.

Tables are created automatically. Reports saved on the old GitHub Pages address can be sent across by opening the old
address, tapping **Sync off**, and entering the code plus the server address `https://<project>.pages.dev/api`.

## Hosting
GitHub Pages (Settings → Pages → main → / root). For a custom domain, add it under Settings → Pages → Custom domain,
or move to Cloudflare Pages (no build command, output directory `/`).
