// Draws cardboard cutouts as inline SVG. Usage: <div data-cutout="dave"></div>
(function () {
  var C = "#cfa06a", D = "#a87a45", L = "#e6c79a", K = "#2b2118";
  var P = 'fill="url(#cor)"';
  function wrap(inner, label) {
    return '<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">' +
      '<defs><pattern id="cor" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="' + C + '"/><rect width="3" height="6" fill="' + D + '" opacity=".22"/></pattern></defs>' +
      '<g stroke="' + K + '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g>' +
      '<path d="M70 394 L130 394 L120 376 L80 376 Z" fill="' + D + '" stroke="' + K + '" stroke-width="4" stroke-linejoin="round"/>' +
      '</svg>';
  }
  var art = {
    dave: wrap(
      '<circle cx="100" cy="62" r="38" ' + P + '/>' +
      '<path d="M62 52 Q100 14 138 52" fill="' + D + '"/>' +
      '<path d="M60 112 L140 112 L156 250 L128 250 L124 376 L76 376 L72 250 L44 250 Z" ' + P + '/>' +
      '<path d="M88 112 L100 150 L112 112" fill="#fff"/>' +
      '<circle cx="86" cy="62" r="4" fill="' + K + '"/><circle cx="114" cy="62" r="4" fill="' + K + '"/>' +
      '<path d="M84 80 Q100 94 116 80" fill="none"/>', "Cardboard cutout of a smiling dad"),
    boss: wrap(
      '<circle cx="100" cy="62" r="36" ' + P + '/>' +
      '<rect x="62" y="30" width="76" height="16" rx="6" fill="' + K + '"/>' +
      '<path d="M54 112 L146 112 L150 260 L122 260 L120 376 L80 376 L78 260 L50 260 Z" ' + P + '/>' +
      '<path d="M84 112 L100 140 L116 112" fill="#fff"/>' +
      '<path d="M92 140 L100 150 L108 140 L104 250 L96 250 Z" fill="' + K + '"/>' +
      '<path d="M86 78 L114 78" fill="none"/><circle cx="86" cy="62" r="4" fill="' + K + '"/><circle cx="114" cy="62" r="4" fill="' + K + '"/>', "Cardboard cutout of a businessman"),
    pirate: wrap(
      '<circle cx="100" cy="66" r="34" ' + P + '/>' +
      '<path d="M58 54 Q100 -2 142 54 Q100 40 58 54Z" fill="' + K + '"/>' +
      '<rect x="88" y="58" width="22" height="16" rx="4" fill="' + K + '"/>' +
      '<path d="M60 110 L140 110 L150 240 L126 240 L126 376 L74 376 L74 240 L50 240 Z" ' + P + '/>' +
      '<path d="M60 110 L140 190" fill="none"/>' +
      '<path d="M146 200 L186 120" fill="none" stroke-width="7"/>' +
      '<path d="M120 80 Q130 90 140 80" fill="none"/>', "Cardboard cutout of a pirate"),
    astro: wrap(
      '<circle cx="100" cy="70" r="46" fill="#f4efe6"/>' +
      '<rect x="68" y="48" width="64" height="44" rx="20" fill="' + D + '"/>' +
      '<path d="M54 118 L146 118 L156 250 L124 250 L122 376 L78 376 L76 250 L44 250 Z" ' + P + '/>' +
      '<rect x="80" y="140" width="40" height="36" rx="6" fill="' + L + '"/><circle cx="92" cy="158" r="5" fill="#d94f1e"/><circle cx="108" cy="158" r="5" fill="#3a7bd5"/>', "Cardboard cutout of an astronaut"),
    dog: wrap(
      '<path d="M30 250 L52 190 L150 190 Q172 190 176 214 L176 250 L160 250 L160 336 L134 336 L134 270 L84 270 L84 336 L58 336 L58 270 L40 270 Z" ' + P + '/>' +
      '<path d="M140 196 L150 120 Q158 104 176 112 Q196 122 188 150 L176 200 Z" ' + P + '/>' +
      '<path d="M166 120 L190 98 L196 140 Z" fill="' + D + '"/>' +
      '<circle cx="172" cy="130" r="4" fill="' + K + '"/>' +
      '<path d="M30 250 Q10 220 22 196" fill="none" stroke-width="9"/>', "Cardboard cutout of a golden retriever"),
    celeb: wrap(
      '<circle cx="100" cy="62" r="36" ' + P + '/>' +
      '<path d="M60 70 Q50 30 100 22 Q150 30 140 70 Q130 40 100 40 Q70 40 60 70Z" fill="' + K + '"/>' +
      '<rect x="72" y="56" width="56" height="14" rx="7" fill="' + K + '"/>' +
      '<path d="M58 112 L142 112 Q160 190 128 250 L124 376 L76 376 L72 250 Q40 190 58 112Z" ' + P + '/>' +
      '<path d="M84 90 Q100 100 116 90" fill="none"/>', "Cardboard cutout of a famous-looking person in sunglasses")
  };
  // Real photos (transparent webp). Add more here and use data-cutout="name".
  var photos = {
    bob: ["assets/cutouts/bob.webp", "Cardboard cutout of a painter with a palette and a squirrel"],
    elf: ["assets/cutouts/elf.webp", "Cardboard cutout of an overjoyed holiday elf"]
  };
  function paint() {
    var els = document.querySelectorAll("[data-cutout]");
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute("data-cutout");
      if (photos[k]) els[i].innerHTML = '<img src="' + photos[k][0] + '" alt="' + photos[k][1] + '">';
      else if (art[k]) els[i].innerHTML = art[k];
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint);
  else paint();
})();
