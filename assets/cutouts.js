// Cardboard Cutout Club: cutout roster + every bit of cutout-powered nonsense on the site.
//   <div data-cutout="bob"></div>          a cutout image (or "random")
//   <div data-mystery></div>               a blacked-out "?" silhouette of a random cutout
//   <div data-conga></div>                 an endless parade of every cutout
//   <div data-gallery></div>               filter chips + grid + click-for-specs popup
//   <div data-slot></div>                  "predict my next cutout" slot machine
//   A random cutout also sneaks onto the screen a little while after each page loads.
(function () {
  var ROSTER = [
    { id: "bob", name: "The Happy Painter", cat: "Icons", tag: "CLUB CLASSIC", h: "6' 2\"",
      blurb: "Brings a calm energy to any room. Squirrel included at no extra charge.",
      spot: "Above the couch, admiring a painting he did not make.", eyes: "Gently, yes" },
    { id: "elf", name: "Buddy the Elf", cat: "Holiday", tag: "HOLIDAY DROP", h: "6' 3\"",
      blurb: "Maximum holiday cheer. Screams at a volume of zero decibels.",
      spot: "Bottom of the stairs, 6 a.m. Christmas morning.", eyes: "Constantly" },
    { id: "conductor", name: "The Conductor", cat: "Holiday", tag: "NOVEMBER DROP", h: "6' 0\"",
      blurb: "Will punch your ticket. Will not tell you where the train is going.",
      spot: "By the front door, checking everyone's ticket.", eyes: "Over the glasses" },
    { id: "franklin", name: "Benjamin Franklin", cat: "Americana", tag: "FOUNDING FATHER", h: "5' 10\"",
      blurb: "Founding Father. Inventor. Now standing in your kitchen. A penny saved is a cutout earned.",
      spot: "Next to the thermostat, judging your energy bill.", eyes: "With disappointment" },
    { id: "liberty", name: "Lady Liberty (Apartment Size)", cat: "Americana", tag: "LIMITED RUN", h: "6' 0\"",
      blurb: "Originally 151 ft. We took some liberties. Torch does not light up.",
      spot: "Guest bathroom. Guests will have opinions.", eyes: "Toward New Jersey" },
    { id: "obama", name: "President Obama", cat: "Americana", tag: "MEMBER FAVORITE", h: "6' 1\"",
      blurb: "The 44th President. Arms crossed, smile on. Approves of your hallway.",
      spot: "Leaning by the grill, as if he was invited.", eyes: "Warmly" },
    { id: "trump", name: "President Trump", cat: "Americana", tag: "MEMBER FAVORITE", h: "6' 3\"",
      blurb: "The 45th and 47th President. Two thumbs up for your living room.",
      spot: "Garage, giving the minivan two thumbs up.", eyes: "Enthusiastically" },
    { id: "rocky", name: "The Italian Stallion", cat: "Heroes", tag: "OCTOBER DROP", h: "5' 10\"",
      blurb: "Guards the fridge. Will go the distance. Will not go anywhere, actually.",
      spot: "Top of the stairs. Arms up optional.", eyes: "Intensely" },
    { id: "wonder", name: "Wonder Woman", cat: "Heroes", tag: "SEPTEMBER DROP", h: "5' 10\"",
      blurb: "Lasso not included. Looks over her shoulder so you don't have to.",
      spot: "Home office, for webcam backgrounds with authority.", eyes: "Over the shoulder" },
    { id: "bieber", name: "The Pop Star", cat: "Icons", tag: "FAN FAVORITE", h: "5' 9\"",
      blurb: "Sunglasses indoors. Gold sneakers. Never once asks what you mean.",
      spot: "Teenager's doorway. Results may vary.", eyes: "Unknown (sunglasses)" }
  ];
  var BY = {}; ROSTER.forEach(function (c) { BY[c.id] = c; });
  window.CUTOUTS = ROSTER;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var me = document.currentScript, BASE = me ? me.src.replace(/cutouts\.js(\?.*)?$/, "cutouts/") : "assets/cutouts/";
  function src(c) { return BASE + c.id + ".webp"; }
  function pick(list) { list = list || ROSTER; return list[Math.floor(Math.random() * list.length)]; }
  function img(c, cls) { return '<img' + (cls ? ' class="' + cls + '"' : "") + ' src="' + src(c) + '" alt="Cardboard cutout: ' + c.name + '" loading="lazy" draggable="false">'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  // Plain cutouts
  function paintCutouts() {
    each("[data-cutout]", function (el) {
      var k = el.getAttribute("data-cutout"), c = k === "random" ? pick() : BY[k];
      if (c) el.innerHTML = img(c);
    });
  }

  // Mystery silhouettes
  function paintMystery() {
    each("[data-mystery]", function (el) {
      el.classList.add("mystery");
      el.innerHTML = img(pick(), "shadow") + '<span class="q" aria-hidden="true">?</span>';
    });
  }

  // Conga line
  function paintConga() {
    each("[data-conga]", function (el) {
      var set = ROSTER.slice().sort(function () { return Math.random() - 0.5; });
      var row = set.map(function (c) { return '<figure title="' + esc(c.name) + '">' + img(c) + "</figure>"; }).join("");
      el.classList.add("conga");
      el.innerHTML = '<div class="track">' + row + row + "</div>";
    });
  }

  // Gallery + lightbox
  function paintGallery() {
    each("[data-gallery]", function (el) {
      var cats = ["All"].concat(ROSTER.map(function (c) { return c.cat; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
      el.innerHTML =
        '<div class="chips" role="group" aria-label="Filter cutouts">' +
        cats.map(function (c, i) { return '<button class="chip' + (i ? "" : " on") + '" data-cat="' + c + '">' + c + "</button>"; }).join("") +
        '</div><div class="grid c3 gal">' +
        ROSTER.map(function (c) {
          return '<button class="cutout wobble" data-id="' + c.id + '" data-cat="' + c.cat + '"><div class="stage">' + img(c) +
            '</div><div class="meta"><h3>' + esc(c.name) + "</h3><p>" + esc(c.blurb) + '</p><span class="tag">' + c.tag + "</span></div></button>";
        }).join("") +
        '<a class="cutout wobble" data-cat="All" href="login.html" style="text-decoration:none;color:inherit"><div class="stage"><div data-mystery></div></div>' +
        '<div class="meta"><h3>Your Next Cutout</h3><p>Already in production. Identity strictly classified until it is standing in your doorway.</p><span class="tag">COMING SOON</span></div></a>' +
        "</div>";
      el.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (chip) {
          each(".chip", function (b) { b.classList.toggle("on", b === chip); });
          var cat = chip.dataset.cat;
          el.querySelectorAll(".gal .cutout").forEach(function (card) {
            card.hidden = !(cat === "All" || card.dataset.cat === cat);
          });
          return;
        }
        var card = e.target.closest(".cutout");
        if (card) openSpecs(BY[card.dataset.id]);
      });
    });
  }

  var dlg;
  function openSpecs(c) {
    if (!dlg) {
      dlg = document.createElement("div");
      dlg.className = "lightbox";
      dlg.setAttribute("role", "dialog");
      dlg.setAttribute("aria-modal", "true");
      document.body.appendChild(dlg);
      dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest(".x")) closeSpecs(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSpecs(); });
    }
    dlg.innerHTML = '<div class="box"><button class="x" aria-label="Close">&times;</button>' +
      '<div class="pic">' + img(c) + '</div><div class="info"><span class="tag">' + c.tag + "</span><h2>" + esc(c.name) + "</h2><p>" + esc(c.blurb) + "</p>" +
      "<dl><dt>Cutout height</dt><dd>" + c.h + "</dd><dt>Weight</dt><dd>About 2 lbs</dd>" +
      "<dt>Material</dt><dd>Heavy-duty corrugated board</dd><dt>Stand</dt><dd>Attached fold-out easel back</dd>" +
      "<dt>Best placed</dt><dd>" + esc(c.spot) + "</dd><dt>Eyes follow you?</dt><dd>" + esc(c.eyes) + "</dd>" +
      "<dt>Can I choose this one?</dt><dd>No. Every box is a surprise.</dd></dl></div></div>";
    dlg.classList.add("open");
    dlg.querySelector(".x").focus();
  }
  function closeSpecs() { if (dlg) dlg.classList.remove("open"); }

  // Slot machine
  var SLOT_LINES = [
    "Prediction complete. Result: classified.",
    "Our systems predict... a cutout. Exact cutout redacted for your enjoyment.",
    "Prediction locked in. We'd tell you, but the cardboard asked us not to.",
    "The algorithm has spoken. It said \"surprise.\"",
    "Result sealed. Please wait 3 to 5 business days for your answer to arrive in person."
  ];
  function paintSlot() {
    each("[data-slot]", function (el) {
      el.classList.add("slot");
      el.innerHTML = '<div class="reel"><div class="win">' + img(pick()) + '</div></div>' +
        '<div class="slot-side"><button class="btn" type="button">Predict my next cutout</button><p class="out" aria-live="polite">Pull the lever. See the future.</p></div>';
      var win = el.querySelector(".win"), btn = el.querySelector("button"), out = el.querySelector(".out"), n = 0;
      btn.addEventListener("click", function () {
        btn.disabled = true; out.textContent = "Consulting the cardboard...";
        win.parentNode.classList.remove("done");
        var spins = reduce ? 1 : 16, i = 0, delay = 60;
        (function spin() {
          win.innerHTML = img(pick());
          if (++i < spins) { delay *= 1.14; setTimeout(spin, delay); return; }
          win.innerHTML = img(pick(), "shadow") + '<span class="q" aria-hidden="true">?</span>';
          win.parentNode.classList.add("done");
          out.textContent = SLOT_LINES[n++ % SLOT_LINES.length];
          btn.textContent = "Try again"; btn.disabled = false;
        })();
      });
    });
  }

  // The cutout that sneaks onto the screen
  var PEEK_LINES = [
    "Psst. Your cutout is in production.",
    "Don't mind me. Just standing here.",
    "I'm not really here. Or am I?",
    "Have you checked behind the door lately?",
    "We're coming. 3 to 5 business days."
  ];
  function peeker() {
    if (document.body.hasAttribute("data-no-peek")) return;
    var seen = 0;
    try { seen = +sessionStorage.getItem("ccc_peeks") || 0; sessionStorage.setItem("ccc_peeks", seen + 1); } catch (e) {}
    if (seen > 4) return; // don't overdo it
    var c = pick(), side = Math.random() < 0.5 ? "left" : "right";
    var name = window.MEMBER && window.MEMBER.name;
    var line = pick(PEEK_LINES);
    if (name && Math.random() < 0.5) line = "Oh. Hi, " + name + ".";
    var el = document.createElement("button");
    el.className = "peeker " + side;
    el.setAttribute("aria-label", "A cardboard cutout of " + c.name + " is peeking at you. Click to dismiss.");
    el.innerHTML = '<span class="bubble">' + esc(line) + "</span>" + img(c);
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add("in"); }, 9000 + Math.random() * 6000);
    el.addEventListener("click", function () {
      el.querySelector(".bubble").textContent = "Fine. I'll go.";
      setTimeout(function () { el.classList.remove("in"); el.classList.add("gone"); }, 900);
    });
  }

  function init() { paintGallery(); paintCutouts(); paintMystery(); paintConga(); paintSlot(); peeker(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
