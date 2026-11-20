/* Cooltek Heating Service Report
   ------------------------------------------------------------------
   BUSINESS = the details printed in the PDF footer. Fill in the blanks.
   FORM     = every field on the report. To add, remove or rename a field,
              edit the lists. `keep: true` = carried over to the next visit,
              `compare: true` = shows last visit's reading next to the new one. */

const BUSINESS = {
  phone: "01623 431028",
  email: "info@coolteklimited.com",
  web: "www.coolteklimited.com",
  address: "",          // e.g. "Unit 1, Some Road, Mansfield, NG18 1AB"
  companyNo: "",        // e.g. "01234567"  → "Registered in England & Wales No. 01234567"
  extra: "",            // e.g. "MCS certified · F-Gas registered"
};

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
    { key: "nextService", label: "Next service due", type: "date" },
  ],
  outdoor: [
    { key: "odLocation", label: "Outdoor unit location", keep: true },
    { key: "odAtHeight", label: "Is the unit at height?", opts: YN, keep: true },
    { key: "odAccess", label: "If yes, what access restrictions are there?", keep: true },
    { key: "odClearance", label: "Sufficient clearance for servicing?", opts: YN, keep: true },
    { key: "odModel", label: "Outdoor unit model", keep: true },
    { key: "odServiceRef", label: "Outdoor unit service reference", keep: true },
    { key: "odSerial", label: "Outdoor unit serial number", keep: true },
    { key: "compHours", label: "Compressor running hours", num: true, compare: "up" },
    { key: "compStarts", label: "Compressor start / stops", num: true, compare: "up" },
    { key: "antifreeze", label: "Antifreeze protection level", unit: "°C", compare: true },
    { key: "odVoltage", label: "Outdoor unit supply voltage", unit: "V", num: true },
    { key: "odBreaker", label: "Breaker size", unit: "A", keep: true },
    { key: "odCable", label: "Outdoor unit power supply cable size", unit: "mm²", keep: true },
    { key: "odSoftware", label: "Outdoor unit software version", small: "(Request code 090)", keep: true },
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
    { key: "ftcSoftware", label: "FTC software version", small: "(Request code 190)", keep: true },
    { key: "coil", label: "Coil / heat exchanger size / kW rating", small: "(If OEM)", keep: true },
    { key: "legFreq", label: "Legionella frequency setting", unit: "Days", keep: true },
    { key: "legTemp", label: "Legionella target temperature", unit: "°C", keep: true },
    { key: "flowHeat", label: "Primary water flow rate – heating", unit: "L/pm", compare: true },
    { key: "flowDhw", label: "Primary water flow rate – DHW", unit: "L/pm", compare: true },
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
    { key: "ufhInterlock", label: "Underfloor heating interlocked correctly with FTC?", opts: YNNA, keep: true },
    { key: "ufhPump", label: "Underfloor heating pump wired to FTC?", opts: YNNA, keep: true },
    { key: "heatMode", label: "System heating mode", opts: ["Weather compensation", "Auto adaption", "Fixed flow"], layout: "stack", keep: true },
    { key: "thermostat", label: "Thermostat installed?", opts: ["ME Stat", "Third party", "Both"], keep: true },
    { key: "bypass", label: "Bypass installed?", opts: YNNA, keep: true },
    { key: "bypassSetting", label: "Bypass setting?", keep: true },
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

/* ================================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const KEEP_KEYS = new Set();
const COMPARE = {};               // key -> "up" | true
let state = {};                   // the open report
let currentId = null;

/* ---------- Storage (IndexedDB: holds all jobs incl. photos) ---------- */
const DB = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open("cooltek", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("jobs", { keyPath: "id" });
      r.onsuccess = () => { this.db = r.result; res(); };
      r.onerror = () => rej(r.error);
    });
  },
  tx(mode, fn) {
    return new Promise((res, rej) => {
      const t = this.db.transaction("jobs", mode), st = t.objectStore("jobs");
      const out = fn(st);
      t.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
      t.onerror = () => rej(t.error);
    });
  },
  get(id) { return this.tx("readonly", (s) => s.get(id)); },
  put(job) { return this.tx("readwrite", (s) => s.put(job)); },
  del(id) { return this.tx("readwrite", (s) => s.delete(id)); },
  all() { return this.tx("readonly", (s) => s.getAll()); },
};
const lsGet = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- Build the form ---------- */
function detailField(f) {
  const id = "f-" + f.key;
  let input;
  if (f.split) {
    input = `<div class="split">${f.split.map((k, i) =>
      `<input type="text" id="f-${k}" data-key="${k}" placeholder="${f.placeholders[i]}" autocomplete="off">`).join("")}</div>`;
    if (f.keep) f.split.forEach((k) => KEEP_KEYS.add(k));
  } else if (f.type === "textarea") {
    input = `<textarea id="${id}" data-key="${f.key}" rows="${f.rows || 2}"></textarea><div class="pv-ta" data-mirror="${f.key}"></div>`;
  } else {
    input = `<input type="${f.type || "text"}" id="${id}" data-key="${f.key}" autocomplete="off">`;
  }
  if (f.keep && !f.split) KEEP_KEYS.add(f.key);
  return `<div class="dfield"><label for="${f.split ? "f-" + f.split[0] : id}">${esc(f.label)}</label>${input}</div>`;
}

function rowField(f) {
  if (f.keep) KEEP_KEYS.add(f.key);
  if (f.compare) COMPARE[f.key] = f.compare;
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
    const mode = f.num ? ' inputmode="decimal"' : "";
    val = `<div class="val"><input type="${f.type || "text"}" id="f-${f.key}" data-key="${f.key}"${mode} autocomplete="off">${f.unit ? `<span class="unit">${esc(f.unit)}</span>` : ""}</div>`;
  }
  const hint = f.compare ? `<div class="prev-hint" data-prev="${f.key}" hidden></div>` : "";
  return `<div class="row${f.opts || f.multi ? " opts" : ""}">${label}${val}${hint}</div>`;
}

function build() {
  $("#details-left").innerHTML = FORM.detailsLeft.map(detailField).join("");
  $("#details-right").innerHTML = FORM.detailsRight.map(detailField).join("");
  for (const sec of ["outdoor", "indoor", "electrical", "unvented", "heating", "timings"]) {
    $("#" + sec).innerHTML = FORM[sec].map(rowField).join("");
  }
  // Each typed box gets a twin used in the PDF, so long values wrap instead of being cut off
  for (const el of $$('input[data-key]:not([type=radio]):not([type=checkbox])')) {
    const w = document.createElement("span"); w.className = "iw";
    el.replaceWith(w); w.append(el);
    const pv = document.createElement("span"); pv.className = "pv"; w.append(pv);
  }
  // Footer
  const b = BUSINESS;
  $("#footContact").innerHTML = [
    `<b>${esc(b.phone)}</b>`, `<span>${esc(b.email)}</span>`, `<span>${esc(b.web)}</span>`,
    b.address && `<span class="small">${esc(b.address)}</span>`,
    b.companyNo && `<span class="small">Registered in England &amp; Wales No. ${esc(b.companyNo)}</span>`,
    b.extra && `<span class="small">${esc(b.extra)}</span>`,
  ].filter(Boolean).join("");
}

/* ---------- Form <-> state ---------- */
function readForm() {
  const s = { photos: state.photos || [], sigEngineer: state.sigEngineer || "", sigCustomer: state.sigCustomer || "" };
  if (state.prev) s.prev = state.prev;
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
  refreshDerived();
  drawSigs();
  renderPhotos();
}

function fmtDate(v) {
  if (!v) return "";
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return v;
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function refreshDerived() {
  for (const w of $$(".iw")) { const el = $("input", w); $(".pv", w).textContent = el.type === "date" ? fmtDate(el.value) : el.value; }
  for (const d of $$("[data-mirror]")) d.textContent = $(`[data-key="${d.dataset.mirror}"]`).value;
  renderCompare();
}

/* ---------- Compare with last visit ---------- */
function num(v) { const n = parseFloat(String(v ?? "").replace(/[^\d.\-]/g, "")); return isNaN(n) ? null : n; }
function renderCompare() {
  const prev = state.prev;
  for (const el of $$("[data-prev]")) {
    const k = el.dataset.prev, old = prev && prev.values ? prev.values[k] : "";
    if (!old) { el.hidden = true; el.textContent = ""; continue; }
    const now = $(`[data-key="${k}"]`).value, a = num(old), b = num(now);
    let txt = `Last visit${prev.date ? " (" + fmtDate(prev.date) + ")" : ""}: <b>${esc(old)}</b>`;
    el.classList.remove("warn");
    if (a !== null && b !== null) {
      const diff = Math.round((b - a) * 100) / 100;
      txt += ` · change <b>${diff > 0 ? "+" : ""}${diff}</b>`;
      if (COMPARE[k] === "up" && diff < 0) { el.classList.add("warn"); txt += " – lower than last visit, check reading"; }
    }
    el.innerHTML = txt; el.hidden = false;
  }
}

/* ---------- Saving ---------- */
let saveTimer;
function save(now) {
  clearTimeout(saveTimer);
  const go = async () => {
    state = readForm();
    try {
      const old = currentId ? await DB.get(currentId) : null;
      if (!currentId) currentId = newId();
      await DB.put({ id: currentId, created: old ? old.created : Date.now(), updated: Date.now(), data: state });
      lsSet("cooltek-current", currentId);
      note("Saved ✓");
    } catch (e) { note("Couldn't save – storage full?"); }
  };
  return now ? go() : (saveTimer = setTimeout(go, 500));
}
let noteTimer;
function note(t) { const el = $("#savedNote"); el.textContent = t; clearTimeout(noteTimer); noteTimer = setTimeout(() => (el.textContent = ""), 2000); }
let toastTimer;
function toast(t) { const el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 3200); }

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
  if (w && (c.width !== w || c.height !== h)) { c.width = w; c.height = h; }
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
const photoList = () => (state.photos || []).map((p) => (typeof p === "string" ? { src: p, caption: "" } : p));
function renderPhotos() {
  state.photos = photoList();
  $("#photoGrid").innerHTML = state.photos.map((p, i) =>
    `<div class="photo"><img src="${p.src}" alt="Site photo ${i + 1}"><button type="button" class="del" data-del="${i}" aria-label="Remove photo">×</button>
     <input type="text" class="cap" data-cap="${i}" placeholder="Caption (optional)" value="${esc(p.caption)}"></div>`).join("");
}
function setupPhotos() {
  $("#photoInput").addEventListener("change", async (e) => {
    const files = [...e.target.files]; e.target.value = "";
    for (const f of files) { try { state.photos = [...photoList(), { src: await shrink(f), caption: "" }]; } catch (_) {} }
    renderPhotos(); save(true);
  });
  $("#photoGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-del]"); if (!b) return;
    state.photos.splice(+b.dataset.del, 1); renderPhotos(); save(true);
  });
  $("#photoGrid").addEventListener("input", (e) => {
    const c = e.target.closest("[data-cap]"); if (!c) return;
    state.photos[+c.dataset.cap].caption = c.value; save();
  });
}

/* ---------- Jobs ---------- */
function today() { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
function plusYear(v) { if (!v) return ""; const [y, m, d] = v.split("-"); return `${+y + 1}-${m}-${d}`; }

async function openJob(id) {
  const job = await DB.get(id);
  if (!job) return;
  currentId = id; state = job.data || {}; lsSet("cooltek-current", id);
  writeForm(state); window.scrollTo(0, 0);
}
async function newBlank() {
  await save(true);
  currentId = null; state = { date: today(), nextService: plusYear(today()) };
  writeForm(state); await save(true); window.scrollTo(0, 0);
}
async function nextVisitFrom(data) {
  await save(true);
  const n = {};
  for (const k of KEEP_KEYS) if (k in data) n[k] = data[k];
  n.date = today(); n.nextService = plusYear(n.date);
  n.prev = { date: data.date || "", jobRef: data.jobRef || "", values: {} };
  for (const k of Object.keys(COMPARE)) if (data[k]) n.prev.values[k] = data[k];
  currentId = null; state = n; writeForm(state); await save(true); window.scrollTo(0, 0);
  toast("New visit started – site & unit details copied, last readings shown for comparison");
}

const jobTitle = (d) => d.customerName || (d.address || "").split(/[\n,]/)[0] || "Untitled report";
async function renderJobs() {
  const q = $("#jobSearch").value.trim().toLowerCase();
  let jobs = (await DB.all()).sort((a, b) => b.updated - a.updated);
  if (q) jobs = jobs.filter((j) => {
    const d = j.data || {};
    return [d.customerName, d.customerPhone, d.address, d.jobRef, d.odSerial, d.cylSerial, d.w3w].join(" ").toLowerCase().includes(q);
  });
  $("#jobList").innerHTML = jobs.length ? jobs.map((j) => {
    const d = j.data || {};
    const sub = [(d.address || "").replace(/\n/g, ", "), d.jobRef, fmtDate(d.date)].filter(Boolean).join(" · ");
    return `<div class="job${j.id === currentId ? " current" : ""}">
      <div class="job-main" data-open="${j.id}"><b>${esc(jobTitle(d))}</b><span>${esc(sub || "No details yet")}</span></div>
      <div class="job-actions"><button type="button" data-next="${j.id}" title="Start next visit for this site">Next visit</button>
      <button type="button" class="del" data-delete="${j.id}" aria-label="Delete">🗑</button></div></div>`;
  }).join("") : `<div class="empty-list">${q ? "No matching jobs" : "No saved jobs yet"}</div>`;
}
function setupJobs() {
  const panel = $("#jobsPanel");
  $("#btnJobs").addEventListener("click", async () => { await save(true); $("#jobSearch").value = ""; await renderJobs(); panel.hidden = false; });
  $("#jobSearch").addEventListener("input", renderJobs);
  $("#btnBlank").addEventListener("click", async () => { panel.hidden = true; await newBlank(); });
  $("#jobList").addEventListener("click", async (e) => {
    const o = e.target.closest("[data-open]"), n = e.target.closest("[data-next]"), d = e.target.closest("[data-delete]");
    if (o) { panel.hidden = true; await openJob(o.dataset.open); }
    else if (n) { const j = await DB.get(n.dataset.next); panel.hidden = true; if (j) await nextVisitFrom(j.data || {}); }
    else if (d) {
      const j = await DB.get(d.dataset.delete);
      if (!confirm(`Delete "${jobTitle(j.data || {})}"? This can't be undone.`)) return;
      await DB.del(d.dataset.delete);
      if (d.dataset.delete === currentId) { currentId = null; state = { date: today(), nextService: plusYear(today()) }; writeForm(state); }
      renderJobs();
    }
  });
  $("#btnNewVisit").addEventListener("click", async () => {
    if (!confirm("Start the next visit for this site?\n\nThis report stays saved in Jobs. Customer, site and unit details are copied to a new report.")) return;
    await nextVisitFrom(readForm());
  });
  for (const ov of $$(".overlay")) ov.addEventListener("click", (e) => { if (e.target === ov || e.target.closest("[data-close]")) ov.hidden = true; });
}

/* ---------- PDF maker ----------
   Each A4 page is drawn as an image (SVG foreignObject → canvas) and the images
   are packed into a PDF written here – no libraries, works offline. */
const PX_W = 794, PX_H = 1123, SCALE = 2;
let cssText = null, logoData = null;

const toDataURL = (blob) => new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(blob); });
async function assets() {
  if (cssText === null) cssText = await (await fetch("style.css")).text();
  if (logoData === null) logoData = await toDataURL(await (await fetch("logo.png")).blob());
}

function pdfPages() {
  // live pages -> static clones with values baked in
  for (const el of $$("#pages input")) {
    if (el.type === "radio" || el.type === "checkbox") el.toggleAttribute("checked", el.checked);
  }
  const pages = [$("#page1"), $("#page2")].map((p) => p.cloneNode(true));
  for (const p of pages) {
    p.removeAttribute("id");
    for (const img of $$("img", p)) if (img.getAttribute("src") === "logo.png") img.src = logoData;
    for (const c of $$("canvas[data-sig]", p)) {
      const img = document.createElement("img"); const src = state[c.dataset.sig];
      if (src) img.src = src; else img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      c.replaceWith(img);
    }
    for (const t of $$("textarea", p)) t.remove();
    for (const n of $$(".no-print", p)) n.remove();
  }
  // photo pages, 6 per page
  const photos = photoList();
  for (let i = 0; i < photos.length; i += 6) {
    const sec = document.createElement("section"); sec.className = "page photos-page";
    const chunk = photos.slice(i, i + 6);
    sec.innerHTML = `<div class="block"><h2>Site visit images${photos.length > 6 ? ` (${i / 6 + 1} of ${Math.ceil(photos.length / 6)})` : ""}</h2>
      <div class="photo-grid">${chunk.map((p) => `<figure class="photo" style="margin:0"><img src="${p.src}" alt=""/><figcaption>${esc(p.caption)}</figcaption></figure>`).join("")}</div></div>
      <div class="photo-num">${esc([state.jobRef, (state.address || "").split(/[\n,]/)[0]].filter(Boolean).join(" · "))}</div>`;
    pages.push(sec);
  }
  return pages;
}

async function renderPage(page) {
  const wrap = document.createElement("div");
  wrap.className = "pdf-render";
  wrap.style.cssText = `width:${PX_W}px;height:${PX_H}px;background:#fff;font-family:${getComputedStyle(document.body).fontFamily}`;
  const st = document.createElement("style"); st.textContent = cssText;
  wrap.append(st, page);
  const xml = new XMLSerializer().serializeToString(wrap);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${PX_W * SCALE}" height="${PX_H * SCALE}" viewBox="0 0 ${PX_W} ${PX_H}"><foreignObject x="0" y="0" width="${PX_W}" height="${PX_H}">${xml}</foreignObject></svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const c = document.createElement("canvas"); c.width = PX_W * SCALE; c.height = PX_H * SCALE;
  const ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(img, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.88);
}

function buildPdf(jpegs) {
  const enc = new TextEncoder(), parts = [], offsets = [];
  let len = 0;
  const push = (x) => { const b = typeof x === "string" ? enc.encode(x) : x; parts.push(b); len += b.length; };
  const obj = (n, body) => { offsets[n] = len; push(`${n} 0 obj\n`); body(); push("\nendobj\n"); };
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const W = 595.28, H = 841.89, n = jpegs.length;
  const kids = jpegs.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
  obj(1, () => push("<< /Type /Catalog /Pages 2 0 R >>"));
  obj(2, () => push(`<< /Type /Pages /Kids [${kids}] /Count ${n} >>`));
  jpegs.forEach((d, i) => {
    const bin = Uint8Array.from(atob(d.split(",")[1]), (ch) => ch.charCodeAt(0));
    const p = 3 + i * 3, content = `q ${W} 0 0 ${H} 0 0 cm /Im0 Do Q`;
    obj(p, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 ${p + 2} 0 R >> >> /Contents ${p + 1} 0 R >>`));
    obj(p + 1, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
    obj(p + 2, () => { push(`<< /Type /XObject /Subtype /Image /Width ${PX_W * SCALE} /Height ${PX_H * SCALE} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bin.length} >>\nstream\n`); push(bin); push("\nendstream"); });
  });
  const total = 3 + n * 3, xref = len;
  let x = `xref\n0 ${total}\n0000000000 65535 f \n`;
  for (let i = 1; i < total; i++) x += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  push(x + `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, { type: "application/pdf" });
}

function pdfName(s) {
  const first = (s.address || "").split(/[\n,]/)[0].trim();
  return ["Service Report", s.jobRef, first].filter(Boolean).join(" - ").replace(/[\\/:*?"<>|]+/g, "").slice(0, 90) + ".pdf";
}

let lastPdf = null;
function setupPdf() {
  const btn = $("#btnPdf");
  btn.addEventListener("click", async () => {
    btn.disabled = true; const label = btn.textContent; btn.textContent = "Creating…";
    try {
      await save(true); refreshDerived(); await assets();
      const jpegs = [];
      for (const p of pdfPages()) jpegs.push(await renderPage(p));
      const blob = buildPdf(jpegs), name = pdfName(state);
      lastPdf = new File([blob], name, { type: "application/pdf" });
      $("#pdfName").textContent = `${name} · ${jpegs.length} pages · ${(blob.size / 1048576).toFixed(1)} MB`;
      $("#btnShare").hidden = !(navigator.canShare && navigator.canShare({ files: [lastPdf] }));
      $("#pdfSheet").hidden = false;
    } catch (e) {
      console.error(e);
      toast("This browser couldn't make the PDF directly – opening print instead");
      document.body.classList.add("pdf-render"); window.print();
      setTimeout(() => document.body.classList.remove("pdf-render"), 1000);
    } finally { btn.disabled = false; btn.textContent = label; }
  });
  $("#btnShare").addEventListener("click", async () => {
    try { await navigator.share({ files: [lastPdf], title: lastPdf.name }); $("#pdfSheet").hidden = true; }
    catch (e) { if (e.name !== "AbortError") toast("Sharing didn't work – try Download"); }
  });
  $("#btnDownload").addEventListener("click", () => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(lastPdf); a.download = lastPdf.name;
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 30000);
    $("#pdfSheet").hidden = true; toast("Saved to Downloads");
  });
  window.addEventListener("beforeprint", () => { refreshDerived(); document.body.classList.add("pdf-render"); });
  window.addEventListener("afterprint", () => document.body.classList.remove("pdf-render"));
}

/* ---------- Start ---------- */
async function start() {
  build();
  setupRadios(); setupSigs(); setupPhotos(); setupJobs(); setupPdf();
  document.addEventListener("input", (e) => {
    if (!e.target.matches("[data-key]")) return;
    if (e.target.dataset.key === "date" && !$("#f-nextService").value) $("#f-nextService").value = plusYear(e.target.value);
    refreshDerived(); save();
  });
  document.addEventListener("change", (e) => { if (e.target.matches("[data-key]")) save(); });

  await DB.open();
  // bring over a report saved by the first version of the app
  const legacy = lsGet("cooltek-report-v1");
  if (legacy && !lsGet("cooltek-migrated")) {
    try { const d = JSON.parse(legacy); if (d && Object.keys(d).length > 2) { const id = newId(); await DB.put({ id, created: Date.now(), updated: Date.now(), data: d }); lsSet("cooltek-current", id); } } catch (_) {}
    lsSet("cooltek-migrated", "1");
  }
  const cur = lsGet("cooltek-current");
  const job = (cur && (await DB.get(cur))) || (await DB.all()).sort((a, b) => b.updated - a.updated)[0];
  if (job) await openJob(job.id);
  else { state = { date: today(), nextService: plusYear(today()) }; writeForm(state); }
}
start();

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
