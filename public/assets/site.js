/* Cooltek website script
   FORM_ENDPOINT: paste a form service address here (e.g. a free Web3Forms or Formspree form)
   so enquiries arrive by email automatically. Left empty, the form opens the visitor's
   email app with everything filled in, addressed to EMAIL. */
const FORM_ENDPOINT = "";
const EMAIL = "info@coolteklimited.com";

// mobile menu
const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
if (btn) btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "×" : "☰";
});

// footer year
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// pre-select service from ?service=...
const form = document.getElementById("enquiry");
if (form) {
  const want = new URLSearchParams(location.search).get("service");
  if (want) { const r = form.querySelector(`input[name=service][value="${CSS.escape(want)}"]`); if (r) r.checked = true; }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !(data.phone || data.email)) {
      msg.className = "form-msg err"; msg.hidden = false;
      msg.textContent = "Add your name and a phone number or email so we can get back to you.";
      return;
    }
    const lines = [
      `Name: ${data.name}`, `Phone: ${data.phone || "-"}`, `Email: ${data.email || "-"}`,
      `Postcode: ${data.postcode || "-"}`, `Service: ${data.service || "-"}`, `Property: ${data.property || "-"}`,
      "", data.message || "",
    ];
    if (FORM_ENDPOINT) {
      const b = form.querySelector("button[type=submit]"); b.disabled = true; b.textContent = "Sending…";
      try {
        const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, subject: `Website enquiry: ${data.service || "General"} – ${data.name}`, message: lines.join("\n") }) });
        if (!r.ok) throw new Error(r.status);
        form.reset(); msg.className = "form-msg ok"; msg.hidden = false;
        msg.textContent = "Thanks, your enquiry has been sent. We'll be in touch shortly.";
      } catch (_) {
        msg.className = "form-msg err"; msg.hidden = false;
        msg.textContent = `Your enquiry didn't send. Call us on 01623 431028 or email ${EMAIL}.`;
      } finally { b.disabled = false; b.textContent = "Send enquiry"; }
    } else {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${data.service || "General"} – ${data.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
      msg.className = "form-msg ok"; msg.hidden = false;
      msg.textContent = `Your email app should open with your enquiry ready to send. If it doesn't, email ${EMAIL} or call 01623 431028.`;
    }
  });
}

// hero summer / winter switch (auto-alternates until someone taps it)
const house = document.querySelector(".house-wrap");
if (house) {
  const set = (s) => {
    house.dataset.season = s;
    house.querySelectorAll("[data-set]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.set === s));
  };
  let auto = matchMedia("(prefers-reduced-motion: reduce)").matches ? null
    : setInterval(() => set(house.dataset.season === "summer" ? "winter" : "summer"), 6000);
  house.addEventListener("click", (e) => {
    const b = e.target.closest("[data-set]"); if (!b) return;
    clearInterval(auto); auto = null; set(b.dataset.set);
  });
}
