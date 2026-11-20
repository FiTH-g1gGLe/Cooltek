# Cooltek – Heating Service Report

A web page for filling in heat pump service reports and saving them as a branded 2-page A4 PDF.

## Using it
1. Open the site on a phone, tablet or PC (Android: menu ⋮ → **Add to Home screen** to install it like an app; it then works with no signal).
2. Fill in the boxes and tap the ticks. Everything saves automatically on that device.
3. Add site photos at the bottom if needed. Each photo page holds 6 photos.
4. Tap **Save as PDF**. In the print screen pick **Save as PDF**; the file name will be the job reference and address.
5. **New visit** keeps the customer, site and unit details (handy for next year's service at the same site) and clears the readings, checks, notes, signatures and photos.

Reports are stored only in the browser on that device. Nothing is sent to a server.

## Hosting (GitHub + Cloudflare Pages, free)
1. Put these files in a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose the repo.
3. Build settings: Framework preset **None**, build command *empty*, output directory `/`.
4. Deploy. Optionally add a custom domain such as `reports.coolteklimited.com`.

Every push to GitHub updates the site automatically. After changing files, bump `VERSION` in `sw.js` so installed copies update.

## Changing fields
All fields are listed at the top of `app.js` in the `FORM` object. Each entry is one row:
`{ key, label, unit?, opts?, keep? }`. `keep: true` means it's kept when you press New visit.
