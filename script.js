/* ==========================================================
   1. CONFIG: EDIT EVERYTHING HERE
   ========================================================== */
const CONFIG = {
  couple: { bride: "Aarti", groom: "Rohan" },
  // Event date/time (ISO format with +05:30 for India). The countdown uses this.
  eventDateISO: "2026-12-12T18:00:00+05:30",
  event: {
    dateText: "12 December 2026",
    dayText: "Saturday",
    timeText: "6:00 PM onwards",
    venue: "Shubh Mangal Banquet Hall",
    address: "Koregaon Park, Pune, Maharashtra",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune",
    mapEmbed: "https://www.google.com/maps?q=Koregaon+Park+Pune&output=embed"
  },
  contact: {
    whatsapp: "919999999999",   // country code + number, no + or spaces
    call: "+919999999999",
    message: "Namaste! We are happy to confirm our presence at the engagement of Aarti & Rohan on 12 December 2026."
  },
  families: {
    brideSide: "Bride's Family", brideParents: "श्री. सुरेश व सौ. सुनीता देशमुख",
    groomSide: "Groom's Family", groomParents: "श्री. अनिल व सौ. अलका पाटील",
    compliments: "Deshmukh & Patil Families"
  },
  text: {
    ganesh: "|| श्री गणेशाय नमः ||",
    engaged: "आमचा साखरपुडा ठरला आहे",
    invite: "आपल्या उपस्थितीने आमचा आनंद द्विगुणित होईल",
    blessingEn: "With the blessings of Lord Ganesha and our elders, we joyfully invite you to bless the beginning of our new journey together.",
    footerBlessing: "|| शुभं भवतु ||  सहर्ष निमंत्रण"
  },
  people: [
    { name: "Aarti", bio: "A lover of classical dance, chai and long drives. Her smile lights up every room.", img: "https://picsum.photos/seed/aarti/400/500" },
    { name: "Rohan", bio: "An engineer with a heart for music and travel. Always ready with a joke.", img: "https://picsum.photos/seed/rohan/400/500" }
  ],
  story: [
    { title: "How We Met", text: "A friend's wedding in Pune, a shared plate of puran poli, and a conversation that never ended.", img: "https://picsum.photos/seed/met/640/360" },
    { title: "The Proposal", text: "A quiet evening, a diya-lit terrace and a simple question with the easiest answer.", img: "https://picsum.photos/seed/proposal/640/360" },
    { title: "The Families Met", text: "Two families, one big smile. Blessings were exchanged and the date was fixed.", img: "https://picsum.photos/seed/families/640/360" }
  ],
  // Gallery photos: replace with your own, e.g. "assets/photo1.jpg"
  gallery: Array.from({ length: 8 }, (_, i) => `https://picsum.photos/seed/engage${i + 1}/600/600`),
  music: "assets/shehnai.mp3"   // put your shehnai MP3 here (optional)
};

/* ==========================================================
   2. Helpers
   ========================================================== */
const $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const get = (o, p) => p.split(".").reduce((a, k) => a && a[k], o);
// Builds a lazy image inside a coloured placeholder box (fallback if it fails to load)
const imgTag = (src, alt, w, h) =>
  `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" onerror="this.style.display='none'">`;

/* ==========================================================
   3. Fill text from CONFIG (elements with data-bind="path")
   ========================================================== */
document.querySelectorAll("[data-bind]").forEach(el => el.textContent = get(CONFIG, el.dataset.bind) || "");
const E = CONFIG.event;

/* ==========================================================
   4. Build dynamic sections
   ========================================================== */
// Couple portraits slide in from left / right
$("#couple").innerHTML = CONFIG.people.map((p, i) => `
  <article class="person rv ${i ? "right" : "left"}">
    <div class="frame"><div class="ph">${imgTag(p.img, "Portrait of " + p.name, 400, 500)}</div></div>
    <h3>${p.name}</h3><p>${p.bio}</p>
  </article>`).join("");

// Timeline
$("#timeline").innerHTML = CONFIG.story.map(s => `
  <li class="rv up"><h3>${s.title}</h3><p>${s.text}</p>
    <div class="ph">${imgTag(s.img, s.title, 640, 360)}</div></li>`).join("");

// Event cards
$("#cards").innerHTML = [
  ["📅", "Date", E.dateText], ["🗓️", "Day", E.dayText],
  ["🕕", "Time", E.timeText], ["📍", "Venue", E.venue]
].map(c => `<div class="card rv zoom"><div class="ic" aria-hidden="true">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></div>`).join("");

// Gallery (buttons so they are keyboard accessible)
$("#gallery").innerHTML = CONFIG.gallery.map((src, i) =>
  `<button class="rv zoom" data-full="${src}" aria-label="Open photo ${i + 1}">${imgTag(src, "Engagement photo " + (i + 1), 600, 600)}</button>`).join("");

// Map, RSVP links
$("#mapBtn").href = E.mapLink;
$("#mapFrame").src = E.mapEmbed;
$("#waBtn").href = `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(CONFIG.contact.message)}`;
$("#callBtn").href = `tel:${CONFIG.contact.call}`;

// Toran: alternating mango leaves and marigolds across the top
(function () {
  const t = $("#toran"), n = Math.ceil(innerWidth / 30);
  t.innerHTML = Array.from({ length: n }, (_, i) => `<span class="${i % 3 === 2 ? "mg" : "leaf"}"></span>`).join("");
})();

/* ==========================================================
   5. Cover: tap to open (curtain reveal)
   ========================================================== */
$("#openBtn").addEventListener("click", () => {
  $("#cover").classList.add("open");
  document.body.classList.remove("locked");
  setTimeout(() => $("#cover").remove(), 1400);
});

/* ==========================================================
   6. Scroll reveal with staggered children (IntersectionObserver)
   ========================================================== */
document.querySelectorAll("[data-stagger]").forEach(g =>
  [...g.children].forEach((c, i) => c.style.transitionDelay = i * 0.12 + "s"));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ==========================================================
   7. Scroll progress bar + hero parallax
   ========================================================== */
const bar = $("#progress"), heroBg = $(".hero-bg");
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? y / max * 100 : 0) + "%";
    if (!reduce && y < innerHeight) heroBg.style.transform = `translate3d(0,${y * 0.3}px,0)`;
    ticking = false;
  });
}, { passive: true });

/* ==========================================================
   8. Falling marigold petals (canvas, paused when off-screen)
   ========================================================== */
(function () {
  if (reduce) return;
  const c = $("#petals"), x = c.getContext("2d");
  let W, H, run = false, P = [];
  const size = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
  const mk = () => ({ x: Math.random() * W, y: -20 - Math.random() * H, r: 4 + Math.random() * 5, vy: 0.6 + Math.random(), vx: Math.random() - 0.5, a: Math.random() * 6, col: Math.random() < 0.7 ? "#f2a30f" : "#e8590c" });
  size(); addEventListener("resize", size);
  P = Array.from({ length: innerWidth < 600 ? 18 : 32 }, mk);
  (function loop() {
    if (!run) return;
    x.clearRect(0, 0, W, H);
    P.forEach(p => {
      p.y += p.vy; p.a += 0.03; p.x += p.vx + Math.sin(p.a) * 0.6;
      if (p.y > H + 10) Object.assign(p, mk(), { y: -10 });
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.col;
      x.globalAlpha = 0.85; x.beginPath(); x.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.3); x.fill(); x.restore();
    });
    requestAnimationFrame(loop);
  })();
  new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) requestAnimationFrame(function f() { /* restart */ }); if (run) startLoop(); }).observe(c);
  function startLoop() { run = true; (function l() { if (!run) return; x.clearRect(0, 0, W, H);
    P.forEach(p => { p.y += p.vy; p.a += 0.03; p.x += p.vx + Math.sin(p.a) * 0.6; if (p.y > H + 10) Object.assign(p, mk(), { y: -10 });
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.col; x.beginPath(); x.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.3); x.fill(); x.restore(); });
    requestAnimationFrame(l); })(); }
})();

/* ==========================================================
   9. Countdown (driven by CONFIG.eventDateISO)
   ========================================================== */
(function () {
  const target = new Date(CONFIG.eventDateISO).getTime(), p = n => String(n).padStart(2, "0");
  function tick() {
    const d = Math.max(0, target - Date.now()), s = Math.floor(d / 1000);
    $("#d").textContent = p(Math.floor(s / 86400));
    $("#h").textContent = p(Math.floor(s % 86400 / 3600));
    $("#m").textContent = p(Math.floor(s % 3600 / 60));
    $("#s").textContent = p(s % 60);
  }
  tick(); setInterval(tick, 1000);
})();

/* ==========================================================
   10. Lightbox (native <dialog>)
   ========================================================== */
const lb = $("#lb");
$("#gallery").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $("#lbImg").src = b.dataset.full.replace("/600/600", "/1200/1200");
  lb.showModal();
});
$("#lbClose").addEventListener("click", () => lb.close());
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

/* ==========================================================
   11. Background music (user-initiated only; browsers block autoplay)
   ========================================================== */
(function () {
  const btn = $("#music"), a = new Audio(CONFIG.music); a.loop = true;
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") === "true";
    if (on) a.pause(); else a.play().catch(() => alert("Add your music file at " + CONFIG.music));
    btn.setAttribute("aria-pressed", String(!on));
    btn.setAttribute("aria-label", on ? "Play background music" : "Mute background music");
  });
})();