// Homepage behaviour for the static page in public/index.html (no framework).
// 1. Sticky header border + mobile menu  2. Hero search demo  3. Enquiry form via EmailJS (same IDs as before)

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header
const top = $(".top");
const onScroll = () => top && top.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const btn = $(".menu-btn");
const nav = $("#nav");
if (btn && nav) {
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Close" : "Menu";
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Menu";
  }));
}

// Hero demo: type a query, then reveal search result, AI answer and lead alert
const SCENES = [
  {
    q: "best college for BBA in Mangalore with good placements",
    url: "yourcollege.edu.in › bba-admissions",
    title: "BBA Admissions 2027 | Your College, Mangalore",
    ai: 'For BBA in Mangalore, <mark>Your College</mark> is often recommended for its placement cell and industry projects. Admissions are open for 2027.<span class="r-cite">yourcollege.edu.in</span>',
    lead: "New admission enquiry, replied on WhatsApp in 8 seconds",
    sub: "Counsellor notified. Campus visit offered for Saturday.",
  },
  {
    q: "2 BHK near Sarjapur Road under 90 lakh ready to move",
    url: "yourproject.in › 2-bhk-sarjapur-road",
    title: "Ready-to-Move 2 BHK on Sarjapur Road | Your Project",
    ai: 'Ready-to-move 2 BHK options on Sarjapur Road under ₹90 lakh include <mark>Your Project</mark>, with RERA approval and site visits on weekends.<span class="r-cite">yourproject.in</span>',
    lead: "New buyer enquiry, replied on WhatsApp in 6 seconds",
    sub: "Sales team alerted. Site visit booked for Sunday 11 am.",
  },
  {
    q: "dental clinic near Indiranagar open on Sunday",
    url: "yourclinic.in › indiranagar",
    title: "Dental Clinic in Indiranagar, Open Sundays | Your Clinic",
    ai: '<mark>Your Clinic</mark> in Indiranagar is open on Sundays and offers same-day appointments for check-ups and cleaning.<span class="r-cite">yourclinic.in</span>',
    lead: "New appointment request, confirmed automatically",
    sub: "Reminder scheduled for the evening before.",
  },
];

const qText = $("#q-text");
const rs = $$(".r");
const tabs = $$(".demo-tabs button");
let scene = 0, timers = [], cycle;

function clear() { timers.forEach(clearTimeout); timers = []; }
function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

function fill(s) {
  $("#r0-url").textContent = s.url;
  $("#r0-title").textContent = s.title;
  $("#r1-body").innerHTML = s.ai;
  $("#r2-title").textContent = s.lead;
  $("#r2-sub").textContent = s.sub;
}

function play(i) {
  if (!qText) return;
  clear();
  scene = i;
  const s = SCENES[i];
  tabs.forEach((t, k) => t.setAttribute("aria-pressed", String(k === i)));
  if (reduce) { qText.textContent = s.q; fill(s); rs.forEach((r) => r.classList.remove("hide")); return; }
  rs.forEach((r) => r.classList.add("hide"));
  qText.textContent = "";
  later(() => fill(s), 450);
  let n = 0;
  const type = () => {
    n += 1;
    qText.textContent = s.q.slice(0, n);
    if (n < s.q.length) later(type, 32 + Math.random() * 40);
    else rs.forEach((r, k) => later(() => r.classList.remove("hide"), 350 + k * 650));
  };
  later(type, 500);
}

if (qText && rs.length) {
  tabs.forEach((t) => t.addEventListener("click", () => {
    clearInterval(cycle);
    play(Number(t.dataset.scene));
  }));
  play(0);
  if (!reduce) cycle = setInterval(() => play((scene + 1) % SCENES.length), 9000);
}

// Lead engine: light up the steps once, when the section scrolls into view
const flow = $(".flow");
if (flow) {
  if (reduce || !("IntersectionObserver" in window)) flow.classList.add("lit");
  else {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { flow.classList.add("lit"); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(flow);
  }
}

// Enquiry form: EmailJS REST API, same service/template/public key as the old React form
const form = $("#enquiry");
if (form) {
  const msg = $("#form-msg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "form-msg";
    const missing = $$("[required]", form).filter((el) => !el.value.trim());
    const email = $("#f-email");
    if (missing.length) {
      msg.textContent = "Add your name, email, what you need and a short message, then send again.";
      msg.classList.add("err");
      missing[0].focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      msg.textContent = "Check the email address, it looks incomplete.";
      msg.classList.add("err");
      email.focus();
      return;
    }
    const send = form.querySelector('button[type="submit"]');
    send.disabled = true;
    send.textContent = "Sending…";
    const params = {};
    new FormData(form).forEach((v, k) => { params[k] = v; });
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: "service_81o9z3c", template_id: "template_gn5jdkd", user_id: "QwkEfaVE3ucAYuorp", template_params: params }),
      });
      if (!res.ok) throw new Error("EmailJS " + res.status + ": " + (await res.text()));
      form.reset();
      msg.textContent = "Enquiry sent. We will reply within one working day.";
      msg.classList.add("ok");
    } catch (err) {
      console.error("[taipreneur enquiry]", err && err.message ? err.message : err);
      msg.innerHTML = 'The enquiry did not send. Email <a href="mailto:tai@taipreneur.com">tai@taipreneur.com</a> or message <a href="https://wa.me/918084630858">WhatsApp</a> instead.';
      msg.classList.add("err");
    } finally {
      send.disabled = false;
      send.textContent = "Send enquiry";
    }
  });
}
