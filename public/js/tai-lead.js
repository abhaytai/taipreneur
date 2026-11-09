/* Taipreneur lead capture: floating WhatsApp + Brochure buttons, and a popup to get a quote or book a 15 min call.
   Include with: <script src="/js/tai-lead.js" defer></script>   (add data-popup="off" to show only the buttons)
   Popup rules: shows once per visit (timer, 50% scroll, or exit intent), again on the next visit,
   and not for 14 days after someone books or sends an enquiry. Never blocks the page on load. */
(function () {
  "use strict";
  var BOOK = "https://calendly.com/learnadam333d/15-min-call-with-taipreneur";
  var WA = "https://wa.me/918084630858?text=" + encodeURIComponent("Hi Taipreneur! I would like a quote.");
  var EMAILJS = { service: "service_81o9z3c", template: "template_gn5jdkd", key: "QwkEfaVE3ucAYuorp" };
  var me = document.currentScript;
  // Analytics (GA4) loads from here so every page that has the lead widgets is measured
  var ga = document.createElement("script"); ga.src = "/js/tai-analytics.js"; ga.async = true; document.head.appendChild(ga);
  var popupOn = !(me && me.getAttribute("data-popup") === "off");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function store(kind, k, v) {
    try { var s = window[kind + "Storage"]; if (v === undefined) return s.getItem(k); s.setItem(k, v); } catch (e) { return null; }
  }
  var DAY = 864e5;
  function recentlyConverted() { var t = Number(store("local", "tl_done")); return t && Date.now() - t < 14 * DAY; }

  // Styles
  var css = document.createElement("link");
  css.rel = "stylesheet"; css.href = "/css/tai-lead.css";
  document.head.appendChild(css);

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.05-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3a8.1 8.1 0 1 1 6.7 3.6Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.200 0 1.300.9 2.500 1 2.700.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.5-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.3-.2-.5-.3Z"/></svg>';
  var BR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.500 0 0 1 5.500 4H11v16H5.500A1.500 1.500 0 0 1 4 18.500v-13Z"/><g class="pg"><path d="M20 5.500A1.500 1.500 0 0 0 18.500 4H13v16h5.500a1.500 1.500 0 0 0 1.500-1.500v-13Z"/></g><path d="M6.500 8H9M6.500 11H9M15 8h2.500M15 11h2.500"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.500 4.500 4.500L19 7"/></svg>';

  var root = document.createElement("div");
  root.className = "tl";
  // Festive pilot offer. Ends 15 Nov 2026, 23:59 IST; after that it disappears on its own.
  var PILOT_END = Date.UTC(2026, 10, 15, 18, 29, 59);
  var pilotLeft = Math.ceil((PILOT_END - Date.now()) / 864e5);
  var pilotOn = pilotLeft > 0;
  var pilotDays = pilotLeft > 1 ? "Only " + pilotLeft + " days left" : "Last day";
  var OFFER = !pilotOn ? "" :
    '<div class="tl-offer">' +
      '<div class="tl-pass">' +
        '<div class="tl-top">' +
          '<span class="tl-offer-k"><span class="spark" aria-hidden="true">&#10022;</span> Festival offer &middot; ends 15 Nov</span>' +
          '<span class="tl-seat"><i aria-hidden="true"></i>Only 3 seats left</span>' +
        '</div>' +
        '<p class="tl-offer-h">7-day free pilot.<br><em>One-to-one with the founder.</em></p>' +
        '<p class="tl-offer-s">Pick your problem. I fix it.</p>' +
        '<div class="tl-chips" role="group" aria-label="Pick your problem">' +
          '<button type="button" class="tl-chip">Leads go cold</button>' +
          '<button type="button" class="tl-chip">Junk leads</button>' +
          '<button type="button" class="tl-chip">Visits, no enquiries</button>' +
          '<button type="button" class="tl-chip">Missed follow-ups</button>' +
          '<button type="button" class="tl-chip tl-chip-own">Something else</button>' +
        '</div>' +
        '<p class="tl-offer-c">First come, first served &middot; ' + pilotDays.replace("Only ", "") + ' &middot; <a href="https://wa.me/918084630858" target="_blank" rel="noopener">WhatsApp or call +91 80846 30858</a></p>' +
      '</div>' +
    '</div>';

  root.innerHTML =
    '<div class="tl-fabs">' +
      '<a class="tl-fab tl-wa" href="' + WA + '" target="_blank" rel="noopener" data-tl="wa">' + WA_ICON + '<span class="tl-label">Talk on WhatsApp</span></a>' +
      '<a class="tl-fab tl-br" href="/brochure" data-tl="brochure">' + BR_ICON + '<span class="tl-label">See brochure</span></a>' +
    '</div>' +
    '<div class="tl-back" id="tl-back" aria-hidden="true">' +
      '<div class="tl-dlg' + (pilotOn ? ' tl-pilot' : '') + '" role="dialog" aria-modal="true" aria-labelledby="tl-h" tabindex="-1">' +
        '<button class="tl-x" type="button" aria-label="Close">&times;</button>' +
        (pilotOn ? '<h2 class="tl-h tl-sr" id="tl-h">Free 7-day pilot, one-to-one with the founder</h2>' :
          '<h2 class="tl-h" id="tl-h">Let\'s get you more enquiries.</h2>' +
          '<p class="tl-sub">Pick the quickest way to talk. You get a clear plan and a fixed quote.</p>') +
        '<div class="tl-tabs" role="tablist">' +
          '<button type="button" role="tab" id="tl-t1" aria-selected="true" aria-controls="tl-p1">Get a quote</button>' +
          '<button type="button" role="tab" id="tl-t2" aria-selected="false" aria-controls="tl-p2">Book a 15 min call</button>' +
        '</div>' +
        '<div class="tl-panel" id="tl-p1" role="tabpanel" aria-labelledby="tl-t1">' +
          OFFER +
          '<form class="tl-f" novalidate>' +
            '<div class="tl-two">' +
              '<label>Your name<input name="name" autocomplete="name" required></label>' +
              '<label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" required></label>' +
            '</div>' +
            '<label>Email<input name="email" type="email" autocomplete="email" required></label>' +
            '<label class="' + (pilotOn ? 'tl-svc' : '') + '">What do you need?<select name="service" required><option value=""' + (pilotOn ? '' : ' selected') + '>Choose one</option><option>Website Development</option><option>Digital Marketing</option><option>AI Automation</option><option>SEO, GEO and AEO</option>' + (pilotOn ? '<option selected>Free 7-day pilot</option>' : '') + '<option>Not sure yet</option></select></label>' +
            '<label>' + (pilotOn ? 'Your problem' : 'Anything we should know? (optional)') + '<textarea name="message"' + (pilotOn ? ' rows="2" placeholder="Pick one above, or type it here"' : '') + '></textarea></label>' +
            '<button class="tl-btn" type="submit">Send enquiry</button>' +
            '<p class="tl-msg" role="status"></p>' +
          '</form>' +
        '</div>' +
        '<div class="tl-panel" id="tl-p2" role="tabpanel" aria-labelledby="tl-t2" hidden>' +
          '<ul class="tl-list">' +
            '<li>' + CHECK + '<span>15 minutes on Google Meet, no obligation</span></li>' +
            '<li>' + CHECK + '<span>We look at where your leads are lost today</span></li>' +
            '<li>' + CHECK + '<span>You leave with next steps and a quote</span></li>' +
          '</ul>' +
          '<a class="tl-btn" href="' + BOOK + '" target="_blank" rel="noopener" data-tl="book">Pick a time</a>' +
          '<a class="tl-btn alt" href="' + WA + '" target="_blank" rel="noopener" data-tl="wa-popup">Or message us on WhatsApp</a>' +
        '</div>' +
        (pilotOn ? '' : '<p class="tl-fine">We reply within one working day. <a href="mailto:tai@taipreneur.com">tai@taipreneur.com</a></p>') +
      '</div>' +
    '</div>';

  function boot() {
    document.body.appendChild(root);
    requestAnimationFrame(function () { setTimeout(function () { root.classList.add("in"); }, reduce ? 0 : 1200); });
    wire();
    slot();
    if (popupOn) schedule();
  }

  var back, dlg, lastFocus, opened = false;

  function setTab(n) {
    var t = [root.querySelector("#tl-t1"), root.querySelector("#tl-t2")];
    var p = [root.querySelector("#tl-p1"), root.querySelector("#tl-p2")];
    t.forEach(function (b, i) { b.setAttribute("aria-selected", String(i === n)); b.tabIndex = i === n ? 0 : -1; });
    p.forEach(function (el, i) { el.hidden = i !== n; });
  }

  function open(tab) {
    if (opened) return;
    opened = true;
    lastFocus = document.activeElement;
    store("session", "tl_seen", "1");
    setTab(tab || 0);
    back.classList.add("show");
    back.setAttribute("aria-hidden", "false");
    requestAnimationFrame(function () { back.classList.add("vis"); dlg.focus(); });
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    if (!opened) return;
    opened = false;
    back.classList.remove("vis");
    back.setAttribute("aria-hidden", "true");
    setTimeout(function () { back.classList.remove("show"); }, reduce ? 0 : 250);
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Calendly opens as a popup on this page, so visitors never leave the site.
  // Any link to the 15 min call is caught here; if Calendly cannot load, the link opens in a new tab as before.
  var CAL_ASSETS = "https://assets.calendly.com/assets/external/";
  var CAL_URL = BOOK + "?hide_gdpr_banner=1&primary_color=38b6ff";
  var calLoading = null;
  function loadCalendly() {
    if (window.Calendly) return Promise.resolve();
    if (calLoading) return calLoading;
    calLoading = new Promise(function (ok, fail) {
      var l = document.createElement("link"); l.rel = "stylesheet"; l.href = CAL_ASSETS + "widget.css"; document.head.appendChild(l);
      var sc = document.createElement("script"); sc.src = CAL_ASSETS + "widget.js"; sc.async = true;
      sc.onload = function () { window.Calendly ? ok() : fail(); };
      sc.onerror = function () { calLoading = null; fail(); };
      document.head.appendChild(sc);
    });
    return calLoading;
  }
  function openCalendly() {
    var tab = function () { window.open(BOOK, "_blank", "noopener"); };
    // Pass the visitor's source to Calendly so each booking shows where it came from (e.g. ChatGPT)
    var t = window.taiSource ? window.taiSource() : null, opts = { url: CAL_URL };
    if (t && t.first_touch_source && t.first_touch_source !== "direct") {
      opts.utm = { utmSource: (t.ai_assistant || t.first_touch_source).toLowerCase(), utmMedium: t.ai_assistant ? "ai-assistant" : (t.first_touch_medium || "referral") };
    }
    loadCalendly().then(function () { window.Calendly.initPopupWidget(opts); }, tab);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="https://calendly.com/learnadam333d/15-min-call-with-taipreneur"]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (opened) close();
    openCalendly();
  });
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://calendly.com" || !e.data || e.data.event !== "calendly.event_scheduled") return;
    converted();
    if (window.taiTrack) window.taiTrack("book_call_confirmed", { page_path: location.pathname });
  });
  // Warm up Calendly when someone is about to click a booking link
  document.addEventListener("pointerover", function (e) {
    if (e.target.closest && e.target.closest('a[href^="https://calendly.com/learnadam333d"]')) loadCalendly().catch(function () {});
  }, { passive: true, once: true });

  function converted() { store("local", "tl_done", String(Date.now())); }

  function wire() {
    back = root.querySelector("#tl-back");
    dlg = root.querySelector(".tl-dlg");
    root.querySelector(".tl-x").addEventListener("click", close);
    back.addEventListener("mousedown", function (e) { if (e.target === back) close(); });
    document.addEventListener("keydown", function (e) {
      if (!opened) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") { // keep focus inside the dialog
        var f = Array.prototype.filter.call(dlg.querySelectorAll("a[href],button,input,select,textarea"), function (el) { return !el.disabled && el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    root.querySelector("#tl-t1").addEventListener("click", function () { setTab(0); });
    root.querySelector("#tl-t2").addEventListener("click", function () { setTab(1); });
    root.querySelector('[data-tl="book"]').addEventListener("click", converted);
    Array.prototype.forEach.call(root.querySelectorAll(".tl-chip"), function (c) {
      c.addEventListener("click", function () {
        var f = root.querySelector("form");
        setTab(0);
        f.service.value = "Free 7-day pilot";
        var own = c.className.indexOf("tl-chip-own") > -1;
        f.message.value = own ? "Pilot problem (my own): " : "Pilot problem: " + c.textContent;
        if (own) { f.message.focus(); f.message.setSelectionRange(f.message.value.length, f.message.value.length); }
        else f.querySelector("[name=name]").focus();
      });
    });
    // Any element on the page can open the popup: <a href="#lead" data-lead-open="call|enquiry">
    document.addEventListener("click", function (e) {
      var el = e.target.closest && e.target.closest("[data-lead-open]");
      if (!el) return;
      e.preventDefault();
      open(el.getAttribute("data-lead-open") === "call" ? 1 : 0);
    });

    var form = root.querySelector("form");
    var msg = root.querySelector(".tl-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.className = "tl-msg";
      var els = Array.prototype.slice.call(form.querySelectorAll("[required]"));
      var miss = els.filter(function (x) { return !x.value.trim(); });
      if (miss.length) { msg.textContent = "Add your name, phone, email and what you need, then send again."; msg.classList.add("err"); miss[0].focus(); return; }
      if (!/^\S+@\S+\.\S+$/.test(form.email.value.trim())) { msg.textContent = "Check the email address, it looks incomplete."; msg.classList.add("err"); form.email.focus(); return; }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      var data = new FormData(form);
      data.set("message", (form.message.value.trim() || "(no message)") + "\n\nSent from the popup on " + location.pathname + (window.taiSource ? "\n" + window.taiSource().text : ""));
      var params = {};
      data.forEach(function (v, k) { params[k] = v; });
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: EMAILJS.service, template_id: EMAILJS.template, user_id: EMAILJS.key, template_params: params })
      })
        .then(function (r) {
          if (r.ok) return;
          return r.text().then(function (t) { throw new Error("EmailJS " + r.status + ": " + t); });
        })
        .then(function () {
          converted();
          if (window.taiTrack) window.taiTrack("generate_lead", { lead_source: "popup", page_path: location.pathname });
          form.reset();
          msg.textContent = "Enquiry sent. We will reply within one working day.";
          msg.classList.add("ok");
          setTimeout(close, 2600);
        })
        .catch(function (err) {
          if (window.console) console.error("[taipreneur enquiry]", err && err.message ? err.message : err);
          var body = "Name: " + (params.name || "") + "\nPhone: " + (params.phone || "") + "\nEmail: " + (params.email || "") + "\nService: " + (params.service || "") + "\n\n" + (params.message || "");
          msg.innerHTML = 'The enquiry did not send. <a href="mailto:tai@taipreneur.com?subject=' + encodeURIComponent("Enquiry from taipreneur.com") + "&body=" + encodeURIComponent(body) + '">Send it by email</a> or use <a href="' + WA + '">WhatsApp</a>.';
          msg.classList.add("err");
        })
        .then(function () { btn.disabled = false; btn.textContent = "Send enquiry"; });
    });
  }

  // In-page copy of the offer card, above the quote form, for visitors who missed the popup
  function slot() {
    var el = document.getElementById("pilot-slot"), form = document.getElementById("enquiry");
    if (!el || !pilotOn) return;
    el.innerHTML = OFFER;
    var sel = form && form.querySelector("[name=service]");
    if (sel && !Array.prototype.some.call(sel.options, function (o) { return o.text === "Free 7-day pilot"; })) {
      var o = document.createElement("option"); o.text = "Free 7-day pilot"; sel.add(o, sel.options[sel.options.length - 1]);
    }
    Array.prototype.forEach.call(el.querySelectorAll(".tl-chip"), function (c) {
      c.addEventListener("click", function () {
        if (!form) return;
        var own = c.className.indexOf("tl-chip-own") > -1;
        form.service.value = "Free 7-day pilot";
        form.message.value = own ? "Pilot problem (my own): " : "Pilot problem: " + c.textContent;
        form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        (own ? form.message : form.name).focus({ preventScroll: true });
      });
    });
  }

  function schedule() {
    if (recentlyConverted()) return;
    if (/#(contact|lead)/.test(location.hash)) return;
    // While the festival offer runs, the homepage shows it on every load (also after a refresh)
    if (pilotOn && (location.pathname === "/" || location.pathname === "/index.html")) {
      setTimeout(function () { if (!opened) open(0); }, 1500);
      return;
    }
    if (store("session", "tl_seen")) return;
    var mobile = window.matchMedia("(max-width: 700px)").matches;
    var fired = false;
    function go() {
      if (fired || store("session", "tl_seen")) return;
      // Do not interrupt typing in the page's own form
      var a = document.activeElement;
      if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && !root.contains(a)) return setTimeout(go, 4000);
      fired = true;
      open(0);
    }
    setTimeout(go, mobile ? 20000 : 12000);
    window.addEventListener("scroll", function onS() {
      var h = document.documentElement;
      if ((h.scrollTop || document.body.scrollTop) / Math.max(1, h.scrollHeight - h.clientHeight) > 0.5) {
        window.removeEventListener("scroll", onS);
        setTimeout(go, 800);
      }
    }, { passive: true });
    if (!mobile) document.addEventListener("mouseout", function (e) { if (!e.relatedTarget && e.clientY <= 0) go(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
