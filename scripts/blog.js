#!/usr/bin/env node
// Blog manager for taipreneur.com
//
//   node scripts/blog.js new <slug> "<Title>" "<Description>" "<Tag>"
//       Creates public/<slug>/index.html from templates/post.html and adds it to content/blog-posts.json.
//   node scripts/blog.js sync
//       Rebuilds the /blog post list, the blog part of sitemap.xml and the vercel.json routes
//       from content/blog-posts.json. Run after adding, editing or removing a post.
//   node scripts/blog.js check
//       Fails if anything is out of sync (used in CI-style checks before merging).

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const POSTS = path.join(ROOT, "content/blog-posts.json");
const TEMPLATE = path.join(ROOT, "templates/post.html");
const BLOG_INDEX = path.join(ROOT, "public/blog/index.html");
const SITEMAP = path.join(ROOT, "public/sitemap.xml");
const VERCEL = path.join(ROOT, "vercel.json");
const RESERVED = new Set(["blog", "img", "css", "js", "fonts", "static", "admin", "api", "templates", "content"]);

const read = (p) => fs.readFileSync(p, "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const displayDate = (iso) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const today = () => new Date().toISOString().slice(0, 10);

function loadPosts() {
  const posts = JSON.parse(read(POSTS));
  for (const p of posts) {
    for (const k of ["slug", "title", "description", "tag", "date"]) {
      if (!p[k]) throw new Error(`Post "${p.slug || "?"}" is missing "${k}" in content/blog-posts.json`);
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) throw new Error(`Slug "${p.slug}" must be lowercase-with-hyphens`);
    if (RESERVED.has(p.slug)) throw new Error(`Slug "${p.slug}" is reserved`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) throw new Error(`Post "${p.slug}" date must be YYYY-MM-DD`);
    if (!fs.existsSync(path.join(ROOT, "public", p.slug, "index.html"))) {
      throw new Error(`Post "${p.slug}" has no page at public/${p.slug}/index.html`);
    }
  }
  // Newest first; on the same date, the post added later to the JSON comes first.
  return posts
    .map((p, i) => ({ ...p, _i: i }))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || b._i - a._i);
}

function replaceBetween(text, start, end, inner, file) {
  const i = text.indexOf(start), j = text.indexOf(end);
  if (i < 0 || j < 0 || j < i) throw new Error(`Markers ${start} / ${end} not found in ${file}`);
  return text.slice(0, i + start.length) + "\n" + inner + text.slice(j);
}

const pagePath = (slug) => path.join(ROOT, "public", slug, "index.html");
const topicId = (tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Reading time from the post's <article> (or <main>, or <body>), at ~230 words per minute.
function readingMinutes(slug) {
  const html = read(pagePath(slug));
  const pick = (tag) => { const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i")); return m && m[1]; };
  const part = pick("article") || pick("main") || pick("body") || html;
  const text = part
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function topicsHtml(posts) {
  const counts = new Map();
  for (const p of posts) counts.set(p.tag, (counts.get(p.tag) || 0) + 1);
  if (counts.size < 2) return "    ";
  const chips = [`<button type="button" data-topic="all" aria-pressed="true">All<span>${posts.length}</span></button>`]
    .concat([...counts].sort((a, b) => a[0].localeCompare(b[0]))
      .map(([tag, n]) => `<button type="button" data-topic="${topicId(tag)}" aria-pressed="false">${esc(tag)}<span>${n}</span></button>`));
  return chips.map((c) => "    " + c).join("\n") + "\n    ";
}

function blogIndexHtml(posts) {
  if (!posts.length) return '    <p class="lede">No posts yet.</p>\n    ';
  return posts.map((p) => `    <a class="post" href="/${p.slug}" data-topic="${topicId(p.tag)}">
      <div class="meta"><span class="tag">${esc(p.tag)}</span><time datetime="${p.date}">${displayDate(p.date)}</time><span>${readingMinutes(p.slug)} min read</span>${p.note ? `<span>${esc(p.note)}</span>` : ""}</div>
      <h2>${esc(p.title)}</h2>
      <p>${esc(p.description)}</p>
      <span class="more">Read →</span>
    </a>`).join("\n") + "\n    ";
}

// Posts made from the template carry readtime markers; fill them in. Custom pages without markers are left alone.
function postPageHtml(slug) {
  const html = read(pagePath(slug));
  const start = "<!-- readtime:start -->", end = "<!-- readtime:end -->";
  if (!html.includes(start)) return html;
  return html.slice(0, html.indexOf(start) + start.length) + `<span>${readingMinutes(slug)} min read</span>` + html.slice(html.indexOf(end));
}

function sitemapXml(posts) {
  const latest = posts.length ? posts[0].date : today();
  const urls = [`  <url>
    <loc>https://taipreneur.com/blog</loc>
    <lastmod>${latest}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`].concat(posts.map((p) => `  <url>
    <loc>https://taipreneur.com/${p.slug}</loc>
    <lastmod>${p.updated || p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`));
  return urls.join("\n\n") + "\n  ";
}

function vercelJson(allPosts) {
  const v = JSON.parse(read(VERCEL));
  const slugs = ["blog"].concat(allPosts.map((p) => p.slug));
  const ours = new Set(slugs.flatMap((s) => [`/${s}`, `/${s}/`]));
  const others = (v.rewrites || []).filter((r) => !ours.has(r.source) && r.source !== "/(.*)");
  const routes = slugs.flatMap((s) => [
    { source: `/${s}`, destination: `/${s}/index.html` },
    { source: `/${s}/`, destination: `/${s}/index.html` },
  ]);
  v.rewrites = others.concat(routes, [{ source: "/(.*)", destination: "/index.html" }]);
  return JSON.stringify(v, null, 2) + "\n";
}

function outputs() {
  const all = JSON.parse(read(POSTS));
  const posts = loadPosts();
  let index = replaceBetween(read(BLOG_INDEX), "<!-- posts:start -->", "<!-- posts:end -->", blogIndexHtml(posts), "public/blog/index.html");
  index = replaceBetween(index, "<!-- topics:start -->", "<!-- topics:end -->", topicsHtml(posts), "public/blog/index.html");
  const pages = {};
  for (const p of all) pages[pagePath(p.slug)] = postPageHtml(p.slug);
  return {
    ...pages,
    [BLOG_INDEX]: index,
    [SITEMAP]: replaceBetween(read(SITEMAP), "<!-- blog:start -->", "<!-- blog:end -->", sitemapXml(posts), "public/sitemap.xml"),
    [VERCEL]: vercelJson(all),
  };
}

function sync() {
  for (const [file, text] of Object.entries(outputs())) {
    if (read(file) !== text) { fs.writeFileSync(file, text); console.log("updated", path.relative(ROOT, file)); }
  }
  console.log("blog in sync");
}

function check() {
  const stale = Object.entries(outputs()).filter(([f, t]) => read(f) !== t).map(([f]) => path.relative(ROOT, f));
  if (stale.length) { console.error("Out of sync, run: node scripts/blog.js sync\n  " + stale.join("\n  ")); process.exit(1); }
  console.log("blog in sync");
}

function create(slug, title, description, tag) {
  if (!slug || !title || !description || !tag) {
    throw new Error('Usage: node scripts/blog.js new <slug> "<Title>" "<Description>" "<Tag>"');
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug "${slug}" must be lowercase-with-hyphens`);
  if (RESERVED.has(slug)) throw new Error(`Slug "${slug}" is reserved`);
  const all = JSON.parse(read(POSTS));
  if (all.some((p) => p.slug === slug)) throw new Error(`Post "${slug}" already exists`);
  const dir = path.join(ROOT, "public", slug);
  if (fs.existsSync(dir)) throw new Error(`public/${slug}/ already exists`);
  const date = today();
  const html = read(TEMPLATE)
    .replace(/{{title}}/g, esc(title)).replace(/{{description}}/g, esc(description))
    .replace(/{{slug}}/g, slug).replace(/{{tag}}/g, esc(tag))
    .replace(/{{date}}/g, date).replace(/{{date_display}}/g, displayDate(date));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  all.push({ slug, title, description, tag, date });
  fs.writeFileSync(POSTS, JSON.stringify(all, null, 2) + "\n");
  console.log(`created public/${slug}/index.html — write the article inside <article>, then run: node scripts/blog.js sync`);
}

try {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === "new") create(...args);
  else if (cmd === "sync") sync();
  else if (cmd === "check") check();
  else { console.log('Commands: new <slug> "<Title>" "<Description>" "<Tag>" | sync | check'); process.exit(cmd ? 1 : 0); }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
