/* Call-out form – fields and settings for this form. */
window.FORM = {
  detailsLeft: [
    { key: "jobRef", label: "Job reference" },
    { key: "date", label: "Date", type: "date" },
    { key: "customerName", label: "Name of customer" },
  ],
  detailsRight: [
    { key: "address", label: "Address", type: "textarea", rows: 3 },
  ],
  onsite: [
    { key: "arrive", label: "Arrived on site", type: "time" },
    { key: "depart", label: "Left site", type: "time" },
    { key: "timeOnSite", label: "Time on site" },
  ],
  travel: [
    { key: "miles", label: "How far travelled", unit: "miles", num: true },
  ],
};

window.FORM_CONFIG = {
  store: "cooltek-callout",     // name for this form's saved jobs on the device
  api: "callout",               // sync area on the server
  pdfTitle: "Call-out",
  nextVisit: false,
  otherForm: { href: "../reports/", label: "Service reports" },
  // work out time on site from the arrival and departure times
  derive(key, field) {
    if (key !== "arrive" && key !== "depart") return;
    const a = field("arrive").value, d = field("depart").value;
    if (!a || !d) return;
    const [ah, am] = a.split(":").map(Number), [dh, dm] = d.split(":").map(Number);
    let mins = dh * 60 + dm - (ah * 60 + am);
    if (mins < 0) mins += 24 * 60;            // went past midnight
    const h = Math.floor(mins / 60), m = mins % 60;
    field("timeOnSite").value = h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
  },
};
