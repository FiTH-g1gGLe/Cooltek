# Cooltek

Website and service report app for Cooltek Ltd: air conditioning and heat pumps, Nottinghamshire.

| Folder | What it is |
|---|---|
| `public/` (index.html, air-conditioning.html, …) | The website |
| `public/callout/` | The call-out form (job ref, customer, address, time on site, miles, job description, materials, photos) |
| `public/app/` | Shared engine and styles used by both forms (`app.js`, `style.css`) |
| `public/reports/` | The engineers' service report app (fill in on site → Create PDF → share) |
| `public/assets/` | Website styles, script, logo |
| `_build/build.py` | Generates the website pages. Edit contact details, areas and page text here, then run `python3 _build/build.py` |

## Website: things to fill in
- `_build/build.py` → `BIZ`: address, company number, MCS certificate number.
- `public/assets/site.js` → `FORM_ENDPOINT`: paste a free Web3Forms/Formspree form address so enquiries arrive by email automatically. Until then the form opens the visitor's email app, pre-filled to info@coolteklimited.com.
- Real install photos and Google reviews can be added when available.
- Grant figures were checked against gov.uk in November 2026. Re-check after March 2027, when the £9,000 off-gas uplift is due to end.

## Report app
Fields for each form are in its `form.js` (`public/reports/form.js`, `public/callout/form.js`). Footer details are in the `BUSINESS` block at the top of `public/app/app.js`.
After changing files, bump `VERSION` in `public/reports/sw.js` and `public/callout/sw.js` so installed copies update.

## Sync between devices (Cloudflare Worker + D1)
Reports save on the device first, then sync through the Worker (`src/worker.js` → `src/api.js`) to a Cloudflare D1
database, so they appear on every phone and PC that has the access code. Most recent edit wins. Works offline.

Layout: `public/` = website + `/reports/` app (served as static assets), `src/` = Worker code, `wrangler.jsonc` = Worker config.

Setup:
1. Workers & Pages → the `cooltek` Worker, connected to this GitHub repo (deploy command `npx wrangler deploy`).
2. Storage & Databases → D1 → create `cooltek`, then add its database ID to `d1_databases` in `wrangler.jsonc`.
3. Worker → Settings → Variables and Secrets → add Secret `SYNC_KEY` (the company access code).
4. Open `https://<worker>.workers.dev/reports/` or `/callout/`, tap **Sync off**, enter the code. Once per device covers both forms.

Service reports sync to the `jobs` table, call-outs to `callout_jobs`; photos share the `photos` table.

## Hosting
GitHub Pages (Settings → Pages → main → / root). For a custom domain, add it under Settings → Pages → Custom domain,
or move to Cloudflare Pages (no build command, output directory `/`).
