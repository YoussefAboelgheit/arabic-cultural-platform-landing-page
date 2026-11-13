(function () {
      var hero = document.getElementById('hero'), px = 0, py = 0, tx = 0, ty = 0;
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function move(e) {var r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = ((e.clientY - r.top) / r.height - .5) * 2}
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', function () {tx = 0; ty = 0});
      hero.addEventListener('pointerdown', function (e) {
        move(e);
        if (reduce || e.target.closest('a')) return;
        var r = hero.getBoundingClientRect(), d = document.createElement('span');
        d.className = 'ink'; d.style.left = (e.clientX - r.left) + 'px'; d.style.top = (e.clientY - r.top) + 'px';
        d.addEventListener('animationend', function () {d.remove()});
        hero.appendChild(d);
      });
      function tick(t) {
        if (!reduce && !tx && !ty) {px += (Math.sin(t / 2200) * .35 - px) * .05; py += (Math.cos(t / 2600) * .25 - py) * .05}
        else {px += (tx - px) * .08; py += (ty - py) * .08}
        hero.style.setProperty('--px', px.toFixed(3)); hero.style.setProperty('--py', py.toFixed(3));
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();