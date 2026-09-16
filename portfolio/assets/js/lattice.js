/* Rock–paper–scissors on a lattice — a cyclic cellular automaton.
   Every cell holds one of three strategies locked in a cyclic dominance loop:
   rock crushes scissors, scissors cut paper, paper covers rock. A cell is
   invaded when at least THRESHOLD of its eight neighbours already hold the
   strategy that beats it; otherwise it holds its ground.

       next(c) = c+1 (mod 3)   if  #{neighbours in state c+1} >= THRESHOLD
                 c             otherwise

   No strategy can win: beating one opponent exposes you to the third. Random
   noise self-organises into rotating spiral waves that never settle — the same
   cyclic dominance that turns up in my work on three-strategy evolutionary
   games. */

(function () {
  "use strict";

  var canvas = document.getElementById("lattice");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d", { alpha: false });

  var L = 160;
  var N = L * L;
  var THRESHOLD = 3;
  var BURN_IN = 180;     // generations run before the first paint
  var FPS = 10;

  var COLORS = [
    [111, 168, 255],   // rock     — blue
    [216, 166, 87],    // paper    — gold
    [228, 105, 79]     // scissors — vermilion
  ];

  canvas.width = L;
  canvas.height = L;
  ctx.imageSmoothingEnabled = false;

  var cur = new Uint8Array(N);
  var nxt = new Uint8Array(N);
  for (var i = 0; i < N; i++) cur[i] = (Math.random() * 3) | 0;

  function step() {
    for (var y = 0; y < L; y++) {
      var yUp = ((y - 1 + L) % L) * L, yMid = y * L, yDn = ((y + 1) % L) * L;
      for (var x = 0; x < L; x++) {
        var i = yMid + x;
        var want = cur[i] + 1; if (want === 3) want = 0;
        var xL = (x - 1 + L) % L, xR = (x + 1) % L;
        var c = 0;
        if (cur[yUp + xL] === want) c++;
        if (cur[yUp + x] === want) c++;
        if (cur[yUp + xR] === want) c++;
        if (cur[yMid + xL] === want) c++;
        if (cur[yMid + xR] === want) c++;
        if (cur[yDn + xL] === want) c++;
        if (cur[yDn + x] === want) c++;
        if (cur[yDn + xR] === want) c++;
        nxt[i] = c >= THRESHOLD ? want : cur[i];
      }
    }
    var t = cur; cur = nxt; nxt = t;
  }

  var img = ctx.createImageData(L, L);
  function draw() {
    var d = img.data;
    for (var i = 0; i < N; i++) {
      var c = COLORS[cur[i]];
      var o = i << 2;
      d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  var readout = document.getElementById("lattice-fc");
  var gen = 0;
  function report() {
    if (readout) readout.textContent = "generation " + gen;
  }

  // burn in before the first paint, so the page opens on organised spirals
  // rather than on the random noise they grow out of
  for (var k = 0; k < BURN_IN; k++) { step(); gen++; }
  draw();
  report();

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var running = true, last = 0, interval = 1000 / FPS;

  function loop(t) {
    if (!running) return;
    if (t - last > interval) { step(); gen++; draw(); report(); last = t; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) { running = true; requestAnimationFrame(loop); }
        else if (!e.isIntersecting) { running = false; }
      });
    }, { threshold: 0.05 }).observe(canvas);
  }
})();
