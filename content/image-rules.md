# Image rules — every taipreneur.com post carries relevant images

**Set by Abhay, 2026-10-31.** Applies to every post dated 2026-10-31 or later (`npm run blog:check` enforces the basics).
Read with `blog-rules.md` §4. An image is there to make the reader understand faster, never to decorate.

## The rule
Every post carries **at least 2 relevant images**: one **hero** at the top, plus **one per major idea that has shape**
(a process, a comparison, a before/after, a real screen). Long posts (2,000+ words): aim for 1 image every ~400–500 words.

## Pick the type that explains best

| Type | Use when | How |
|---|---|---|
| **Own diagram** (inline SVG) | A flow, cycle, 2×2, comparison, scorecard | `figure.diagram` + `d-*` classes from `templates/post.html`; light/dark safe |
| **Real screenshot / photo** (ours) | Showing a real tool, flow, dashboard or result | Blur names, numbers, phone numbers, emails. Client screens only with written permission |
| **AI-generated** (Canva / other) | Hero, or a scene no real photo can show | Prompt: no text, no logos, no real people's faces, site palette (red `#e02424`, blue `#2a9fe6`, navy). Caption says "AI-generated image" |
| **From another website** | Only if the licence allows reuse (Unsplash, Pexels, Wikimedia Commons, CC-BY, official press kits) | Credit + link under the image. **Never** hot-link or copy an image with no reuse licence, and never use a competitor's blog images |

Choice order: own diagram or real screenshot first (they prove first-hand work) → AI-generated → licensed third-party.

## Every image must have
1. A **caption** (`figcaption`) that says what to notice, not what it is.
2. **Alt text** that describes it for screen readers and for AI/search (say the idea, include the topic words naturally, no keyword stuffing).
3. A **descriptive filename**: `public/blog/img/<slug>/<what-it-shows>.webp` (lowercase-with-hyphens, e.g. `agency-scorecard.webp`).
4. **Size:** hero 1600×800 max, others ≤1200 wide; WebP (or PNG for screenshots with text); aim < 200 KB each.
   Add `width`, `height` and `loading="lazy"` (except the hero) so the page doesn't jump.
5. **Credit / source** line for anything we didn't make ourselves (AI tool name, or photographer + licence link).
6. Readable at **390px wide in light and dark mode** — check before asking for approval.

## SEO / GEO / AEO
- Hero image also goes in `og:image`, `twitter:image` (card `summary_large_image`) and the `image` field of the BlogPosting JSON-LD.
- Diagrams carry real text (SVG text, captions) so search engines and AI answer engines can read them.

## Don't
- Stock photos of handshakes, robots, glowing brains or "AI" lettering.
- Images with text baked in that the page doesn't also say in words.
- Faces of real people without permission; public figures' photos at all.

## Checklist (add to the post checklist)
- [ ] Hero + ≥1 more relevant image; every image has caption, alt, credit (if not ours)
- [ ] Files in `public/blog/img/<slug>/`, descriptive names, compressed, width/height set
- [ ] Hero wired into og:image / twitter:image / JSON-LD image
