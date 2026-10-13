# taipreneur.com — how Claude manages this site

Abhay runs this website from Claude chat. He asks for a change, Claude prepares it on a branch, he approves, Claude merges and it goes live. This file is the rulebook for every session working in this repo.

## The one rule: nothing goes live without Abhay's yes

1. Work on a new branch from fresh `main` (`git fetch origin main && git checkout -b <what-it-is> origin/main`). Never commit straight to `main`.
2. Make the change, run the checks below, commit, push the branch.
3. Tell Abhay in chat **what changed, which pages, and why**, with the compare link
   `https://github.com/abhaytai/taipreneur/compare/main...<branch>`. Then stop and wait.
4. Only after he says yes: fast-forward `main` to the branch and push. Pushing `main` deploys to production.
5. After deploy, check the live URL. Tell him plainly if it didn't show up.

A request to change something is not approval to publish it. A "yes" covers that one change, not later ones.

## How the site is built and deployed

- **Stack:** Create React App (React 17) + Bootstrap 3 CSS + jQuery. One-page homepage with `#section` anchors.
- **Deploy:** Vercel, from `main`, two projects (`taipreneur3`, `taipreneur345`) under the `synktais-projects` team. Every pushed branch also gets a Vercel preview build; its status shows on the commit. `.github/workflows/deploy.yml` targets `master`, which doesn't exist, so it never runs.
- **Build:** `npm run build` = refresh `public/ads.txt` from adstxtmanager, then `react-scripts build` into `build/`.
- **Routing:** `vercel.json` sends everything to the React app (`/(.*)` → `/index.html`) except the blog routes listed before it. Static pages in `public/<slug>/index.html` only load if they have a rewrite there. `scripts/blog.js sync` writes those rewrites; keep the catch-all last.

## Where things live

| To change | Edit |
|---|---|
| Homepage text: hero, about, services, features, gallery, testimonials, contact details | `src/data/data.json` (keys: Header, About, Services, Features, Gallery, Testimonials, Team, Contact) |
| Process steps, stats numbers, call-to-action band | `src/components/process.jsx`, `stats.jsx`, `cta.jsx` (hard-coded in the component) |
| Top navigation | `src/components/navigation.jsx` (in-page links use `className="page-scroll"`; links to other pages like `/blog` must NOT) |
| Section order, what's shown | `src/App.jsx` (Team is commented out) |
| Styles | `public/css/style.css` (global), `src/App.css` |
| Images | `public/img/` (referenced as `img/name.jpg`) |
| SEO: title, meta, Open Graph, JSON-LD | `public/index.html` |
| Sitemap / robots | `public/sitemap.xml` (homepage block by hand, blog block generated), `public/robots.txt` |
| Contact form | `src/components/contact.jsx` (EmailJS service/template IDs are in the code; don't change them unless asked) |
| Blog posts | see below |

Brand: wordmark **TAI** in red + **PRENEUR** in blue (`#ff0000` / `#38b6ff` on the homepage; blog pages use `#e02424` / `#2a9fe6` for contrast). WhatsApp/phone +91 8084630858, email tai@taipreneur.com.

## Blog

- Every post is a static page at `public/<slug>/index.html`, live at `taipreneur.com/<slug>`. The list is at `taipreneur.com/blog`.
- `content/blog-posts.json` is the source of truth: `slug`, `title`, `description`, `tag`, `date` (YYYY-MM-DD), optional `note` (small label like "33 modules"), `updated`, `draft: true` (hidden from the list and sitemap).
- **New post:** `npm run blog -- new <slug> "<Title>" "<Description>" "<Tag>"` → creates the page from `templates/post.html`. Write the article inside `<article>` (h2, p, ul, pre, img). Then `npm run blog -- sync`.
- **Edit/remove a post:** change the page and/or the JSON entry, then `npm run blog -- sync`. To unpublish, set `"draft": true` (the page and route still exist; delete the folder and the entry to remove it fully).
- `sync` rebuilds the post list in `public/blog/index.html` (between `posts:start/end`), the blog block of `public/sitemap.xml` (between `blog:start/end`) and the blog rewrites in `vercel.json`. Never hand-edit those regions.
- Slugs: lowercase-with-hyphens, and not `blog`, `img`, `css`, `js`, `fonts`, `static`, `admin`, `api`, `templates`, `content`.
- A long interactive post (like `/data-analytics`) can have its own design; give it the same TAIPRENEUR site bar with links to Blog and Home, plus canonical and Open Graph tags.
- Content from other sources (e.g. Telegram channels) is summarised in our own words and credited.

## Checks before asking for approval

1. `npm run blog:check` passes.
2. `npm ci` (first time) then `CI=false npx react-scripts build` succeeds. Locally skip `update-ads`; the sandbox can't reach adstxtmanager.
3. `vercel.json` is valid JSON with `/(.*)` last.
4. For a changed page: open the built file and confirm title, links and that it isn't the homepage.
5. Don't commit `build/`, `node_modules/`, `.env*` or a changed `yarn.lock` (the repo has both lockfiles; Vercel uses npm).

## Commits

Small and descriptive (`Add blog post: <title>`, `Update services copy`). One change per branch so each approval is clear.
