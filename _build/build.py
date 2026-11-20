"""Builds the Cooltek website pages.  Run:  python3 _build/build.py
Edit BIZ for contact details, AREAS for towns covered, and the page bodies below."""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
BIZ = {
    "name": "Cooltek Ltd",
    "phone": "01623 431028",
    "tel": "+441623431028",
    "email": "info@coolteklimited.com",
    "address": "",       # add when known
    "company_no": "",    # add when known
    "mcs_no": "",        # add when known
}
AREAS = ["Mansfield", "Mansfield Woodhouse", "Sutton-in-Ashfield", "Kirkby-in-Ashfield", "Nottingham",
         "Newark", "Southwell", "Ollerton", "Worksop", "Hucknall", "Shirebrook", "Chesterfield"]
NAV = [("air-conditioning.html", "Air conditioning"), ("heat-pumps.html", "Heat pumps"),
       ("servicing.html", "Servicing & repairs"), ("contact.html", "Contact")]

# simple line drawings (no stock photos)
SVG_AC = """<svg viewBox="0 0 120 80" aria-hidden="true"><rect class="ill-line" x="6" y="8" width="108" height="34" rx="8"/>
<path class="ill-line" d="M18 34h84M18 28h84"/><path class="ill-line" d="M30 52c-4 6-4 12 0 18M60 52c-4 6-4 12 0 18M90 52c-4 6-4 12 0 18"/></svg>"""
SVG_HP = """<svg viewBox="0 0 120 80" aria-hidden="true"><rect class="ill-line" x="6" y="6" width="108" height="64" rx="5"/>
<circle class="ill-line" cx="46" cy="38" r="22"/><path class="ill-line" d="M46 16v44M24 38h44M30.5 22.5l31 31M61.5 22.5l-31 31"/>
<path class="ill-line" d="M84 20h20M84 30h20M84 40h20M84 50h20"/><path class="ill-line" d="M16 70v6M104 70v6"/></svg>"""

def stripes(n=3):
    return '<div class="stripes" aria-hidden="true">' + "<i></i>" * n + "</div>"

def head(title, desc, page, theme=""):
    nav = "".join(f'<a href="{h}"{" aria-current=page" if h == page else ""}>{t}</a>' for h, t in NAV)
    return f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="theme-color" content="#1b1f5e">
<link rel="icon" href="assets/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
</head>
<body class="{theme}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="assets/logo.png" alt="Cooltek home" width="150" height="30"></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Menu">☰</button>
    <nav class="nav" id="nav">{nav}<a class="call" href="tel:{BIZ['tel']}">Call {BIZ['phone']}</a></nav>
  </div>
</header>
<main id="main">
"""

def callband(text="Need a quote, a service or a repair?"):
    return f"""<section class="callband"><div class="wrap">
  <h2>{text}</h2>
  <a class="phone" href="tel:{BIZ['tel']}">{BIZ['phone']}</a>
</div></section>"""

def foot():
    areas = "".join(f"<li>{a}</li>" for a in AREAS[:6])
    legal = [f"© <span data-year>2026</span> {BIZ['name']}"]
    if BIZ["company_no"]: legal.append(f"Registered in England &amp; Wales No. {BIZ['company_no']}")
    if BIZ["mcs_no"]: legal.append(f"MCS certificate {BIZ['mcs_no']}")
    addr = f"<p>{BIZ['address']}</p>" if BIZ["address"] else ""
    return f"""</main>
<footer class="site-foot">
  <div class="foot-stripes" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="index.html"><img src="assets/logo.png" alt="Cooltek" width="140" height="28"></a>
        <p>Air conditioning and heat pump installation, servicing and repairs across Nottinghamshire.</p>{addr}
      </div>
      <div><h3>Services</h3><ul>
        <li><a href="air-conditioning.html">Air conditioning</a></li>
        <li><a href="heat-pumps.html">Heat pumps</a></li>
        <li><a href="servicing.html">Servicing &amp; repairs</a></li>
        <li><a href="heat-pumps.html#grant">Heat pump grants</a></li></ul></div>
      <div><h3>Areas</h3><ul>{areas}<li><a href="contact.html#areas">All areas</a></li></ul></div>
      <div><h3>Contact</h3><ul>
        <li><a href="tel:{BIZ['tel']}">{BIZ['phone']}</a></li>
        <li><a href="mailto:{BIZ['email']}">{BIZ['email']}</a></li>
        <li><a href="contact.html">Send an enquiry</a></li></ul></div>
    </div>
    <div class="legal"><span>{' &nbsp;|&nbsp; '.join(legal)}</span><span>Mitsubishi Electric approved installer &nbsp;|&nbsp; MCS accredited</span></div>
  </div>
</footer>
<script src="assets/site.js"></script>
</body>
</html>
"""

def page_head(h1, lead, ctas=True, service=""):
    q = f"contact.html?service={service}" if service else "contact.html"
    btns = f"""<div class="actions"><a class="btn btn-red" href="{q}">Ask for a quote</a>
<a class="btn btn-line" href="tel:{BIZ['tel']}">Call {BIZ['phone']}</a></div>""" if ctas else ""
    return f"""<section class="page-head">{stripes()}<div class="wrap"><h1>{h1}</h1><p class="lead">{lead}</p>{btns}</div></section>"""

def faq(items):
    return '<div class="faq">' + "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in items) + "</div>"

def ticks(items):
    return '<ul class="ticks">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

GRANT_NOTE = ("Figures from the government's Boiler Upgrade Scheme for England and Wales, checked November 2026. "
              "Eligibility rules apply. We'll confirm what your property qualifies for at the survey.")

# ------------------------------------------------------------------ HOME
schema = {"@context": "https://schema.org", "@type": "HVACBusiness", "name": BIZ["name"], "telephone": BIZ["phone"],
          "email": BIZ["email"], "areaServed": ["Nottinghamshire"] + AREAS,
          "description": "Air conditioning and heat pump installation, servicing and repairs across Nottinghamshire."}
home = head("Cooltek | Air conditioning & heat pumps in Nottinghamshire",
            "Mitsubishi Electric approved installer of air conditioning and air source heat pumps for homes and businesses across Nottinghamshire. MCS accredited, 35+ years' experience.",
            "index.html") + f"""
<script type="application/ld+json">{json.dumps(schema)}</script>
<section class="hero">{stripes()}
  <div class="wrap">
    <h1>Air conditioning and heat pumps across Nottinghamshire</h1>
    <p class="lead">We design, fit and look after Mitsubishi Electric systems for homes and businesses. Over 35 years in the trade, MCS accredited, and on the end of the phone when something stops working.</p>
    <div class="actions"><a class="btn btn-red" href="contact.html">Ask for a quote</a><a class="btn btn-line" href="tel:{BIZ['tel']}">Call {BIZ['phone']}</a></div>
    <ul class="hero-facts"><li>Mitsubishi Electric approved installer</li><li>MCS accredited</li><li>35+ years' experience</li><li>Homes and businesses</li></ul>
  </div>
</section>

<div class="wrap">
  <div class="paths">
    <a class="path theme-cool" href="air-conditioning.html">{SVG_AC}
      <h2>Air conditioning</h2>
      <p>Cool rooms in summer and efficient heat in winter. Wall units, cassettes and multi-room systems for bedrooms, home offices, shops and workplaces.</p>
      <span class="more">Air conditioning</span></a>
    <a class="path theme-warm" href="heat-pumps.html">{SVG_HP}
      <h2>Heat pumps</h2>
      <p>Replace a gas, oil or LPG boiler with a Mitsubishi Electric Ecodan air source heat pump, with up to £7,500 off through the government grant.</p>
      <span class="more">Heat pumps</span></a>
  </div>
</div>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>Fitted by people who'll still answer the phone next year</h2>
      <p class="lead">A heat pump or air con system is only as good as the design and install behind it. We size every system for the building, fit it to the manufacturer's standards and keep it running with yearly servicing.</p>
      <p>When something goes wrong, you speak to the people who fitted it, not a call centre.</p>
    </div>
    <ul class="creds">
      <li><b>Approved</b><span>Mitsubishi Electric approved installer for Nottinghamshire.</span></li>
      <li><b>Accredited</b><span>MCS accredited, so your heat pump qualifies for the Boiler Upgrade Scheme grant.</span></li>
      <li><b>Experienced</b><span>Over 35 years installing and maintaining heating and cooling systems.</span></li>
      <li><b>Local</b><span>Based in Mansfield, covering Nottinghamshire and the surrounding area.</span></li>
    </ul>
  </div>
</section>

<section class="section navy">
  <div class="wrap grant">
    <div class="grant-figs">
      <div class="fig theme-warm"><strong>£7,500</strong><span>off an air source heat pump</span></div>
      <div class="fig theme-cool"><strong>£2,500</strong><span>off an air-to-air system</span></div>
    </div>
    <div>
      <h2>Government grants towards your new system</h2>
      <p class="lead">The Boiler Upgrade Scheme takes money off the cost of replacing fossil fuel heating. Homes heated by oil or LPG with no mains gas can get £9,000 towards a heat pump until March 2027.</p>
      <p>The grant is claimed by your MCS installer, so we apply for it and take it straight off your quote.</p>
      <p class="small">{GRANT_NOTE}</p>
      <div class="actions"><a class="btn btn-red" href="contact.html?service=Heat%20pump">Check if you qualify</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>How an install works</h2>
    <ol class="steps">
      <li><h3>Survey</h3><p>We visit, look at the building and talk through what you want it to do.</p></li>
      <li><h3>Design and quote</h3><p>We size the system properly and give you a clear, written quote.</p></li>
      <li><h3>Installation</h3><p>We fit and commission it, then show you how to use it.</p></li>
      <li><h3>Aftercare</h3><p>Yearly servicing keeps it efficient, and we're a call away if anything goes wrong.</p></li>
    </ol>
  </div>
</section>

<section class="section mist">
  <div class="wrap split">
    <div>
      <h2>Already have a system?</h2>
      <p class="lead">We service, repair and clean heat pumps and air conditioning, with emergency call-outs when you need them.</p>
      <p>Every heat pump service comes with a full written report covering the checks, readings and any recommendations.</p>
      <div class="actions"><a class="btn btn-navy" href="servicing.html">Servicing &amp; repairs</a></div>
    </div>
    <div>
      <h3>Areas we cover</h3>
      <ul class="areas">{''.join(f'<li>{a}</li>' for a in AREAS)}</ul>
      <p class="small" style="margin-top:14px">Not on the list? Call us, we probably cover you.</p>
    </div>
  </div>
</section>
""" + callband() + foot()

# ------------------------------------------------------------------ AIR CON
ac = head("Air conditioning installation in Nottinghamshire | Cooltek",
          "Mitsubishi Electric air conditioning for homes, offices and shops across Nottinghamshire. Wall units, cassettes and multi-room systems that cool and heat.",
          "air-conditioning.html", "theme-cool") + page_head(
    "Air conditioning for homes and businesses",
    "Quiet, efficient Mitsubishi Electric systems that keep rooms cool in summer and heat them in winter.",
    service="Air%20conditioning") + f"""
<section class="section">
  <div class="wrap split">
    <div>
      <h2>Cooling that heats too</h2>
      <p class="lead">Modern air conditioning works as an air-to-air heat pump. The same unit that cools a bedroom in July can heat it in January, usually for less than an electric heater.</p>
      <p>Air-to-air systems can now qualify for a £2,500 government grant when they replace fossil fuel heating. We'll tell you at the survey if yours does.</p>
    </div>
    <div>
      <h3>What we fit</h3>
      {ticks(["Wall-mounted split units", "Multi-split systems for several rooms", "Ceiling cassettes", "Ducted and concealed units", "Systems for server and comms rooms", "Controls and Wi-Fi apps"])}
    </div>
  </div>
</section>
<section class="section mist">
  <div class="wrap split">
    <div><h2>At home</h2>{ticks(["Bedrooms and loft conversions", "Home offices", "Conservatories and garden rooms", "Living spaces and extensions"])}</div>
    <div><h2>At work</h2>{ticks(["Offices and meeting rooms", "Shops and salons", "Restaurants and takeaways", "Workshops and server rooms"])}</div>
  </div>
</section>
<section class="section">
  <div class="wrap split">
    <div><h2>Common questions</h2><p class="lead">Anything else, just call us on {BIZ['phone']}.</p></div>
    {faq([
      ("Can air conditioning heat as well as cool?", "Yes. Almost all the systems we fit are air-to-air heat pumps, so they heat as well as cool and switch between the two automatically."),
      ("Is it noisy?", "Indoor units are designed to be very quiet, and outdoor units are positioned to keep noise away from you and your neighbours. We'll talk through the best spot at the survey."),
      ("How long does an install take?", "A single wall unit is often fitted in a day. Multi-room systems and commercial jobs take longer, and we'll give you a timescale with your quote."),
      ("Does air conditioning need servicing?", "Yes. A yearly service keeps it efficient, keeps the filters and coils clean, and catches small problems before they turn into breakdowns."),
    ])}
  </div>
</section>
""" + callband("Want a room cooler next summer?") + foot()

# ------------------------------------------------------------------ HEAT PUMPS
hp = head("Air source heat pump installer in Nottinghamshire | Cooltek",
          "MCS accredited Mitsubishi Electric Ecodan heat pump installer in Nottinghamshire. Up to £7,500 off with the Boiler Upgrade Scheme, £9,000 for off-gas homes.",
          "heat-pumps.html", "theme-warm") + page_head(
    "Air source heat pumps, designed and fitted properly",
    "Swap your gas, oil or LPG boiler for a Mitsubishi Electric Ecodan heat pump, fitted by an MCS accredited installer.",
    service="Heat%20pump") + f"""
<section class="section">
  <div class="wrap split">
    <div>
      <h2>Why a heat pump</h2>
      <p class="lead">A heat pump takes warmth from the outside air, even in freezing weather, and uses it to heat your radiators or underfloor heating and your hot water.</p>
      <p>Designed and set up properly, it gives steady, comfortable heat with no gas, no oil deliveries and no flue. Getting the design right is what makes it efficient, which is why we size every system to the house.</p>
    </div>
    <div>
      <h3>What's included</h3>
      {ticks(["Home survey and room-by-room heat loss calculation", "Mitsubishi Electric Ecodan outdoor unit", "Hot water cylinder and controls", "Radiator upgrades where needed", "Grant application handled for you", "Commissioning and a walkthrough of the controls"])}
    </div>
  </div>
</section>
<section class="section navy" id="grant">
  <div class="wrap grant">
    <div class="grant-figs">
      <div class="fig theme-warm"><strong>£7,500</strong><span>off an air source heat pump</span></div>
      <div class="fig theme-warm"><strong>£9,000</strong><span>for oil or LPG homes with no mains gas, until March 2027</span></div>
    </div>
    <div>
      <h2>The Boiler Upgrade Scheme</h2>
      <p class="lead">Homeowners and small businesses in England and Wales can get money off a heat pump when it replaces fossil fuel heating.</p>
      <p>Only an MCS accredited installer can claim the grant. We apply for it and take it off your quote, so you never pay the full price up front.</p>
      <p class="small">{GRANT_NOTE}</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <h2>From first visit to first warm day</h2>
    <ol class="steps">
      <li><h3>Survey</h3><p>We measure up, check insulation and radiators, and work out the heat each room needs.</p></li>
      <li><h3>Design and quote</h3><p>You get a written quote with the grant already taken off.</p></li>
      <li><h3>Installation</h3><p>We fit the outdoor unit, cylinder and controls, then fill and commission the system.</p></li>
      <li><h3>Aftercare</h3><p>A yearly service with a full written report keeps it running efficiently and protects your warranty.</p></li>
    </ol>
  </div>
</section>
<section class="section mist">
  <div class="wrap split">
    <div><h2>Common questions</h2><p class="lead">Ask us anything on {BIZ['phone']}.</p></div>
    {faq([
      ("Do heat pumps work in winter?", "Yes. Air source heat pumps are designed to keep working well below freezing. The key is a system sized for your home's heat loss, which is what our survey works out."),
      ("Will I need new radiators?", "Sometimes. Heat pumps run at lower water temperatures than boilers, so some rooms may need a larger radiator. The heat loss survey shows exactly which ones, if any."),
      ("What about hot water?", "The heat pump heats a hot water cylinder. If you have a combi boiler now, we'll find a good spot for the cylinder as part of the design."),
      ("I'm off the gas grid. Is it worth it?", "Often, yes. Homes on oil or LPG with no mains gas can get £9,000 off until March 2027, and you'll no longer need fuel deliveries."),
      ("Does a heat pump need servicing?", "Yes. An annual service checks the electrics, water quality, antifreeze, pressures and settings, and keeps your manufacturer's warranty valid."),
    ])}
  </div>
</section>
""" + callband("Thinking about a heat pump?") + foot()

# ------------------------------------------------------------------ SERVICING
sv = head("Heat pump & air conditioning servicing and repairs | Cooltek",
          "Annual servicing, repairs, cleaning and emergency call-outs for heat pumps and air conditioning across Nottinghamshire.",
          "servicing.html") + page_head(
    "Servicing, repairs and breakdowns",
    "Yearly servicing keeps your system efficient and your warranty valid. If it stops working, call us and we'll get it running again.",
    service="Servicing") + f"""
<section class="section">
  <div class="wrap split">
    <div class="theme-warm">
      <h2>Heat pump service</h2>
      <p>Every heat pump service ends with a full written report you can keep, covering the checks, readings and anything we recommend.</p>
      {ticks(["Electrical connections and isolators", "Strainer and magnetic filter cleaned", "Antifreeze protection tested", "Expansion vessels checked and charged", "Unvented cylinder safety checks", "Flow rates, settings and software", "Compressor hours and performance logged", "Pipework insulation checked"])}
    </div>
    <div class="theme-cool">
      <h2>Air conditioning service</h2>
      <p>A clean, well-maintained system cools faster, costs less to run and keeps the air in the room fresh.</p>
      {ticks(["Filters cleaned or replaced", "Indoor coil and fan cleaned", "Condensate drain checked and cleared", "Outdoor unit cleaned and inspected", "Electrical connections checked", "Heating and cooling performance tested"])}
    </div>
  </div>
</section>
<section class="section mist">
  <div class="wrap split">
    <div>
      <h2>Breakdowns and repairs</h2>
      <p class="lead">Heating gone off, or air con blowing warm? Call us and tell us what it's doing.</p>
      <p>We offer emergency call-outs and rapid response repairs, with dedicated time slots so you're not waiting in all day.</p>
      <div class="actions"><a class="btn btn-red" href="tel:{BIZ['tel']}">Call {BIZ['phone']}</a><a class="btn btn-navy" href="contact.html?service=Repair">Report a fault</a></div>
    </div>
    <div>
      <h2>Never miss a service</h2>
      <p>Your service report shows the date your next service is due. Get in touch a few weeks before and we'll book you in.</p>
      <div class="actions"><a class="btn btn-navy" href="contact.html?service=Servicing">Book a service</a></div>
    </div>
  </div>
</section>
""" + callband() + foot()

# ------------------------------------------------------------------ CONTACT
def chips(name, opts):
    return '<div class="chips">' + "".join(f'<label><input type="radio" name="{name}" value="{o}"><span>{o}</span></label>' for o in opts) + "</div>"

ct = head("Contact Cooltek | Quotes, servicing and repairs",
          "Ask for a quote or book a service with Cooltek. Call 01623 431028 or send an enquiry online.",
          "contact.html") + page_head("Get in touch", "Tell us what you need and we'll get back to you.", ctas=False) + f"""
<section class="section">
  <div class="wrap split">
    <form class="form" id="enquiry" novalidate>
      <div class="full"><label>What do you need?</label>{chips("service", ["Air conditioning", "Heat pump", "Servicing", "Repair", "Something else"])}</div>
      <div><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></div>
      <div><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>
      <div><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email"></div>
      <div><label for="postcode">Postcode</label><input id="postcode" name="postcode" autocomplete="postal-code"></div>
      <div class="full"><label>Property</label>{chips("property", ["House", "Flat", "Bungalow", "Business"])}</div>
      <div class="full"><label for="message">Details</label><textarea id="message" name="message" placeholder="For example: 3-bed semi on oil, looking at a heat pump. Or: air con unit in the office has stopped cooling."></textarea></div>
      <div class="form-msg" role="status" hidden></div>
      <div class="full"><button class="btn btn-red" type="submit">Send enquiry</button></div>
    </form>
    <aside class="contact-side">
      <p>Call us</p>
      <a class="big" href="tel:{BIZ['tel']}">{BIZ['phone']}</a>
      <p>Email</p>
      <a class="big" style="font-size:1.15rem" href="mailto:{BIZ['email']}">{BIZ['email']}</a>
      {f"<p>Address</p><p style='color:#fff'>{BIZ['address']}</p>" if BIZ['address'] else ""}
      <p class="small" style="color:#9ea4d6;margin-top:1.5em">For breakdowns, please call rather than email so we can help you faster.</p>
    </aside>
  </div>
</section>
<section class="section mist" id="areas">
  <div class="wrap"><h2>Areas we cover</h2><p class="lead">Based in Mansfield and covering Nottinghamshire and nearby towns, including:</p>
  <ul class="areas">{''.join(f'<li>{a}</li>' for a in AREAS)}</ul></div>
</section>
""" + foot()

nf = head("Page not found | Cooltek", "This page doesn't exist.", "") + page_head(
    "This page has moved or doesn't exist", "Try one of the links above, or call us on " + BIZ["phone"] + ".", ctas=False) + foot()

for name, html in {"index.html": home, "air-conditioning.html": ac, "heat-pumps.html": hp,
                   "servicing.html": sv, "contact.html": ct, "404.html": nf}.items():
    (ROOT / name).write_text(html, encoding="utf-8")
print("built")
