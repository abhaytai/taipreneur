/* Taipreneur analytics: Google Analytics 4 (taipreneur.com web stream) plus the lead events that matter.
   Loaded by /js/tai-lead.js, which is on every page. No form values or personal data are ever sent.
   Events: generate_lead (enquiry form or popup sent), book_call (Calendly click), click_whatsapp,
   click_brochure, click_phone, click_email, ai_referral (visit that arrived from an AI assistant).
   Every event also carries ai_assistant and first_touch_source. Mark generate_lead and book_call as key events in GA4.
   Source memory: window.taiSource() returns where the visitor first came from and which AI assistant (if any) sent them. */
(function () {
  "use strict";
  // AI assistants, matched against the referrer host or utm_source (ChatGPT adds utm_source=chatgpt.com to its links).
  var AI = [
    // [name, referrer host pattern, utm_source pattern]
    ["ChatGPT", /(^|\.)(chatgpt\.com|openai\.com)$/, /chatgpt|openai/],
    ["Perplexity", /(^|\.)perplexity\.ai$/, /perplexity/],
    ["Gemini", /^(gemini|bard)\.google\.com$/, /gemini|bard/],
    ["Claude", /(^|\.)claude\.ai$/, /claude/],
    ["Copilot", /^copilot\.(microsoft\.com|cloud\.microsoft)$/, /copilot/],
    ["DeepSeek", /(^|\.)deepseek\.com$/, /deepseek/],
    ["Grok", /(^|\.)(grok\.com|x\.ai)$/, /grok/],
    ["You.com", /^you\.com$/, /^you(\.com)?$/],
    ["Phind", /(^|\.)phind\.com$/, /phind/],
    ["Meta AI", /^meta\.ai$/, /^meta[._-]?ai$/],
    ["Mistral", /^chat\.mistral\.ai$/, /mistral/]
  ];
  function ls(k, v) {
    try { if (v === undefined) return window.localStorage.getItem(k); window.localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function ss(k, v) {
    try { if (v === undefined) return window.sessionStorage.getItem(k); window.sessionStorage.setItem(k, v); } catch (e) { return null; }
  }
  function host(u) { try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ""); } catch (e) { return ""; } }
  function aiName(h, utm) {
    for (var i = 0; i < AI.length; i++) {
      if ((h && AI[i][1].test(h)) || (utm && AI[i][2].test(utm))) return AI[i][0];
    }
    return "";
  }
  function read(k) { try { return JSON.parse(ls(k) || "null"); } catch (e) { return null; } }

  var q = new URLSearchParams(location.search);
  var utmSource = (q.get("utm_source") || "").toLowerCase();
  var utmMedium = (q.get("utm_medium") || "").toLowerCase();
  var refHost = host(document.referrer);
  var internal = refHost === location.hostname.replace(/^www\./, "");
  var ai = aiName(internal ? "" : refHost, utmSource);
  var src = utmSource || (internal ? "" : refHost) || "";
  var medium = utmMedium || (ai ? "ai-assistant" : refHost && !internal ? "referral" : "");
  var landed = !!(utmSource || (refHost && !internal));

  // First touch: written once, never overwritten. Last AI touch: updated whenever an AI assistant sends a visit.
  if (!read("tai_ft")) ls("tai_ft", JSON.stringify({ source: src || "direct", medium: medium || "none", ai: ai, landing: location.pathname, ts: Date.now() }));
  if (ai) ls("tai_ai", JSON.stringify({ name: ai, landing: location.pathname, ts: Date.now() }));

  window.taiSource = function () {
    var ft = read("tai_ft") || {}, a = read("tai_ai") || {};
    var first = ft.ai || ft.source || "direct";
    var text = "Traffic source: " + (a.name ? a.name + " (AI assistant, landed on " + a.landing + ")" : "no AI assistant") +
      " | first touch: " + (ft.ai ? ft.ai + " (AI assistant)" : (ft.source || "direct") + " / " + (ft.medium || "none")) +
      " | first page: " + (ft.landing || "/");
    return {
      ai_assistant: a.name || "", first_touch_source: first, first_touch_medium: ft.medium || "none",
      first_touch_landing: ft.landing || "", ai_landing: a.landing || "", text: text
    };
  };
  window.taiAiArrival = ai && landed ? ai : "";
})();

(function () {
  "use strict";
  var ID = "G-T64JTP3FXR";
  if (window.taiTrack || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { window.taiTrack = window.taiTrack || function () {}; return; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent mode: analytics and ads storage denied by default in the EEA, UK and Switzerland until a consent banner grants it.
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied",
    region: ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"],
    wait_for_update: 500
  });
  gtag("js", new Date());
  gtag("config", ID);
  var T = window.taiSource ? window.taiSource() : {};
  gtag("set", "user_properties", { first_touch_source: T.first_touch_source || "direct", ai_assistant: T.ai_assistant || "none" });

  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  function track(name, params) {
    try {
      var t = window.taiSource ? window.taiSource() : {};
      var p = params || {};
      p.ai_assistant = t.ai_assistant || "none";
      p.first_touch_source = t.first_touch_source || "direct";
      gtag("event", name, p);
    } catch (e) {}
  }
  window.taiTrack = track;
  function ss(k, v) {
    try { if (v === undefined) return window.sessionStorage.getItem(k); window.sessionStorage.setItem(k, v); } catch (e) { return null; }
  }
  // One ai_referral event per visit that arrives from an AI assistant (not on reloads or inside-site navigation)
  if (window.taiAiArrival && !ss("tai_ai_sent")) { ss("tai_ai_sent", "1"); track("ai_referral", { ai_source: window.taiAiArrival, page_path: location.pathname }); }

  function where(el) {
    var tl = el.closest && el.closest("[data-tl]");
    if (tl) return tl.getAttribute("data-tl");
    var sec = el.closest && el.closest("section[id], header, footer, nav");
    return sec ? (sec.id || sec.tagName.toLowerCase()) : "page";
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    var p = { link_location: where(a), page_path: location.pathname };
    if (h.indexOf("calendly.com") > -1) track("book_call", p);
    else if (h.indexOf("wa.me") > -1 || h.indexOf("api.whatsapp.com") > -1) track("click_whatsapp", p);
    else if (/^\/brochure|brochure.*\.pdf/i.test(h)) track("click_brochure", p);
    else if (h.indexOf("tel:") === 0) track("click_phone", p);
    else if (h.indexOf("mailto:") === 0) track("click_email", p);
  }, true);
})();
