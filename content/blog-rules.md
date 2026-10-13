# Blog rules — how every taipreneur.com post is written

Read this before writing or editing any post. These rules come from writers and platforms that
have tested what works: Paul Graham, Seth Godin, Tim Urban, Julia Evans, Morgan Housel,
Nielsen Norman Group's reading research, Google's people-first content guidance, and
Medium / Substack's data on what readers finish. Sources at the bottom.

The goal of every post: **a busy founder lands on it cold, gets the point in 30 seconds,
understands all of it without help, and can use something from it the same day.**

## 1. Before writing

1. **One post, one idea.** If you can't say the point in one sentence, it isn't ready. (Godin, Graham)
2. **Write for one reader.** Picture a specific founder: smart, busy, not in your field. (Graham: "Write simply")
3. **Have something first-hand.** Your experience, your client work (with permission), your notes,
   your numbers. A rewrite of what's already online adds nothing. (Google: people-first content; E-E-A-T)
4. **Know the job of the post.** Explain, show how, share a lesson, or argue a view. Pick one.

## 2. Title and opening

5. **The title is the claim or the question,** in plain words. No clickbait, no "10 tips". ≤ 60 characters so search shows all of it.
6. **The first screen does the work.** Say what the reader gets and why it matters before any background. (NN/g inverted pyramid)
7. **Open with a "Key takeaways" box** (3–5 lines) on any post over ~800 words. People decide in seconds whether to read. (NN/g: users scan before they read)
8. **The meta description is one useful sentence,** ~155 characters, not the first line copied.

## 3. Writing

9. **Short words, short sentences, short paragraphs** (1–3 sentences). Write the way you'd explain it to a friend across a table. (Graham, Orwell)
10. **No jargon without a one-line explanation** the first time it appears. Frameworks (SWOT, PESTEL…) get a plain-English line and an example.
11. **Every idea gets an example.** Abstract → concrete, every time. A real story beats a made-up one; label made-up examples as examples. (Housel)
12. **Headings that say something.** "Grow existing customers first", not "Strategy". A reader skimming only headings should get the argument. (NN/g)
13. **Lists for steps and options, prose for reasoning.** Bold only the few words a skimmer must not miss.
14. **Cut.** Remove every sentence the reader won't miss. Then cut again. (Graham: "How to Write Usefully")
15. **Be honest about limits.** Say what you don't know, what didn't work, and what you'd do differently. That's what makes a personal blog worth reading. (journal and learn-in-public writers)

## 4. Diagrams, images and examples

16. **Draw it when it has shape:** a sequence, a cycle, a 2×2 choice, a comparison, a "where you are vs where you want to be". One idea per diagram. (Tim Urban, Julia Evans)
17. **Diagrams are simple, labelled and readable on a phone** in light and dark mode. Use the `figure` styles in `templates/post.html` (inline SVG, colours from CSS variables).
18. **Every image and diagram has a caption** that says what to notice, and **alt text** that describes it for screen readers.
19. **No decorative stock photos.** An image earns its place by explaining something.
20. **Tables for comparisons** of 3+ items across the same attributes.

## 5. Length and structure

21. **As long as it needs, no longer.** Most posts: 800–2,000 words (~4–8 min). Medium found attention peaks around 7 minutes of reading.
22. **Shape:** takeaways → hook → sections (one idea each, with an example) → what to do next → credit. Long reference posts (like `/data-analytics`) get their own layout with navigation.
23. **End with one concrete next step** the reader can do today. No sales pitch. One line about what Taipreneur does is enough.

## 6. Trust and ethics

24. **Credit everyone.** Name the person, link the original, and say what's theirs and what's yours. Summarise in your own words; quote sparingly and briefly.
25. **Client names, numbers and screenshots only with written permission.** AlphaBetChess figures never. Bunts Sangha numbers only after their OK.
26. **Every factual claim can be checked** — link the source or say it's your own observation. No invented stats, testimonials or results.
27. **Date every post,** and add an `updated` date when facts change.

## 7. SEO and technical (handled by the template and `scripts/blog.js`)

28. One `<h1>` (the title), descriptive slug (`business-planning-for-small-business`, not `post-2`), canonical URL, Open Graph tags.
29. Link to at least one other post or page on the site where it genuinely helps.
30. Check on a phone before asking for approval: nothing scrolls sideways, diagrams are readable.

## Before-publish checklist

- [ ] One-sentence point is clear in the first screen
- [ ] Key takeaways box (posts over ~800 words)
- [ ] Every framework/term explained, every idea has an example
- [ ] Diagrams where something has shape; captions + alt text
- [ ] Sources credited and linked; permissions for any client detail
- [ ] Title ≤ 60 chars, description ~155 chars, slug readable
- [ ] Ends with one next step
- [ ] `npm run blog -- sync` and `npm run blog:check` pass

## Sources

- Paul Graham — [Write Simply](http://www.paulgraham.com/simply.html), [How to Write Usefully](http://www.paulgraham.com/useful.html)
- Nielsen Norman Group — [How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/), [Inverted Pyramid](https://www.nngroup.com/articles/inverted-pyramid/)
- Google Search Central — [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Medium Data Lab — [The Optimal Post is 7 Minutes](https://medium.com/data-lab/the-optimal-post-is-7-minutes-74b9f41509b)
- George Orwell — Politics and the English Language (six rules)
- swyx — [Learn in Public](https://www.swyx.io/learn-in-public)
- Tim Urban (Wait But Why) and Julia Evans (wizardzines) — explaining with simple drawings
