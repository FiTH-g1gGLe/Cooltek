/* Cooltek Heating Service Report
   Everything is configured in the FORM object below — to add, remove or rename a
   field, edit the lists. `keep: true` = kept when "New visit" is pressed. */

const YN = ["Yes", "No"];
const YNNA = ["Yes", "No", "N/A"];

const FORM = {
  detailsLeft: [
    { key: "jobRef", label: "Job reference number" },
    { key: "date", label: "Date", type: "date" },
    { key: "customer", label: "Customer name / contact number", split: ["customerName", "customerPhone"], keep: true,
      placeholders: ["Name", "Phone"] },
    { key: "engineer", label: "Engineer", keep: true },
    { key: "installation", label: "Installation (year)", keep: true },
  ],
  detailsRight: [
    { key: "address", label: "Site name / address", type: "textarea", rows: 2, keep: true },
    { key: "w3w", label: "What3words location (if rural / difficult to find)", keep: true },
    { key: "reason", label: "Reason for visit", keep: true },
    { key: "warranty", label: "Warranty expiration date", keep: true },
  ],
  outdoor: [
    { key: "odLocation", label: "Outdoor unit location", keep: true },
    { key: "odAtHeight", label: "Is the unit at height?", opts: YN, keep: true },
    { key: "odAccess", label: "If yes, what access restrictions are there?", keep: true },
    { key: "odClearance", label: "Sufficient clearance for servicing?", opts: YN, keep: true },
    { key: "odModel", label: "Outdoor unit model", keep: true },
    { key: "odServiceRef", label: "Outdoor unit service reference", keep: true },
    { key: "odSerial", label: "Outdoor unit serial number", keep: true },
    { key: "compHours", label: "Compressor running hours", num: true },
    { key: "compStarts", label: "Compressor start / stops", num: true },
    { key: "antifreeze", label: "Antifreeze protection level", unit: "°C" },
    { key: "odVoltage", label: "Outdoor unit supply voltage", unit: "V", num: true },
    { key: "odBreaker", label: "Breaker size", unit: "A", keep: true },
    { key: "odCable", label: "Outdoor unit power supply cable size", unit: "mm²", keep: true },
    { key: "odSoftware", label: "Outdoor unit software version", small: "(Request code 090)" },
    { key: "flexis", label: "Flexis installed on water pipework?", opts: YN, keep: true },
    { key: "commsCable", label: "Communication cable size (S1, S2 & S3)", unit: "mm²", keep: true },
    { key: "afValves", label: "Antifreeze valves installed?", opts: YN, keep: true },
    { key: "insulated", label: "Pipework sufficiently insulated", small: "(Must be Class O 19mm wall thickness)", opts: YN },
  ],
  indoor: [
    { key: "cylLocation", label: "Cylinder location?", keep: true },
    { key: "cylAccessible", label: "Cylinder easily accessible?", opts: YN, keep: true },
    { key: "cylClearance", label: "Sufficient clearance for servicing?", opts: YN, keep: true },
    { key: "cylModel", label: "Cylinder type / model", keep: true },
    { key: "cylSerial", label: "Cylinder serial number", keep: true },
    { key: "ftcModel", label: "FTC model number", keep: true },
    { key: "ftcSerial", label: "FTC serial number", keep: true },
    { key: "ftcVersion", label: "Control system (FTC version)", unit: "FTC", keep: true },
    { key: "ftcSoftware", label: "FTC software version", small: "(Request code 190)" },
    { key: "coil", label: "Coil / heat exchanger size / kW rating", small: "(If OEM)", keep: true },
    { key: "legFreq", label: "Legionella frequency setting", unit: "Days" },
    { key: "legTemp", label: "Legionella target temperature", unit: "°C" },
    { key: "flowHeat", label: "Primary water flow rate – heating", unit: "L/pm" },
    { key: "flowDhw", label: "Primary water flow rate – DHW", unit: "L/pm" },
    { key: "magFilter", label: "Magnetic filter / strainer cleaned?", opts: YN },
    { key: "sdCard", label: "SD card installed & recording", opts: YN },
    { key: "wifi", label: "Wi-Fi adaptor fitted and communicating?", opts: YN },
    { key: "mac", label: "MELCloud MAC address", keep: true },
    { key: "iuPower", label: "Indoor unit power supply", multi: ["Internal", "External"], keep: true },
    { key: "iuBreaker", label: "Indoor unit breaker size", unit: "A", keep: true },
  ],
  electrical: [
    { key: "elWiring", label: "All outdoor unit wiring connections checked for tightness?", opts: YN },
    { key: "elVisual", label: "Visual check on outdoor unit electrical components, ok?", opts: YN },
    { key: "elMains", label: "Mains cable correctly sized, and UV protected?", opts: YN },
    { key: "elComms", label: "Communication cables installed correctly with no breaks or isolator installed?", opts: YN },
    { key: "elIsoDist", label: "Mains isolator for outdoor unit installed within 1 metre?", opts: YN },
    { key: "elIsoEntry", label: "Mains isolator cable entry from bottom?", opts: YN },
    { key: "elIsoRated", label: "Mains isolator correctly rated?", opts: YN },
  ],
  unvented: [
    { key: "uvLeaks", label: "Visual inspection, any signs of leaks?", opts: YN },
    { key: "uvInstalled", label: "Is the cylinder installed correctly?", opts: YN },
    { key: "uvDischarge", label: "Discharge pipework installed & terminated correctly?", opts: YN },
    { key: "uvG3", label: "G3 unvented safety checks completed, ok?", opts: YN },
    { key: "uvZone", label: "Zone valves all operating correctly?", opts: YN },
    { key: "uvMinWater", label: "Minimum water quantity for outdoor unit size met?", opts: YN },
    { key: "uvVolumizer", label: "System water volumizer installed?", opts: YN },
    { key: "uvExpSize", label: "Expansion vessel size (domestic hot water)", unit: "L", keep: true },
    { key: "uvExpCharged", label: "Expansion vessels checked and charged if required?", opts: YN },
    { key: "uvPrv", label: "Pressure reducing valve installed?", opts: YN },
    { key: "uvHardWater", label: "Hard water protection installed?", opts: YN },
    { key: "uvMains", label: "Incoming water main pressure correct for cylinder specification?", opts: YN },
  ],
  heating: [
    { key: "emitter", label: "Heat emitter type", opts: ["Radiators", "Under floor heating", "Radiators and UFH", "Other"], layout: "stack", keep: true },
    { key: "tds", label: "Total dissolved solids meter reading / turbidity tube reading", opts: ["Pass", "Fail"] },
    { key: "ufhInterlock", label: "Underfloor heating interlocked correctly with FTC?", opts: YNNA },
    { key: "ufhPump", label: "Underfloor heating pump wired to FTC?", opts: YNNA },
    { key: "heatMode", label: "System heating mode", opts: ["Weather compensation", "Auto adaption", "Fixed flow"], layout: "stack" },
    { key: "thermostat", label: "Thermostat installed?", opts: ["ME Stat", "Third party", "Both"], keep: true },
    { key: "bypass", label: "Bypass installed?", opts: YNNA },
    { key: "bypassSetting", label: "Bypass setting?" },
    { key: "heatExp", label: "Expansion vessel size for heating system", unit: "L", keep: true },
    { key: "consumed", label: "Consumed energy last year", unit: "kWh" },
    { key: "delivered", label: "Delivered energy last year", unit: "kWh" },
    { key: "scop", label: "Seasonal co-efficiency of performance", small: "(Reading for the year)" },
  ],
  timings: [
    { key: "arrive", label: "Site arrival time", type: "time" },
    { key: "depart", label: "Site departure time", type: "time" },
  ],
};

const STORE_KEY = "cooltek-report-v1";
const KEEP_KEYS = new Set();
let state = {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- Build the form ---------- */
function detailField(f) {
  const id = "f-" + f.key;
  let input;
  if (f.split) {
    input = `<div class="split">${f.split.map((k, i) =>
      `<input type="text" id="f-${k}" data-key="${k}" placeholder="${f.placeholders[i]}" autocomplete="off">`).join("")}</div>`;
    f.split.forEach((k) => f.keep && KEEP_KEYS.add(k));
  } else if (f.type === "textarea") {
    input = `<textarea id="${id}" data-key="${f.key}" rows="${f.rows || 2}"></textarea>`;
  } else {
    input = `<input type="${f.type || "text"}" id="${id}" data-key="${f.key}" autocomplete="off">`;
  }
  if (f.keep && !f.split) KEEP_KEYS.add(f.key);
  return `<div class="dfield"><label for="${f.split ? "f-" + f.split[0] : id}">${esc(f.label)}</label>${input}</div>`;
}

function rowField(f) {
  if (f.keep) KEEP_KEYS.add(f.key);
  const label = `<label${f.opts || f.multi ? "" : ` for="f-${f.key}"`}>${esc(f.label)}${f.small ? `<small>${esc(f.small)}</small>` : ""}</label>`;
  let val;
  if (f.opts) {
    const cls = f.layout === "stack" ? "val stack" : "val";
    val = `<div class="${cls}" role="radiogroup">${f.opts.map((o) =>
      `<label class="opt"><input type="radio" name="${f.key}" value="${esc(o)}" data-key="${f.key}"><span class="box"></span>${esc(o)}</label>`).join("")}</div>`;
  } else if (f.multi) {
    val = `<div class="val">${f.multi.map((o) =>
      `<label class="opt"><input type="checkbox" value="${esc(o)}" data-key="${f.key}"><span class="box"></span>${esc(o)}</label>`).join("")}</div>`;
  } else {
    const type = f.type || "text";
    const mode = f.num ? ' inputmode="decimal"' : "";
    val = `<div class="val"><input type="${type}" id="f-${f.key}" data-key="${f.key}"${mode} autocomplete="off">${f.unit ? `<span class="unit">${esc(f.unit)}</span>` : ""}</div>`;
  }
  return `<div class="row${f.opts || f.multi ? " opts" : ""}">${label}${val}</div>`;
}

function build() {
  $("#details-left").innerHTML = FORM.detailsLeft.map(detailField).join("");
  $("#details-right").innerHTML = FORM.detailsRight.map(detailField).join("");
  for (const sec of ["outdoor", "indoor", "electrical", "unvented", "heating", "timings"]) {
    $("#" + sec).innerHTML = FORM[sec].map(rowField).join("");
  }
  // Each typed box gets a print twin, so long values wrap instead of being cut off in the PDF
  for (const el of $$('input[data-key]:not([type=radio]):not([type=checkbox])')) {
    const w = document.createElement("span"); w.className = "iw";
    el.replaceWith(w); w.append(el);
    const pv = document.createElement("span"); pv.className = "pv"; w.append(pv);
  }
}

function fmt(el) {
  const v = el.value;
  if (!v) return "";
  if (el.type === "date") {
    const [y, m, d] = v.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }
  return v;
}
function mirrorInputs() {
  for (const w of $$(".iw")) { const el = $("input", w); $(".pv", w).textContent = fmt(el); }
}

/* ---------- State ---------- */
function readForm() {
  const s = { photos: state.photos || [], sigEngineer: state.sigEngineer || "", sigCustomer: state.sigCustomer || "" };
  for (const el of $$("[data-key]")) {
    const k = el.dataset.key;
    if (el.type === "radio") { if (el.checked) s[k] = el.value; else if (!(k in s)) s[k] = ""; }
    else if (el.type === "checkbox") { s[k] = s[k] || []; if (el.checked) s[k].push(el.value); }
    else s[k] = el.value;
  }
  return s;
}

function writeForm(s) {
  for (const el of $$("[data-key]")) {
    const v = s[el.dataset.key];
    if (el.type === "radio") el.checked = v === el.value;
    else if (el.type === "checkbox") el.checked = Array.isArray(v) && v.includes(el.value);
    else el.value = v ?? "";
  }
  mirrorNotes();
  mirrorInputs();
  drawSigs();
  renderPhotos();
}

let saveTimer;
function save(now) {
  clearTimeout(saveTimer);
  const go = () => {
    state = readForm();
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      note("Saved ✓");
    } catch (e) {
      // usually too many photos for browser storage — keep everything except photos
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ ...state, photos: [] })); } catch (_) {}
      note("Saved (photos not stored – too large)");
    }
  };
  now ? go() : (saveTimer = setTimeout(go, 400));
}
function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { return {}; }
}
let noteTimer;
function note(t) {
  const el = $("#savedNote"); el.textContent = t;
  clearTimeout(noteTimer); noteTimer = setTimeout(() => (el.textContent = ""), 2000);
}

/* ---------- Notes (textareas print as full text blocks) ---------- */
function mirrorNotes() {
  for (const d of $$("[data-mirror]")) d.textContent = $(`[data-key="${d.dataset.mirror}"]`).value;
}

/* ---------- Tick boxes: tap again to untick ---------- */
function setupRadios() {
  document.addEventListener("pointerdown", (e) => {
    const lab = e.target.closest(".opt"); if (!lab) return;
    const r = $("input[type=radio]", lab); if (r) r.dataset.was = r.checked ? "1" : "";
  });
  document.addEventListener("click", (e) => {
    const r = e.target.closest(".opt input[type=radio]"); if (!r) return;
    if (r.dataset.was === "1") { r.checked = false; r.dataset.was = ""; save(); }
  });
}

/* ---------- Signatures ---------- */
function sizeCanvas(c) {
  const r = c.getBoundingClientRect(), dpr = Math.max(2, window.devicePixelRatio || 1);
  const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
  if (w && (c.width !== w || c.height !== h)) { c.width = w; c.height = h; return true; }
  return false;
}
function drawSigs() {
  for (const c of $$("canvas[data-sig]")) {
    sizeCanvas(c);
    const ctx = c.getContext("2d"); ctx.clearRect(0, 0, c.width, c.height);
    const src = state[c.dataset.sig];
    if (src) {
      const img = new Image();
      img.onload = () => { const k = Math.min(c.width / img.width, c.height / img.height), w = img.width * k, h = img.height * k;
        ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h); };
      img.src = src;
    }
  }
}
function setupSigs() {
  for (const c of $$("canvas[data-sig]")) {
    const ctx = c.getContext("2d"); let drawing = false, last;
    const pt = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
    c.addEventListener("pointerdown", (e) => { drawing = true; last = pt(e); c.setPointerCapture(e.pointerId); e.preventDefault(); });
    c.addEventListener("pointermove", (e) => {
      if (!drawing) return; const p = pt(e);
      ctx.strokeStyle = "#1b1f5e"; ctx.lineWidth = c.width / 220; ctx.lineCap = ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke(); last = p;
    });
    const end = () => { if (!drawing) return; drawing = false; state[c.dataset.sig] = c.toDataURL("image/png"); save(); };
    c.addEventListener("pointerup", end); c.addEventListener("pointercancel", end);
  }
  for (const b of $$("[data-clear-sig]")) b.addEventListener("click", () => { state[b.dataset.clearSig] = ""; drawSigs(); save(); });
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(drawSigs, 200); });
}

/* ---------- Photos ---------- */
function shrink(file) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1400, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = rej; img.src = url;
  });
}
function renderPhotos() {
  const photos = state.photos || [];
  $("#photoGrid").innerHTML = photos.map((src, i) =>
    `<div class="photo"><img src="${src}" alt="Site photo ${i + 1}"><button type="button" class="del" data-del="${i}" aria-label="Remove photo">×</button></div>`).join("");
  $("#photosEditor").classList.toggle("empty", photos.length === 0);
  $("#page2").classList.toggle("last", photos.length === 0);
  const total = 2 + Math.ceil(photos.length / 6);
  $$(".pcount").forEach((el) => (el.textContent = total));
}
function setupPhotos() {
  $("#photoInput").addEventListener("change", async (e) => {
    const files = [...e.target.files]; e.target.value = "";
    for (const f of files) { try { state.photos = [...(state.photos || []), await shrink(f)]; } catch (_) {} }
    renderPhotos(); save(true);
  });
  $("#photoGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-del]"); if (!b) return;
    state.photos.splice(+b.dataset.del, 1); renderPhotos(); save(true);
  });
}

/* ---------- Toolbar ---------- */
function today() { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }

function pdfName(s) {
  const first = (s.address || "").split(/[\n,]/)[0].trim();
  const parts = ["Service Report", s.jobRef, first].filter(Boolean);
  return parts.join(" - ").replace(/[\\/:*?"<>|]+/g, "").slice(0, 90);
}

function setupToolbar() {
  $("#btnPdf").addEventListener("click", () => {
    save(true); mirrorNotes(); mirrorInputs();
    const old = document.title; document.title = pdfName(state);  // becomes the PDF file name
    window.print();
    setTimeout(() => (document.title = old), 1500);
  });
  $("#btnNewVisit").addEventListener("click", () => {
    if (!confirm("Start a new visit?\n\nCustomer, site and unit details are kept. Readings, checks, notes, signatures and photos are cleared.")) return;
    const s = readForm(), n = {};
    for (const k of KEEP_KEYS) if (k in s) n[k] = s[k];
    n.date = today();
    state = n; writeForm(state); save(true); window.scrollTo(0, 0);
  });
  $("#btnClear").addEventListener("click", () => {
    if (!confirm("Clear the whole report? This can't be undone.")) return;
    state = { date: today() }; writeForm(state); save(true); window.scrollTo(0, 0);
  });
}

/* ---------- Start ---------- */
build();
state = load();
if (!state.date) state.date = today();
writeForm(state);
setupRadios(); setupSigs(); setupPhotos(); setupToolbar();
document.addEventListener("input", (e) => { if (e.target.matches("[data-key]")) { if (e.target.tagName === "TEXTAREA") mirrorNotes(); else mirrorInputs(); save(); } });
document.addEventListener("change", (e) => { if (e.target.matches("[data-key]")) save(); });
window.addEventListener("beforeprint", () => { mirrorNotes(); mirrorInputs(); });

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
