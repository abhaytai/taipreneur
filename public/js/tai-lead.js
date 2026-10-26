/* Taipreneur lead capture: floating WhatsApp + Brochure buttons, and a popup to book a 15 min call or send an enquiry.
   Include with: <script src="/js/tai-lead.js" defer></script>   (add data-popup="off" to show only the buttons)
   Popup rules: shows once per visit (timer, 50% scroll, or exit intent), again on the next visit,
   and not for 14 days after someone books or sends an enquiry. Never blocks the page on load. */
(function () {
  "use strict";
  var BOOK = "https://calendly.com/learnadam333d/15-min-call-with-taipreneur";
  var WA = "https://wa.me/918084630858?text=" + encodeURIComponent("Hi Taipreneur! I would like a quote.");
  var EMAILJS = { service: "service_81o9z3c", template: "template_gn5jdkd", key: "QwkEfaVE3ucAYuorp" };
  var me = document.currentScript;
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
  root.innerHTML =
    '<div class="tl-fabs">' +
      '<a class="tl-fab tl-wa" href="' + WA + '" target="_blank" rel="noopener" data-tl="wa">' + WA_ICON + '<span class="tl-label">Talk on WhatsApp</span></a>' +
      '<a class="tl-fab tl-br" href="/brochure" data-tl="brochure">' + BR_ICON + '<span class="tl-label">See brochure</span></a>' +
    '</div>' +
    '<div class="tl-back" id="tl-back" aria-hidden="true">' +
      '<div class="tl-dlg" role="dialog" aria-modal="true" aria-labelledby="tl-h" tabindex="-1">' +
        '<button class="tl-x" type="button" aria-label="Close">&times;</button>' +
        '<h2 class="tl-h" id="tl-h">Let\'s get you more enquiries.</h2>' +
        '<p class="tl-sub">Pick the quickest way to talk. You get a clear plan and a fixed quote.</p>' +
        '<div class="tl-tabs" role="tablist">' +
          '<button type="button" role="tab" id="tl-t1" aria-selected="true" aria-controls="tl-p1">Book a 15 min call</button>' +
          '<button type="button" role="tab" id="tl-t2" aria-selected="false" aria-controls="tl-p2">Send an enquiry</button>' +
        '</div>' +
        '<div class="tl-panel" id="tl-p1" role="tabpanel" aria-labelledby="tl-t1">' +
          '<ul class="tl-list">' +
            '<li>' + CHECK + '<span>15 minutes on Google Meet, no obligation</span></li>' +
            '<li>' + CHECK + '<span>We look at where your leads are lost today</span></li>' +
            '<li>' + CHECK + '<span>You leave with next steps and a quote</span></li>' +
          '</ul>' +
          '<a class="tl-btn" href="' + BOOK + '" target="_blank" rel="noopener" data-tl="book">Pick a time</a>' +
          '<a class="tl-btn alt" href="' + WA + '" target="_blank" rel="noopener" data-tl="wa-popup">Or message us on WhatsApp</a>' +
        '</div>' +
        '<div class="tl-panel" id="tl-p2" role="tabpanel" aria-labelledby="tl-t2" hidden>' +
          '<form class="tl-f" novalidate>' +
            '<div class="tl-two">' +
              '<label>Your name<input name="name" autocomplete="name" required></label>' +
              '<label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" required></label>' +
            '</div>' +
            '<label>Email<input name="email" type="email" autocomplete="email" required></label>' +
            '<label>What do you need?<select name="service" required><option value="">Choose one</option><option>Website Development</option><option>Digital Marketing</option><option>AI Automation</option><option>SEO, GEO and AEO</option><option>Not sure yet</option></select></label>' +
            '<label>Anything we should know? (optional)<textarea name="message"></textarea></label>' +
            '<button class="tl-btn" type="submit">Send enquiry</button>' +
            '<p class="tl-msg" role="status"></p>' +
          '</form>' +
        '</div>' +
        '<p class="tl-fine">We reply within one working day. <a href="mailto:tai@taipreneur.com">tai@taipreneur.com</a></p>' +
      '</div>' +
    '</div>';

  function boot() {
    document.body.appendChild(root);
    requestAnimationFrame(function () { setTimeout(function () { root.classList.add("in"); }, reduce ? 0 : 1200); });
    wire();
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
    // Any element on the page can open the popup: <a href="#lead" data-lead-open="call|enquiry">
    document.addEventListener("click", function (e) {
      var el = e.target.closest && e.target.closest("[data-lead-open]");
      if (!el) return;
      e.preventDefault();
      open(el.getAttribute("data-lead-open") === "enquiry" ? 1 : 0);
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
      data.set("message", (form.message.value.trim() || "(no message)") + "\n\nSent from the popup on " + location.pathname);
      data.append("service_id", EMAILJS.service);
      data.append("template_id", EMAILJS.template);
      data.append("user_id", EMAILJS.key);
      fetch("https://api.emailjs.com/api/v1.0/email/send-form", { method: "POST", body: data })
        .then(function (r) { if (!r.ok) throw new Error("send failed"); })
        .then(function () {
          converted();
          form.reset();
          msg.textContent = "Enquiry sent. We will reply within one working day.";
          msg.classList.add("ok");
          setTimeout(close, 2600);
        })
        .catch(function () {
          msg.innerHTML = 'The enquiry did not send. Email <a href="mailto:tai@taipreneur.com">tai@taipreneur.com</a> or use <a href="' + WA + '">WhatsApp</a>.';
          msg.classList.add("err");
        })
        .then(function () { btn.disabled = false; btn.textContent = "Send enquiry"; });
    });
  }

  function schedule() {
    if (recentlyConverted() || store("session", "tl_seen")) return;
    if (/#(contact|lead)/.test(location.hash)) return;
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
