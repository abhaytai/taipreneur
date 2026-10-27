/* Taipreneur analytics: Google Analytics 4 (taipreneur.com web stream) plus the lead events that matter.
   Loaded by /js/tai-lead.js, which is on every page. No form values or personal data are ever sent.
   Events: generate_lead (enquiry form or popup sent), book_call (Calendly click), click_whatsapp,
   click_brochure, click_phone, click_email. Mark generate_lead and book_call as key events in GA4. */
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

  var s = document.createElement("script");
  s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  function track(name, params) {
    try { gtag("event", name, params || {}); } catch (e) {}
  }
  window.taiTrack = track;

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
