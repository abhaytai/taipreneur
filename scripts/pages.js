#!/usr/bin/env node
// Generates the static service, sector, projects and brochure pages (public/<slug>/index.html),
// the "pages:" block of public/sitemap.xml and their rewrites in vercel.json.
// Edit the content below, then run: node scripts/pages.js   (and then: npm run blog -- sync)
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BOOK = "https://calendly.com/learnadam333d/30min";
const WA = "https://wa.me/918084630858?text=Hi%20Taipreneur!%20I%20would%20like%20a%20quote.";
const UPDATED = "2026-10-26";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const PAGES = [
  {
    slug: "website-development", kind: "Service", name: "Website Development",
    title: "Website Development Services in Bangalore & India",
    description: "Fast, mobile-first websites built to rank on Google and convert visitors into enquiries. Business sites, e-commerce, web apps and mobile apps. Get a quote.",
    h1: "Website development that is built to be found and to convert",
    lede: "A website is only useful if people can find it and then take action. We build fast, mobile-first sites with clean code, proper search structure and a clear path to an enquiry or booking.",
    sections: [
      ["What we build", ["Business and company websites", "College and institution websites with admission enquiry flows", "Real estate listing and lead capture sites", "E-commerce stores with payments and inventory", "Web apps, dashboards and customer portals", "Android and iOS mobile apps"]],
      ["What is included", ["Mobile-first design and fast loading", "On-page SEO foundations: titles, headings, clean URLs, sitemap, schema", "Enquiry form, WhatsApp and booking-call buttons wired to email or CRM", "Analytics and Search Console set-up", "Hosting and launch support"]],
      ["How we work", ["Discovery call to understand goals and audience", "Structure and content plan, then design", "Build, test on real devices, launch", "Measure enquiries and improve"]],
    ],
    faq: [
      ["How much does a website cost?", "It depends on pages, features and integrations. We give a fixed quote after a short call, so you know the cost before we start."],
      ["Will my website rank on Google?", "We build the technical and on-page foundations that search engines need. Ranking also depends on content, competition and links, which our SEO service covers."],
      ["Can you rebuild my site without losing rankings?", "Yes. We keep existing URLs, add redirects where needed and check indexing before and after launch."],
    ],
    related: ["seo-geo-aeo", "digital-marketing", "ai-automation"],
  },
  {
    slug: "digital-marketing", kind: "Service", name: "Digital Marketing",
    title: "Digital Marketing Agency: Google Ads, Meta Ads & Content",
    description: "Performance marketing on Google, Meta and YouTube, managed against cost per lead. Digital marketing for colleges, real estate and growing businesses. Get a quote.",
    h1: "Digital marketing managed against cost per lead",
    lede: "We run paid campaigns and content that bring enquiries, then track every lead back to its source so you know what is working and what it costs.",
    sections: [
      ["Channels", ["Google Ads: search, display and local campaigns", "Meta Ads: Facebook and Instagram lead campaigns", "YouTube advertising and retargeting", "Content and social media to support your ads and search visibility"]],
      ["What you get", ["Campaign set-up with conversion tracking", "Landing pages built for enquiries", "Weekly reporting on leads, cost per lead and follow-up status", "Lead follow-up automation, so enquiries get a fast reply"]],
      ["Where it works well", ["Colleges and institutions running admission campaigns", "Real estate developers and agents generating site-visit enquiries", "Local and growing businesses that sell services"]],
    ],
    faq: [
      ["Do you charge a percentage of ad spend?", "We quote a clear monthly fee after understanding your goals. The ad budget is paid by you directly to the platforms."],
      ["How quickly will I see leads?", "Paid campaigns can start producing enquiries within days of launch, then improve as we learn what works. Organic search takes longer."],
      ["Do you combine ads with SEO?", "Yes. Ads bring leads now while SEO, GEO and AEO build lasting organic visibility."],
    ],
    related: ["seo-geo-aeo", "ai-automation", "education-digital-marketing"],
  },
  {
    slug: "ai-automation", kind: "Service", name: "AI Automation",
    title: "AI Automation for Lead Follow-up, CRM & Workflows",
    description: "Automate lead capture, follow-up, CRM updates and reporting with AI and workflow tools, so no enquiry is missed. Get a quote from Taipreneur.",
    h1: "AI automation so no enquiry goes unanswered",
    lede: "Most businesses lose leads to slow replies and manual follow-up. We connect your forms, WhatsApp, email, CRM and calendar so every enquiry is captured, answered and tracked automatically.",
    sections: [
      ["What we automate", ["Lead capture from website forms, ads and WhatsApp into one place", "Instant acknowledgement and scheduled follow-ups by email or WhatsApp", "Appointment booking and reminders", "CRM updates and team notifications", "Daily and weekly reports"]],
      ["AI assistants", ["Chat assistants that answer common questions and qualify enquiries", "Draft replies and summaries your team can review", "Hand-off to a person when a lead is ready"]],
      ["Our approach", ["Map your current lead journey and find the drop-offs", "Automate the repeatable steps first", "Keep a human in the loop for anything that matters", "Measure response time and conversion"]],
    ],
    faq: [
      ["Do I need to change my current tools?", "Usually not. We connect the tools you already use, such as forms, spreadsheets, CRM, email and WhatsApp."],
      ["Is it safe for customer data?", "We use access-controlled accounts and only the data a workflow needs. We explain exactly what is stored and where."],
      ["Can this work with my ad campaigns?", "Yes. Leads from Google and Meta ads can flow straight into your follow-up automation."],
    ],
    related: ["digital-marketing", "real-estate-lead-generation", "website-development"],
  },
  {
    slug: "seo-geo-aeo", kind: "Service", name: "SEO, GEO & AEO",
    title: "SEO, GEO & AEO Services: Rank on Google and in AI Answers",
    description: "SEO for Google, GEO for AI assistants like ChatGPT and Gemini, and AEO for answer boxes and voice. Organic lead generation for colleges, real estate and businesses.",
    h1: "SEO, GEO and AEO: be found on Google and in AI answers",
    lede: "People now find businesses in three places: Google results, AI assistants and answer boxes. We improve your visibility in all three so organic enquiries keep coming without paying for every click.",
    sections: [
      ["SEO: Search Engine Optimization", ["Technical audit: crawling, indexing, speed and mobile", "Keyword and page plan around what your customers search", "On-page content, titles, headings and internal links", "Local SEO and Google Business Profile", "Link building from real, relevant sources"]],
      ["GEO: Generative Engine Optimization", ["Clear, quotable facts about your business that AI systems can cite", "Consistent business details across the web", "llms.txt and well-structured pages for AI crawlers", "Monitoring where AI assistants mention you or your competitors"]],
      ["AEO: Answer Engine Optimization", ["Question-and-answer content that wins featured snippets and voice answers", "FAQ, Organization, Service and Article schema markup", "Short direct answers at the top of key pages"]],
    ],
    faq: [
      ["What is the difference between SEO, GEO and AEO?", "SEO helps you rank in search results. GEO helps AI assistants understand and recommend you. AEO structures your content to be chosen as the direct answer. They reinforce each other."],
      ["How long does SEO take?", "Technical fixes can help within weeks. Meaningful organic growth usually takes a few months and keeps compounding."],
      ["Can you guarantee first-page ranking?", "No honest agency can. We commit to the work, clear reporting and improving the signals that drive rankings and citations."],
    ],
    related: ["website-development", "digital-marketing", "education-digital-marketing"],
  },
  {
    slug: "education-digital-marketing", kind: "Sector", name: "Digital Marketing for Colleges",
    title: "Digital Marketing, SEO & Admissions Leads for Colleges",
    description: "SEO, GEO, AEO and digital marketing for colleges and institutions: get found by students and parents, and turn admission enquiries into applications.",
    h1: "Digital marketing and search visibility for colleges",
    lede: "Students and parents search Google and ask AI assistants before they enquire. We make your college easy to find, easy to trust and easy to apply to.",
    sections: [
      ["What colleges need", ["Course pages that rank for what students search", "Answers to common admission questions, ready for snippets and AI assistants", "Fast enquiry forms with instant follow-up", "Admission season ad campaigns with tracked cost per enquiry"]],
      ["What we do", ["SEO, GEO and AEO improvement for your website", "Google and Meta ad campaigns for admissions", "Lead follow-up automation by email and WhatsApp", "Reporting from enquiry to application"]],
      ["Experience", ["We have worked on SEO, GEO, AEO and digital marketing for RPH College, Anna Leela College and UKS College. See the Projects page."]],
    ],
    faq: [
      ["Can you improve our existing college website?", "Yes. We start with an audit, fix indexing and structure, then improve content and schema without breaking existing URLs."],
      ["Do you run admission ad campaigns?", "Yes, on Google and Meta, with enquiry tracking so you see cost per lead."],
      ["How do you handle enquiries?", "Automated acknowledgement and follow-up, with your admissions team notified immediately."],
    ],
    related: ["seo-geo-aeo", "digital-marketing", "projects"],
  },
  {
    slug: "real-estate-lead-generation", kind: "Sector", name: "Lead Generation for Real Estate",
    title: "Real Estate Lead Generation, Digital Marketing & Automation",
    description: "Digital marketing and lead automation for real estate: ad campaigns, landing pages and instant follow-up that turn enquiries into site visits.",
    h1: "Real estate lead generation with instant follow-up",
    lede: "In real estate the first reply often wins the buyer. We bring enquiries through ads and search, and automate the follow-up so every lead is contacted fast and tracked to a site visit.",
    sections: [
      ["What real estate teams need", ["Project landing pages that capture enquiries", "Google and Meta campaigns targeted by location and budget", "Instant WhatsApp and email replies to every enquiry", "Site visit scheduling and reminders", "A clear view of leads by source and stage"]],
      ["What we do", ["Digital marketing and campaign management", "Lead capture and follow-up automation", "Local SEO and Google Business Profile", "Reporting on cost per lead and visits booked"]],
      ["Experience", ["We have worked on digital marketing and lead automation for Octopus Estates. See the Projects page."]],
    ],
    faq: [
      ["How fast can you follow up on leads?", "Automations can reply within seconds and alert your sales team at the same time."],
      ["Do you build the landing pages?", "Yes, with tracking so you can see which campaigns produce enquiries."],
      ["Will this work with our CRM?", "We connect to common CRMs and spreadsheets, or set up a simple one if you do not have one."],
    ],
    related: ["ai-automation", "digital-marketing", "projects"],
  },
  {
    slug: "projects", kind: "Page", name: "Projects",
    title: "Projects: Colleges, Real Estate & Chess",
    description: "Selected Taipreneur projects: RPH College, Anna Leela College, UKS College, Octopus Estates and Alphabet Chess. SEO, GEO, AEO, digital marketing, websites and automation.",
    h1: "Selected projects",
    lede: "A few of the businesses we work with, and what we do for each.",
    cards: [
      ["RPH College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["Anna Leela College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["UKS College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["Octopus Estates", "Real estate", "Digital marketing and lead automation."],
      ["Alphabet Chess", "Chess education", "Website and automation."],
    ],
    sections: [["Want results like these?", ["Book a free 30-minute call and we will tell you where to start."]]],
    faq: [],
    related: ["education-digital-marketing", "real-estate-lead-generation", "seo-geo-aeo"],
  },
  {
    slug: "brochure", kind: "Page", name: "Brochure",
    title: "Taipreneur Brochure: Services, Projects & Contact",
    description: "Taipreneur Agency brochure: website development, digital marketing, AI automation, SEO, GEO and AEO. Download the PDF.",
    h1: "Taipreneur Agency brochure",
    lede: "One page overview of what we do and how to start. Download the PDF or print this page.",
    brochure: true,
    sections: [
      ["Our six services", ["Website Development: fast, mobile-first sites and apps", "Digital Marketing: Google, Meta and YouTube campaigns", "AI Automation: lead capture, follow-up, CRM and reporting", "SEO: rank higher on Google", "GEO: be recommended by AI assistants", "AEO: win answer boxes and voice answers"]],
      ["Who we work with", ["Colleges and institutions", "Real estate firms", "Growing businesses and brands"]],
      ["How we work", ["Discovery call", "Strategy and quote", "Build and launch", "Measure and scale"]],
    ],
    cards: [
      ["RPH College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["Anna Leela College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["UKS College", "Education", "SEO, GEO and AEO improvement and digital marketing."],
      ["Octopus Estates", "Real estate", "Digital marketing and lead automation."],
      ["Alphabet Chess", "Chess education", "Website and automation."],
    ],
    faq: [],
    related: [],
  },
];
const byslug = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
const NAV = [["Services", "/#services"], ["Projects", "/projects"], ["Brochure", "/brochure"], ["Blog", "/blog"]];

const CSS = `:root{--bg:#f7f9fb;--surface:#fff;--fg:#13202b;--muted:#5a6b78;--line:#dbe3ea;--red:#e02424;--blue:#2a9fe6;--tag-bg:#e4f2fc;--btn:#185a9d}
@media (prefers-color-scheme:dark){:root{--bg:#0e151b;--surface:#151f28;--fg:#e4edf3;--muted:#93a4b1;--line:#2a3946;--red:#ff5a5a;--blue:#5bb8f2;--tag-bg:#16303f;--btn:#2a9fe6;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.7 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:0 16px 64px}
.wrap{max-width:820px;margin:0 auto}.sitebar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line);flex-wrap:wrap}
.brand{font-weight:800;font-size:18px;letter-spacing:.04em;text-decoration:none}.brand .t{color:var(--red)}.brand .p{color:var(--blue)}
.sitebar nav{display:flex;gap:16px;flex-wrap:wrap}.sitebar nav a{color:var(--muted);text-decoration:none;font-weight:600;font-size:14px}.sitebar nav a:hover{color:var(--fg)}
.crumbs{margin-top:28px;font-size:13px;color:var(--muted)}.crumbs a{color:var(--muted)}
.tag{display:inline-block;background:var(--tag-bg);color:var(--blue);padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
h1{font-size:clamp(28px,5.5vw,42px);line-height:1.15;margin:12px 0 12px;letter-spacing:-.02em;text-wrap:balance}h2{font-size:24px;line-height:1.25;margin:40px 0 8px}h3{font-size:18px;margin:0 0 4px}
.lede{color:var(--muted);font-size:19px;margin:0 0 20px}li{margin:4px 0}a{color:var(--blue)}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.btn{display:inline-block;padding:12px 22px;border-radius:999px;font-weight:700;text-decoration:none;border:2px solid var(--btn)}
.btn.p{background:var(--btn);color:#fff}.btn.s{color:var(--btn)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:14px}.card{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:16px}.card p{margin:4px 0 0;color:var(--muted);font-size:15px}
details{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:10px 16px;margin:8px 0}summary{cursor:pointer;font-weight:600}details p{margin:8px 0 2px}
.box{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:18px 20px;margin-top:36px}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}
@media print{.sitebar,.crumbs,.cta,footer nav{display:none}body{background:#fff;color:#000;font-size:13px;padding:0}.card,.box{break-inside:avoid}}`;

function jsonld(p) {
  const url = `https://taipreneur.com/${p.slug}`;
  const org = { "@type": "Organization", "@id": "https://taipreneur.com/#org", name: "Taipreneur Agency", url: "https://taipreneur.com/" };
  const graph = [
    { "@type": "WebPage", "@id": url, url, name: p.title, description: p.description, dateModified: UPDATED, isPartOf: { "@id": "https://taipreneur.com/#site" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://taipreneur.com/" },
      { "@type": "ListItem", position: 2, name: p.name, item: url } ] },
  ];
  if (p.kind === "Service" || p.kind === "Sector")
    graph.push({ "@type": "Service", name: p.name, description: p.description, url, provider: org, areaServed: ["IN", "Worldwide"] });
  if (p.slug === "projects")
    graph.push({ "@type": "ItemList", itemListElement: p.cards.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c[0], description: `${c[1]}: ${c[2]}` })) });
  if (p.faq && p.faq.length)
    graph.push({ "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function render(p) {
  const url = `https://taipreneur.com/${p.slug}`;
  const sections = p.sections.map(([h, items]) => `<h2>${esc(h)}</h2>\n<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`).join("\n");
  const cards = p.cards ? `<h2>Featured projects</h2>\n<div class="cards">${p.cards.map((c) => `<div class="card"><span class="tag">${esc(c[1])}</span><h3>${esc(c[0])}</h3><p>${esc(c[2])}</p></div>`).join("")}</div>` : "";
  const faq = p.faq.length ? `<h2>Frequently asked questions</h2>\n${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}` : "";
  const related = p.related.length ? `<h2>Related</h2>\n<ul>${p.related.map((s) => `<li><a href="/${s}">${esc(byslug[s].name)}</a></li>`).join("")}</ul>` : "";
  const pdf = p.brochure ? `<div class="cta"><a class="btn p" href="/brochure/taipreneur-brochure.pdf">Download the PDF</a></div>` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | Taipreneur</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:site_name" content="Taipreneur">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/img/logo1.jpg" type="image/jpeg">
<style>${CSS}</style>
<script type="application/ld+json">${jsonld(p)}</script>
</head>
<body>
<div class="wrap">
<header class="sitebar"><a class="brand" href="/"><span class="t">TAI</span><span class="p">PRENEUR</span></a>
<nav aria-label="Site">${NAV.map(([n, h]) => `<a href="${h}">${n}</a>`).join("")}</nav></header>
<main>
<p class="crumbs"><a href="/">Home</a> / ${esc(p.name)}</p>
<span class="tag">${esc(p.kind)}</span>
<h1>${esc(p.h1)}</h1>
<p class="lede">${esc(p.lede)}</p>
<div class="cta"><a class="btn p" href="${BOOK}">Book a free call</a><a class="btn s" href="/#contact">Get a quote</a></div>
${pdf}
${sections}
${cards}
${faq}
<div class="box"><h2 style="margin-top:0">Get a quote</h2><p>Tell us what you need and we will reply with a clear, fixed quote. Book a free 30-minute call, send an enquiry, or message us on WhatsApp.</p>
<div class="cta"><a class="btn p" href="${BOOK}">Book a free call</a><a class="btn s" href="/#contact">Send an enquiry</a><a class="btn s" href="${WA}">WhatsApp</a></div></div>
${related}
</main>
<footer><nav aria-label="Footer"><a href="/">Home</a> &middot; <a href="/website-development">Website Development</a> &middot; <a href="/digital-marketing">Digital Marketing</a> &middot; <a href="/ai-automation">AI Automation</a> &middot; <a href="/seo-geo-aeo">SEO, GEO &amp; AEO</a> &middot; <a href="/education-digital-marketing">Colleges</a> &middot; <a href="/real-estate-lead-generation">Real Estate</a> &middot; <a href="/projects">Projects</a> &middot; <a href="/blog">Blog</a></nav>
<p>Taipreneur Agency, Bangalore, India &middot; <a href="mailto:tai@taipreneur.com">tai@taipreneur.com</a> &middot; +91 80846 30858</p></footer>
</div>
</body>
</html>
`;
}

function replaceBetween(text, a, b, mid) {
  const i = text.indexOf(a), j = text.indexOf(b);
  if (i < 0 || j < 0) throw new Error(`markers ${a} not found`);
  return text.slice(0, i + a.length) + mid + text.slice(j);
}

for (const p of PAGES) {
  const dir = path.join(ROOT, "public", p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(p));
}
const smPath = path.join(ROOT, "public/sitemap.xml");
const entries = PAGES.map((p) => `  <url>\n    <loc>https://taipreneur.com/${p.slug}</loc>\n    <lastmod>${UPDATED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${p.kind === "Service" ? "0.9" : "0.8"}</priority>\n  </url>`).join("\n\n");
fs.writeFileSync(smPath, replaceBetween(fs.readFileSync(smPath, "utf8"), "<!-- pages:start -->", "<!-- pages:end -->", "\n" + entries + "\n  "));
const vp = path.join(ROOT, "vercel.json");
const v = JSON.parse(fs.readFileSync(vp, "utf8"));
const mine = new Set(PAGES.flatMap((p) => [`/${p.slug}`, `/${p.slug}/`]));
const rest = v.rewrites.filter((r) => !mine.has(r.source) && r.source !== "/(.*)");
const catchAll = v.rewrites.find((r) => r.source === "/(.*)") || { source: "/(.*)", destination: "/index.html" };
v.rewrites = [...PAGES.flatMap((p) => [{ source: `/${p.slug}`, destination: `/${p.slug}/index.html` }, { source: `/${p.slug}/`, destination: `/${p.slug}/index.html` }]), ...rest, catchAll];
fs.writeFileSync(vp, JSON.stringify(v, null, 2) + "\n");
console.log("pages generated:", PAGES.map((p) => p.slug).join(", "));
