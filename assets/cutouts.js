// Cardboard Cutout Club: cutout roster + every bit of cutout-powered nonsense on the site.
//   <div data-cutout="bob"></div>          a cutout image (or "random")
//   <div data-mystery="blend"></div>       blacked-out "?" silhouette: "blend" = the unidentifiable
//                                          mystery shape, a cutout id = that cutout, empty = random
//   <div data-conga></div>                 an endless parade of every cutout
//   <div data-archive></div>               the last 12 shipped cutouts by month + click-for-specs popup
//   <div data-slot></div>                  "predict my next cutout" slot machine
//   A random cutout also sneaks onto the screen a little while after each page loads.
(function () {
  var ROSTER = [
    { id: "bob", name: "The Happy Painter", h: "6' 2\"",
      blurb: "Brings a calm energy to any room. Squirrel included at no extra charge.",
      spot: "Above the couch, admiring a painting he did not make.", eyes: "Gently, yes" },
    { id: "elf", name: "Buddy the Elf", h: "6' 3\"",
      blurb: "Maximum holiday cheer. Screams at a volume of zero decibels.",
      spot: "Bottom of the stairs, 6 a.m. Christmas morning.", eyes: "Constantly" },
    { id: "conductor", name: "The Conductor", h: "6' 0\"",
      blurb: "Will punch your ticket. Will not tell you where the train is going.",
      spot: "By the front door, checking everyone's ticket.", eyes: "Over the glasses" },
    { id: "franklin", name: "Benjamin Franklin", h: "5' 10\"",
      blurb: "Founding Father. Inventor. Now standing in your kitchen. A penny saved is a cutout earned.",
      spot: "Next to the thermostat, judging your energy bill.", eyes: "With disappointment" },
    { id: "liberty", name: "Lady Liberty (Apartment Size)", h: "6' 0\"",
      blurb: "Originally 151 ft. We took some liberties. Torch does not light up.",
      spot: "Guest bathroom. Guests will have opinions.", eyes: "Toward New Jersey" },
    { id: "obama", name: "President Obama", h: "6' 1\"",
      blurb: "The 44th President. Arms crossed, smile on. Approves of your hallway.",
      spot: "Leaning by the grill, as if he was invited.", eyes: "Warmly" },
    { id: "trump", name: "President Trump", h: "6' 3\"",
      blurb: "The 45th and 47th President. Two thumbs up for your living room.",
      spot: "Garage, giving the minivan two thumbs up.", eyes: "Enthusiastically" },
    { id: "rocky", name: "The Italian Stallion", h: "5' 10\"",
      blurb: "Guards the fridge. Will go the distance. Will not go anywhere, actually.",
      spot: "Top of the stairs. Arms up optional.", eyes: "Intensely" },
    { id: "wonder", name: "Wonder Woman", h: "5' 10\"",
      blurb: "Lasso not included. Looks over her shoulder so you don't have to.",
      spot: "Home office, for webcam backgrounds with authority.", eyes: "Over the shoulder" },
    { id: "bieber", name: "The Pop Star", h: "5' 9\"",
      blurb: "Sunglasses indoors. Gold sneakers. Never once asks what you mean.",
      spot: "Teenager's doorway. Results may vary.", eyes: "Unknown (sunglasses)" },
    { id: "deadpool", name: "The Merc With a Mouth", h: "6' 2\"",
      blurb: "Breaks the fourth wall. Cannot break the cardboard one.",
      spot: "Kid's closet, for maximum confusion.", eyes: "Behind the mask, probably" },
    { id: "horse", name: "Full-Size Horse", h: "5' 4\" at the shoulder",
      blurb: "Does not eat. Does not need a barn. Will need most of your living room.",
      spot: "Backyard, facing the neighbors.", eyes: "One at a time" },
    { id: "sheldon", name: "The Physicist", h: "6' 1\"",
      blurb: "Has a designated spot on the couch. That spot is now permanently his.",
      spot: "His spot.", eyes: "Condescendingly" },
    { id: "elvis", name: "The King (Gold Suit Edition)", h: "6' 0\"",
      blurb: "Gold suit, great hair, zero chance he has left the building.",
      spot: "Bottom of the staircase, for grand entrances.", eyes: "Smoldering" },
    { id: "jason", name: "The Camp Counselor", h: "6' 3\"",
      blurb: "Hockey mask. Very quiet. Do not put this one by the window.",
      spot: "Do not.", eyes: "Through the mask holes" },
    { id: "david", name: "Michelangelo's David", h: "6' 0\" (original: 17 ft)",
      blurb: "A Renaissance masterpiece, now in your foyer. Fig leaf sold separately.",
      spot: "Foyer, where the in-laws will see it first.", eyes: "Gazing toward Goliath" },
    { id: "dwight", name: "The Assistant (to the) Regional Manager", h: "6' 2\"",
      blurb: "Beets. Bears. Strict enforcement of household rules.",
      spot: "Next to the break room fridge.", eyes: "Suspiciously" },
    { id: "orangutan", name: "Full-Size Orangutan", h: "5' 0\"",
      blurb: "Two hundred pounds of pure judgment, in two pounds of cardboard.",
      spot: "Behind the shower curtain.", eyes: "Disapprovingly" },
    { id: "costanza", name: "The Opposite Guy", h: "5' 5\"",
      blurb: "Permanently mid-complaint. Probably about the parking.",
      spot: "Next to the couch, as if he lives there.", eyes: "Indignantly" },
    { id: "champ", name: "The Wrestling Champ", h: "6' 2\"",
      blurb: "Sequined robe, title-belt energy. Entrance music not included.",
      spot: "Top of the stairs, for a dramatic entrance.", eyes: "Like a champion" },
    { id: "frozen", name: "The Ice Sisters", h: "5' 6\"",
      blurb: "Two royal sisters, one cutout. Will not let it go.",
      spot: "Living room, until the kids are 30.", eyes: "Sisterly" },
    { id: "duke", name: "The Duke", h: "6' 4\"",
      blurb: "Cowboy hat, six-shooter, plenty of grit. Rides into your den and stays there.",
      spot: "Den, next to the recliner.", eyes: "Squinting into the sunset" },
    { id: "griswold", name: "The Holiday Dad", h: "6' 0\"",
      blurb: "Arms full of presents, plans to hang 25,000 lights. Will not rest until Christmas is perfect.",
      spot: "Front porch, beside a tangle of lights.", eyes: "Manically festive" },
    { id: "beetlejuice", name: "The Ghost With the Most", h: "5' 8\" (seated)",
      blurb: "Seated for comfort. Whatever you do, don't say his name three times.",
      spot: "Guest room. Say his name and find out.", eyes: "Mischievously" },
    { id: "droids", name: "The Droid Duo", h: "5' 9\" and 3' 7\"",
      blurb: "One beeps, one worries. Neither is the droid you're looking for.",
      spot: "Garage, guarding the toolbox.", eyes: "Glowing (allegedly)" },
    { id: "pennywise", name: "The Clown From the Storm Drain", h: "6' 4\"",
      blurb: "Comes with a balloon. Actually, no balloon. That's worse.",
      spot: "Anywhere but the basement.", eyes: "Directly at you" },
    { id: "vader", name: "The Dark Lord", h: "6' 6\"",
      blurb: "Heavy breathing not included. Lightsaber does not light up. Finds your lack of faith disturbing.",
      spot: "Home office, for video calls with leverage.", eyes: "Behind the helmet" }
  ];
  var BY = {}; ROSTER.forEach(function (c) { BY[c.id] = c; });

  // The last 12 months of drops, newest first. Every member got these.
  var SHIPPED = [
    ["pennywise", "October 2026"], ["dwight", "September 2026"], ["horse", "August 2026"],
    ["franklin", "July 2026"], ["elvis", "June 2026"], ["wonder", "May 2026"],
    ["bob", "April 2026"], ["sheldon", "March 2026"], ["david", "February 2026"],
    ["rocky", "January 2026"], ["elf", "December 2025"], ["conductor", "November 2025"]
  ];
  // Adam's next 12 boxes (Dec 2026 -> Nov 2027). #1 is the unidentifiable blend; the rest
  // have never shipped before (none of them appear in SHIPPED).
  var UPCOMING = ["blend", "frozen", "costanza", "deadpool", "champ", "vader",
    "orangutan", "liberty", "duke", "droids", "jason", "beetlejuice"];
  SHIPPED.forEach(function (s) { if (UPCOMING.indexOf(s[0]) >= 0) throw new Error(s[0] + " already shipped"); });

  window.CUTOUTS = ROSTER;
  window.UPCOMING = UPCOMING;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var me = document.currentScript, BASE = me ? me.src.replace(/cutouts\.js(\?.*)?$/, "cutouts/") : "assets/cutouts/";
  function src(c) { return BASE + c.id + ".webp"; }
  function pick(list) { list = list || ROSTER; return list[Math.floor(Math.random() * list.length)]; }
  function img(c, cls) { return '<img' + (cls ? ' class="' + cls + '"' : "") + ' src="' + src(c) + '" alt="Cardboard cutout: ' + c.name + '" loading="lazy" draggable="false">'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  var BLEND = { id: "mystery", name: "Unidentified" };

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
      var k = el.getAttribute("data-mystery"), c = k === "blend" ? BLEND : BY[k] || pick();
      el.classList.add("mystery");
      el.innerHTML = img(c, "shadow").replace(/alt="[^"]*"/, 'alt="A mystery cutout silhouette"') + '<span class="q" aria-hidden="true">?</span>';
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

  // Drop archive + lightbox
  function paintArchive() {
    each("[data-archive]", function (el) {
      el.innerHTML = '<div class="grid c3 gal">' +
        SHIPPED.map(function (s, i) {
          var c = BY[s[0]];
          return '<button class="cutout wobble" data-id="' + c.id + '" data-month="' + s[1] + '"><div class="month"><b>' + s[1].split(" ")[0] + "</b> " + s[1].split(" ")[1] +
            (i === 0 ? '<span class="latest">Latest</span>' : "") + '</div><div class="stage">' + img(c) +
            '</div><div class="meta"><h3>' + esc(c.name) + "</h3><p>" + esc(c.blurb) + "</p></div></button>";
        }).join("") + "</div>";
      el.addEventListener("click", function (e) {
        var card = e.target.closest(".cutout");
        if (card) openSpecs(BY[card.dataset.id], card.dataset.month);
      });
    });
  }

  var dlg;
  function openSpecs(c, month) {
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
      '<div class="pic">' + img(c) + '</div><div class="info"><span class="tag">Shipped ' + esc(month) + "</span><h2>" + esc(c.name) + "</h2><p>" + esc(c.blurb) + "</p>" +
      "<dl><dt>Cutout height</dt><dd>" + c.h + "</dd><dt>Weight</dt><dd>About 2 lbs</dd>" +
      "<dt>Material</dt><dd>Heavy-duty corrugated board</dd><dt>Stand</dt><dd>Attached fold-out easel back</dd>" +
      "<dt>Best placed</dt><dd>" + esc(c.spot) + "</dd><dt>Eyes follow you?</dt><dd>" + esc(c.eyes) + "</dd>" +
      "<dt>Can I get this one?</dt><dd>No. It already shipped. Every box is a surprise.</dd></dl></div></div>";
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
          win.innerHTML = img(BLEND, "shadow") + '<span class="q" aria-hidden="true">?</span>';
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
    // Only greet by name after a successful login, never before.
    var loggedIn = false;
    try { loggedIn = sessionStorage.getItem("ccc_in") === "1"; } catch (e) {}
    var name = loggedIn && window.MEMBER && window.MEMBER.name;
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

  function init() { paintArchive(); paintCutouts(); paintMystery(); paintConga(); paintSlot(); peeker(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
