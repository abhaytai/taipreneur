#!/usr/bin/env node
// Builds taipreneur.com/ai-tools (public/ai-tools/index.html) from content/ai-tools.json.
//
//   node scripts/ai-tools.js          rebuild the page
//   node scripts/ai-tools.js check    fail if the page is out of date or the list is not exactly 369
//
// To change the list: edit content/ai-tools.json (one object per tool), update CHECKED below,
// run `npm run ai-tools`, then `npm run blog -- sync`.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "content/ai-tools.json");
const PAGE = path.join(ROOT, "public/ai-tools/index.html");
const CHECKED = "2026-10-13"; // date every tool was last checked live
const TARGET = 369;

// Order on the page, short label for the jump bar, and what each group helps with.
const SEGMENTS = [
  ["AI assistants & chatbots", "Assistants", "Ask anything, draft anything. Start here if you are new to AI."],
  ["Writing & content", "Writing", "Write clearer and faster, check grammar, and translate."],
  ["Research & search", "Research", "Find sources, read papers and get answers with citations."],
  ["Learning & education", "Learning", "Learn a subject or a language, or plan lessons as a teacher."],
  ["Productivity, meetings & notes", "Productivity", "Meeting notes, email, calendars, tasks and dictation."],
  ["AI agents & automation", "Agents", "Hand repeated work to software that runs on its own."],
  ["Images & design", "Images", "Images, logos, product photos and social graphics."],
  ["Video creation & editing", "Video", "Make, edit, caption and clip videos without a studio."],
  ["Voice, audio & music", "Audio", "Voiceovers, transcripts, clean audio and music."],
  ["Presentations, websites & no-code apps", "Slides & sites", "Decks, diagrams, websites and apps without writing code."],
  ["Coding & developer tools", "Coding", "Write, review and ship code with an AI pair programmer."],
  ["Data, spreadsheets & analytics", "Data", "Ask questions of spreadsheets and dashboards in plain English."],
  ["Marketing, SEO & social media", "Marketing", "Get found on Google and in AI answers, and post consistently."],
  ["Sales, CRM & lead generation", "Sales", "Find leads, write outreach, call and close deals."],
  ["Customer support & chatbots", "Support", "Answer customers on chat, email, voice and WhatsApp."],
  ["Finance, legal & HR", "Finance, legal, HR", "Books, expenses, taxes, contracts, hiring and HR."],
  ["Industry tools: health, property, retail, farming & more", "Industry", "Healthcare, real estate, e-commerce, farming, factories, travel and climate."],
];

const COUNTRIES = {
  US: "USA", IN: "India", CN: "China", FR: "France", GB: "UK", DE: "Germany", JP: "Japan", KR: "South Korea",
  AE: "UAE", SA: "Saudi Arabia", IL: "Israel", CA: "Canada", SG: "Singapore", AU: "Australia", NZ: "New Zealand",
  ES: "Spain", CH: "Switzerland", AT: "Austria", PL: "Poland", HU: "Hungary", NL: "Netherlands", CZ: "Czechia",
  SE: "Sweden", LT: "Lithuania", IT: "Italy", LU: "Luxembourg", NO: "Norway", FI: "Finland", BE: "Belgium",
  DK: "Denmark", IE: "Ireland", BR: "Brazil", ZA: "South Africa", NG: "Nigeria", KE: "Kenya", VN: "Vietnam",
};
const EUROPE = new Set(["FR", "GB", "DE", "ES", "CH", "AT", "PL", "HU", "NL", "CZ", "SE", "LT", "IT", "LU", "NO", "FI", "BE", "DK", "IE"]);
const region = (c) => (c === "US" ? "us" : c === "IN" ? "in" : c === "CN" ? "cn" : EUROPE.has(c) ? "eu" : "row");
const PRICES = ["Free", "Freemium", "Paid", "Open source"];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const displayDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const domain = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function load() {
  const tools = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const names = new Set();
  const known = new Set(SEGMENTS.map((s) => s[0]));
  for (const t of tools) {
    for (const k of ["name", "url", "segment", "what", "example", "price", "country"]) {
      if (!t[k]) throw new Error(`Tool "${t.name || "?"}" is missing "${k}"`);
    }
    if (!known.has(t.segment)) throw new Error(`Tool "${t.name}" has unknown segment "${t.segment}"`);
    if (!PRICES.includes(t.price)) throw new Error(`Tool "${t.name}" has unknown price "${t.price}"`);
    if (!COUNTRIES[t.country]) throw new Error(`Tool "${t.name}" has unknown country "${t.country}" (add it to COUNTRIES)`);
    if (!/^https:\/\//.test(t.url)) throw new Error(`Tool "${t.name}" URL must start with https://`);
    const key = t.name.toLowerCase();
    if (names.has(key)) throw new Error(`Duplicate tool "${t.name}"`);
    names.add(key);
  }
  return tools;
}

function card(t, n) {
  const free = t.price === "Paid" ? "0" : "1";
  const search = [t.name, t.what, t.example, t.segment, COUNTRIES[t.country], domain(t.url)].join(" ").toLowerCase();
  return `<li class="tool" data-r="${region(t.country)}" data-f="${free}" data-s="${esc(search)}">
<div class="tmeta"><span class="num">#${String(n).padStart(3, "0")}</span><span class="price p-${slugify(t.price)}">${esc(t.price)}</span><span class="cty">${esc(COUNTRIES[t.country])}</span></div>
<h3><a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.name)}<span class="ext" aria-hidden="true">↗</span></a></h3>
<p class="dom">${esc(domain(t.url))}</p>
<p class="what">${esc(t.what)}</p>
<p class="try"><b>Try:</b> ${esc(t.example)}</p>
</li>`;
}

function body(tools) {
  let n = 0;
  const jump = SEGMENTS.map(([seg, short]) => `<a href="#${slugify(short)}">${esc(short)}</a>`).join("");
  const sections = SEGMENTS.map(([seg, short, help], i) => {
    const list = tools.filter((t) => t.segment === seg);
    const cards = list.map((t) => card(t, ++n)).join("\n");
    return `<section class="seg" id="${slugify(short)}">
<div class="seghead"><h2><span class="sn">${String(i + 1).padStart(2, "0")}</span> ${esc(seg)}</h2><span class="segcount" data-total="${list.length}">${list.length} tools</span></div>
<p class="seghelp">${esc(help)}</p>
<ul class="grid">
${cards}
</ul>
</section>`;
  }).join("\n");
  const regions = { in: 0, us: 0, cn: 0, eu: 0, row: 0 };
  tools.forEach((t) => regions[region(t.country)]++);
  const nCountries = new Set(tools.map((t) => t.country)).size;
  const nFree = tools.filter((t) => t.price !== "Paid").length;
  return { jump, sections, regions, nCountries, nFree };
}

function page(tools) {
  const { jump, sections, regions, nCountries, nFree } = body(tools);
  const title = "369 AI Tools by Taipreneur";
  const desc = "369 AI tools that work today, sorted by what they help you do: write, research, design, sell, code and run a business. Each with a link and an example.";
  const ld = {
    "@context": "https://schema.org", "@type": "ItemList", name: title, numberOfItems: tools.length,
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Taipreneur</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="https://taipreneur.com/ai-tools">
<meta property="og:type" content="article">
<meta property="og:url" content="https://taipreneur.com/ai-tools">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:site_name" content="Taipreneur">
<meta property="article:published_time" content="2026-10-13">
<meta property="article:modified_time" content="${CHECKED}">
<meta name="twitter:card" content="summary">
<meta name="author" content="Abhay Tai">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>
/* Generated by scripts/ai-tools.js from content/ai-tools.json. Edit those, not this file. */
:root{
  --bg:#f7f9fb; --surface:#ffffff; --fg:#13202b; --muted:#5a6b78; --line:#dbe3ea;
  --red:#e02424; --blue:#2a9fe6; --blue-ink:#1d7fc0; --tag-bg:#e4f2fc; --code-bg:#eef3f7;
  --good:#16865a; --good-bg:#e3f4ec; --warn:#b4570b; --warn-bg:#fbefe2;
  --f-display:"Archivo",system-ui,sans-serif; --f-body:"IBM Plex Sans",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
}
@media (prefers-color-scheme: dark){:root{
  --bg:#0e151b; --surface:#151f28; --fg:#e4edf3; --muted:#93a4b1; --line:#2a3946;
  --red:#ff5a5a; --blue:#5bb8f2; --blue-ink:#5bb8f2; --tag-bg:#16303f; --code-bg:#1a2833;
  --good:#4cc792; --good-bg:#14302a; --warn:#f0a65a; --warn-bg:#33261a; color-scheme:dark}}
*{box-sizing:border-box}
html{scroll-padding-top:150px}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 var(--f-body);padding-inline:16px;padding-block:0 72px}
.wrap{max-width:1120px;margin:0 auto}
.sitebar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-block:14px;border-bottom:1px solid var(--line)}
.brand{font:800 17px var(--f-display);letter-spacing:.04em;text-decoration:none}
.brand .t{color:var(--red)}.brand .p{color:var(--blue)}
.sitebar nav{display:flex;gap:16px}
.sitebar nav a{color:var(--muted);text-decoration:none;font-weight:600;font-size:13px}
.sitebar nav a:hover,.sitebar nav a:focus-visible{color:var(--fg)}
.crumbs{margin-top:36px;font:500 13px var(--f-body);color:var(--muted)}
.crumbs a{color:var(--muted)}
.meta{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;font:500 12px var(--f-mono);color:var(--muted);margin-top:12px}
.tag{background:var(--tag-bg);color:var(--blue);padding:3px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.04em}
h1{font:800 clamp(32px,6.5vw,56px)/1.05 var(--f-display);letter-spacing:-.02em;margin:12px 0 14px;text-wrap:balance}
h1 .n{color:var(--red)}
.lede{color:var(--muted);font-size:19px;margin:0 0 24px;max-width:62ch}
.stats{display:flex;flex-wrap:wrap;gap:10px 28px;margin:0 0 28px;padding:0;list-style:none}
.stats li{font:500 13px var(--f-mono);color:var(--muted)}
.stats b{display:block;font:800 26px/1.1 var(--f-display);color:var(--fg)}
.takeaways{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px 20px;margin:0 0 28px;max-width:760px}
.takeaways b.h{display:block;font:600 12px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--blue);margin-bottom:6px}
.takeaways ul{margin:0;padding-left:20px}
.takeaways li{margin:4px 0}
/* Sticky controls: search, filters, jump bar */
.controls{position:sticky;top:0;z-index:5;background:var(--bg);padding:12px 0 10px;border-bottom:1px solid var(--line);margin-bottom:8px}
.row{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}
.search{flex:1 1 260px;min-width:0;font:16px var(--f-body);color:var(--fg);background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:9px 12px}
.search:focus-visible,select:focus-visible,.toggle input:focus-visible{outline:2px solid var(--blue);outline-offset:1px}
select{font:14px var(--f-body);color:var(--fg);background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:9px 10px}
.toggle{display:inline-flex;gap:6px;align-items:center;font-size:14px;color:var(--fg);white-space:nowrap;cursor:pointer}
.shown{font:500 12px var(--f-mono);color:var(--muted);white-space:nowrap}
.jump{display:flex;gap:6px;overflow-x:auto;padding-top:10px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
@media (min-width:1000px){.jump{flex-wrap:wrap;overflow:visible}}
.jump a{flex:none;font:500 13px var(--f-body);color:var(--fg);text-decoration:none;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:4px 11px}
.jump a:hover,.jump a:focus-visible{border-color:var(--blue);color:var(--blue-ink)}
/* Segments and cards */
.seg{margin-top:36px}
.seghead{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.seg h2{font:800 clamp(22px,3.4vw,28px)/1.2 var(--f-display);margin:0;text-wrap:balance}
.seg h2 .sn{font:500 14px var(--f-mono);color:var(--red);vertical-align:3px;margin-right:4px}
.segcount{font:500 12px var(--f-mono);color:var(--muted)}
.seghelp{color:var(--muted);margin:4px 0 14px}
.grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:12px}
@media (min-width:640px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.tool{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:14px 16px;display:flex;flex-direction:column;min-width:0}
.tmeta{display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center;font:500 11px var(--f-mono);color:var(--muted)}
.num{color:var(--muted)}
.price{padding:1px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:.04em}
.p-free,.p-open-source{background:var(--good-bg);color:var(--good)}
.p-freemium{background:var(--tag-bg);color:var(--blue-ink)}
.p-paid{background:var(--warn-bg);color:var(--warn)}
.cty{margin-left:auto}
.tool h3{font:700 18px/1.25 var(--f-display);margin:8px 0 0}
.tool h3 a{color:var(--fg);text-decoration:none}
.tool h3 a:hover,.tool h3 a:focus-visible{color:var(--blue-ink);text-decoration:underline}
.ext{font-size:13px;color:var(--muted);margin-left:4px}
.dom{font:12px var(--f-mono);color:var(--muted);margin:2px 0 8px;overflow-wrap:anywhere}
.what{margin:0 0 10px;font-size:15px}
.try{margin:auto 0 0;font-size:14px;color:var(--fg);border-left:3px solid var(--good);background:var(--good-bg);padding:7px 10px;border-radius:0 6px 6px 0}
.try b{color:var(--good);font-weight:600}
.empty{display:none;color:var(--muted);margin:32px 0}
[hidden]{display:none!important}
.about{max-width:760px;margin-top:56px}
.about h2{font:800 26px/1.25 var(--f-display);margin:0 0 10px}
.about p,.about li{max-width:68ch}
.about a,footer a{color:var(--blue-ink)}
.note{border-left:3px solid var(--warn);background:var(--warn-bg);padding:12px 16px;border-radius:0 6px 6px 0;margin:18px 0}
.note b.h{display:block;font:600 12px var(--f-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--warn);margin-bottom:2px}
.note p{margin:4px 0}
footer{margin-top:40px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}
</style>
<!-- ld:start --><!-- ld:end -->
</head>
<body>
<div class="wrap">
  <div class="sitebar">
    <a class="brand" href="/"><span class="t">TAI</span><span class="p">PRENEUR</span></a>
    <nav aria-label="Site"><a href="/blog">Blog</a><a href="/">Home</a></nav>
  </div>

  <div class="crumbs"><a href="/blog">Blog</a> / AI tools</div>
  <div class="meta"><span class="tag">AI tools</span><time datetime="2026-10-13">13 Oct 2026</time><span>· every link checked ${displayDate(CHECKED)}</span></div>
  <h1><span class="n">369</span> AI Tools by Taipreneur</h1>
  <p class="lede">AI tools that work today, sorted by what they help you do. Each one has a link, one line on what it does, and one thing to try first.</p>

  <ul class="stats" aria-label="The list in numbers">
    <li><b>${tools.length}</b>tools</li>
    <li><b>${SEGMENTS.length}</b>groups</li>
    <li><b>${nCountries}</b>countries</li>
    <li><b>${regions.in}</b>from India</li>
    <li><b>${nFree}</b>free to start</li>
  </ul>

  <div class="takeaways"><b class="h">How to use this list</b><ul>
    <li><b>Pick the group for the job</b> you want done (writing, video, sales…), not the tool you have heard of.</li>
    <li>Tools are listed <b>best known first</b> inside each group. The first three are a safe start.</li>
    <li><b>Do the "Try" line</b> on the free plan before paying. If it doesn't save you time in a week, drop it.</li>
    <li>Use the search box for a task ("invoice", "WhatsApp", "Hindi", "reels") or filter by region and price.</li>
  </ul></div>

  <div class="controls" role="search">
    <div class="row">
      <input class="search" id="q" type="search" placeholder="Search a tool or task, e.g. WhatsApp" aria-label="Search tools" autocomplete="off">
      <select id="region" aria-label="Filter by region">
        <option value="">All regions</option>
        <option value="in">India (${regions.in})</option>
        <option value="us">USA (${regions.us})</option>
        <option value="eu">Europe (${regions.eu})</option>
        <option value="cn">China (${regions.cn})</option>
        <option value="row">Rest of world (${regions.row})</option>
      </select>
      <label class="toggle"><input type="checkbox" id="free"> Free to start</label>
      <span class="shown" id="shown" aria-live="polite">${tools.length} shown</span>
    </div>
    <nav class="jump" aria-label="Jump to a group">${jump}</nav>
  </div>

  <main id="list">
${sections}
  <p class="empty" id="empty">No tool matches that. Try a shorter word, or clear the filters.</p>
  </main>

  <section class="about">
    <h2>How this list was made</h2>
    <p>Every tool was looked up and its official site checked on ${displayDate(CHECKED)}. Tools that had shut down, been renamed or folded into another product were removed or listed under their current name. Examples: OpenAI closed the Sora app in April 2026, Phind and Play.ht shut down, and Freepik now runs as Magnific.</p>
    <p>The list covers tools from ${nCountries} countries on purpose, not just Silicon Valley: India (Sarvam, Zoho, SciSpace, PhysicsWallah), China (DeepSeek, Qwen, Kling), Europe (Mistral, DeepL, n8n, Lovable) and more. "Country" means where the company is based today.</p>
    <div class="note"><b class="h">Be honest about the limits</b>
      <p>I haven't used every tool here. A place on the list means the tool is live, credible and useful for the job, not that I vouch for it. Nobody paid to be listed and there are no affiliate links.</p>
      <p>AI tools change monthly. Prices are the entry plan (Free, Freemium = free plan with paid upgrades, Paid, Open source = free to self-host). Check the site before you pay.</p>
    </div>
    <p><b>One thing to do today:</b> pick the one task that eats most of your week, find its group above, and try the first tool's "Try" line for 15 minutes.</p>
    <p>Missing a good tool, or found a dead link? Email <a href="mailto:tai@taipreneur.com?subject=369%20AI%20Tools">tai@taipreneur.com</a>. Want AI set up in your business instead of a list? That's what <a href="/">Taipreneur</a> does. More reading: <a href="/business-planning">Your Business Plan Doesn't Matter. Planning Does.</a></p>
  </section>

  <footer>Compiled by Abhay Tai · <a href="/blog">More from the Taipreneur blog</a></footer>
</div>
<script>
(function(){
  var q=document.getElementById("q"),reg=document.getElementById("region"),fr=document.getElementById("free");
  var tools=[].slice.call(document.querySelectorAll(".tool")),segs=[].slice.call(document.querySelectorAll(".seg"));
  var shown=document.getElementById("shown"),empty=document.getElementById("empty");
  function run(){
    var words=q.value.toLowerCase().trim().split(/\\s+/).filter(Boolean),r=reg.value,f=fr.checked,total=0;
    tools.forEach(function(t){
      var s=t.getAttribute("data-s"),ok=(!r||t.getAttribute("data-r")===r)&&(!f||t.getAttribute("data-f")==="1");
      for(var i=0;ok&&i<words.length;i++)if(s.indexOf(words[i])<0)ok=false;
      t.hidden=!ok;if(ok)total++;
    });
    segs.forEach(function(s){
      var n=s.querySelectorAll(".tool:not([hidden])").length,c=s.querySelector(".segcount");
      s.hidden=n===0;c.textContent=(n===+c.getAttribute("data-total")?n:n+" of "+c.getAttribute("data-total"))+" tools";
    });
    shown.textContent=total+" shown";empty.style.display=total?"none":"block";
  }
  q.addEventListener("input",run);reg.addEventListener("change",run);fr.addEventListener("change",run);
})();
</script>
<script src="/js/tai-lead.js" defer data-popup="off"></script>
</body>
</html>
`;
}

// Blog sync fills the ld block (structured data) after this page is built, so ignore it when comparing.
const strip = (t) => t.replace(/<!-- ld:start -->[\s\S]*?<!-- ld:end -->/, "").replace(/<!-- related:start -->[\s\S]*?<!-- related:end -->/, "");
const tools = load();
const html = page(tools);
if (process.argv[2] === "check") {
  if (tools.length !== TARGET) { console.error(`content/ai-tools.json has ${tools.length} tools, expected ${TARGET}`); process.exit(1); }
  if (!fs.existsSync(PAGE) || strip(fs.readFileSync(PAGE, "utf8")) !== strip(html)) { console.error("public/ai-tools/index.html is out of date: run npm run ai-tools"); process.exit(1); }
  console.log(`ai-tools: ${tools.length} tools, page up to date`);
} else {
  fs.writeFileSync(PAGE, html);
  console.log(`Wrote public/ai-tools/index.html (${tools.length} tools)`);
}
