# Cooltek – Heating Service Report

A web page for filling in heat pump service reports and saving them as a branded 2-page A4 PDF.

## Using it
1. Open the site on a phone, tablet or PC (Android: menu ⋮ → **Add to Home screen** to install it like an app; it then works with no signal).
2. Fill in the boxes and tap the ticks. Everything saves automatically on that device.
3. Add site photos at the bottom, with optional captions. They go on extra pages, 6 per page.
4. Tap **Create PDF** → **Share / send** (email, WhatsApp…) or **Download**.
5. **Jobs** lists every saved report. Search by customer, address, job ref or serial number.
6. **Next visit** starts a new report for the same site: customer, address and unit details are copied,
   the next service date is set a year ahead, and last visit's readings (compressor hours, starts,
   antifreeze, flow rates) are shown under the new ones. A red note appears if hours or starts have gone down.

Reports are stored only in the browser on that device. Nothing is sent to a server.

## Hosting (GitHub + Cloudflare Pages, free)
1. Put these files in a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose the repo.
3. Build settings: Framework preset **None**, build command *empty*, output directory `/`.
4. Deploy. Optionally add a custom domain such as `reports.coolteklimited.com`.

Every push to GitHub updates the site automatically. After changing files, bump `VERSION` in `sw.js` so installed copies update.

## Footer details
Edit the `BUSINESS` block at the top of `app.js` (address, company number, accreditations).

## Changing fields
All fields are listed at the top of `app.js` in the `FORM` object. Each entry is one row:
`{ key, label, unit?, opts?, keep? }`. `keep: true` means it's copied to the next visit; `compare: true` shows last visit's reading.
