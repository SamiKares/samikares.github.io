<<<<<<< Updated upstream
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
window.SKPage.register('security-scroll', scope => {
  'use strict';
  const setTimeout = scope.timeout.bind(scope);
  const setInterval = scope.interval.bind(scope);
  const requestAnimationFrame = scope.frame.bind(scope);
  const IntersectionObserver = scope.observer(window.IntersectionObserver);
  const ResizeObserver = scope.observer(window.ResizeObserver);
<<<<<<< Updated upstream
=======
=======
(() => {
  'use strict';
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes

  const source = document.querySelector('.hero [data-part="cyber-security"]');
  const dock = document.querySelector('#security-dock');
  const destination = dock?.querySelector('.shield-icon');
  if (!source || !destination) return;

  const root = document.documentElement;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const baseWidth = 82;
  const baseHeight = 121;
  const carrier = document.createElement('div');
  carrier.className = 'shield-flight';
  carrier.setAttribute('aria-hidden', 'true');
  carrier.setAttribute('inert', '');
  const drawing = document.createElementNS(svgNamespace, 'svg');
  drawing.setAttribute('viewBox', '348 222 82 121');
  drawing.setAttribute('class', 'shield-icon system-mark');
  drawing.setAttribute('focusable', 'false');
  const shield = source.cloneNode(true);
  shield.removeAttribute('transform');
  shield.removeAttribute('data-part');
  shield.removeAttribute('id');

  function svgElement(tag, attributes = {}) {
    const node = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    return node;
  }

  const centre = { x: 389, y: 282.5 };
  const definitions = svgElement('defs');
  const assembly = svgElement('g', { opacity: 0 });
  const connections = svgElement('g', { class: 'shield-connections' });
  const panels = [];
  const frameParts = [...shield.children].slice(0, 2);
  const lockParts = [...shield.children].slice(2);
  const radialPoint = (angle, radius) => ({
    x: centre.x + Math.cos(angle) * radius,
    y: centre.y + Math.sin(angle) * radius
  });

  // Six pieces retain the original linework. Clipping and movement happen in
  // nested groups so each fragment carries its own slice of the shield.
  for (let index = 0; index < 6; index++) {
    const startAngle = (index * 60 - 90) * Math.PI / 180;
    const endAngle = startAngle + Math.PI / 3;
    const angle = (startAngle + endAngle) / 2;
    const start = radialPoint(startAngle, 220);
    const end = radialPoint(endAngle, 220);
    const clipId = `security-flight-panel-${index}`;
    const clip = svgElement('clipPath', { id: clipId, clipPathUnits: 'userSpaceOnUse' });
    clip.append(svgElement('path', {
      d: `M${centre.x} ${centre.y} L${start.x} ${start.y} L${end.x} ${end.y} Z`
    }));
    definitions.append(clip);
    const panel = svgElement('g');
    const slice = svgElement('g', { 'clip-path': `url(#${clipId})` });
    frameParts.forEach(part => slice.append(part.cloneNode(true)));
    panel.append(slice);
    const line = svgElement('line', { x1: centre.x, y1: centre.y });
    const point = svgElement('circle', { r: 1.6 });
    connections.append(line, point);
    panels.push({ panel, angle, line, point });
  }

  const orbit = svgElement('path', {
    class: 'shield-orbit',
    d: 'M389 252 L415.4 267.25 L415.4 297.75 L389 313 L362.6 297.75 L362.6 267.25 Z'
  });
  const core = svgElement('g');
  const coreBody = svgElement('path', { class: 'face' });
  const shackle = lockParts[0].cloneNode(true);
  const keyhole = svgElement('g');
  keyhole.append(lockParts[2].cloneNode(true), lockParts[3].cloneNode(true));
  const coreLight = svgElement('path', {
    class: 'shield-core-light', d: 'M389 274 L400 285.5 L389 297 L378 285.5 Z', opacity: 0
  });
  core.append(shackle, coreBody, keyhole, coreLight);
  assembly.append(connections, orbit, ...panels.map(item => item.panel), core);
  drawing.append(definitions, shield, assembly);
  carrier.append(drawing);
  document.body.append(carrier);
  source.classList.add('security-story-source');

  const clamp = value => Math.max(0, Math.min(1, value));
  const mix = (from, to, progress) => from + (to - from) * progress;
  const ease = progress => progress * progress * (3 - 2 * progress);
  const ramp = (from, to, progress) => ease(clamp((progress - from) / (to - from)));
  const lockedCore = [[375,273],[403,273],[405,275],[405,298],[403,300],[375,300],[373,298],[373,275]];
  const openCore = [[389,263],[403,272],[412,286],[403,300],[389,309],[375,300],[366,286],[375,272]];
  let anchors;
  let frame = 0;
  let needsMeasure = true;
  let enabled = !motionPreference.matches;
  let currentPhase = '';

  function setPhase(phase) {
    if (phase === currentPhase) return;
    currentPhase = phase;
    root.dataset.securityScroll = phase;
    source.classList.toggle('security-source-away', phase !== 'origin');
  }

  function measure() {
    // Document coordinates survive scrolling. Layout is read only after a resize,
    // font load or another observed layout change, never after style writes.
    const from = source.getBoundingClientRect();
    const to = destination.getBoundingClientRect();
    if (!from.width || !to.width) return false;
    const pageY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const sourceY = from.top + pageY + from.height / 2;
    const targetY = to.top + pageY + to.height / 2;
    const start = Math.max(0, sourceY - viewportHeight * .47);
    const end = Math.max(start + viewportHeight * .35, targetY - viewportHeight * .52);
    anchors = {
      sourceX: from.left + from.width / 2,
      sourceY,
      targetX: to.left + to.width / 2,
      targetY,
      sourceScale: from.width / baseWidth,
      targetScale: to.width / baseWidth,
      start,
      end
    };
    needsMeasure = false;
    return true;
  }

  function render() {
    frame = 0;
    if (!enabled) return;
    if ((needsMeasure || !anchors) && !measure()) return;
    const progress = clamp((window.scrollY - anchors.start) / (anchors.end - anchors.start));
    if (progress <= 0) {
      setPhase('origin');
      carrier.style.opacity = '0';
      carrier.style.willChange = 'auto';
      return;
    }
    if (progress >= 1) {
      setPhase('docked');
      carrier.style.opacity = '0';
      carrier.style.willChange = 'auto';
      return;
    }

    const position = ease(progress);
    const breakup = ramp(.1, .34, progress) * (1 - ramp(.72, .96, progress));
    const fragments = ramp(.08, .18, progress) * (1 - ramp(.9, .98, progress));
    // Leave the text column clear; move left later, as the project enters view.
    const horizontalPosition = ease(progress ** 2.6);
    const lift = Math.sin(Math.PI * progress);
    let x = mix(anchors.sourceX, anchors.targetX, horizontalPosition)
      + lift * Math.min(200, window.innerWidth * .145);
    let y = mix(anchors.sourceY, anchors.targetY, position)
      - window.scrollY - lift * 125;
    const growth = mix(.48, .85, clamp((window.innerWidth - 480) / 600));
    const scale = mix(anchors.sourceScale, anchors.targetScale, position) * (1 + breakup * growth);
    // Distances are in screen pixels: the fragments spread across the view,
    // instead of remaining a small ring around the lock on larger screens.
    const spread = Math.min(190, Math.max(24, (window.innerWidth / 2 - 24 - 74 * scale) / 1.2));
    const rotation = -8 * lift;
    const mode = source.closest('.system-stage')?.dataset.mode;
    const initialOpacity = mode === 'infra' || mode === 'ai' ? .27 : 1;

    shield.setAttribute('opacity', 1 - fragments);
    assembly.setAttribute('opacity', fragments);
    connections.setAttribute('opacity', breakup * .72);
    orbit.setAttribute('opacity', breakup * .55);
    orbit.setAttribute('transform', `translate(${centre.x} ${centre.y}) rotate(${breakup * 65}) scale(${1 + breakup * .35}) translate(${-centre.x} ${-centre.y})`);
    let radius = 61 * scale;
    panels.forEach(({ panel, angle, line, point }, index) => {
      const separation = ramp(.08 + index * .018, .32 + index * .012, progress)
        * (1 - ramp(.7 + (5 - index) * .016, .96, progress));
      const distance = separation * spread / scale * (.82 + index % 3 * .19);
      const twist = separation * ((progress - .5) * 1.2 + lift * .14 * (index - 2.5));
      const dx = Math.cos(angle + twist) * distance;
      const dy = Math.sin(angle + twist) * distance;
      const rotation = separation * (index % 2 ? 1 : -1) * (28 + lift * 47);
      panel.setAttribute('transform', `translate(${dx} ${dy}) rotate(${rotation} ${centre.x} ${centre.y})`);
      const node = radialPoint(angle + twist, 28 + distance);
      line.setAttribute('x2', node.x);
      line.setAttribute('y2', node.y);
      point.setAttribute('cx', node.x);
      point.setAttribute('cy', node.y);
      radius = Math.max(radius, (distance + 74) * scale);
    });

    // Keep the full expanded assembly inside the viewport, including on phones.
    const keepInside = (value, size) => {
      const margin = radius + 18;
      return margin * 2 >= size ? size / 2 : Math.max(margin, Math.min(size - margin, value));
    };
    x = keepInside(x, window.innerWidth);
    y = keepInside(y, window.innerHeight);
    const outline = lockedCore.map(([x, y], index) => {
      const [toX, toY] = openCore[index];
      return `${index ? 'L' : 'M'}${mix(x, toX, breakup)} ${mix(y, toY, breakup)}`;
    }).join(' ') + ' Z';
    coreBody.setAttribute('d', outline);
    shackle.setAttribute('opacity', 1 - breakup);
    shackle.setAttribute('transform', `translate(0 ${-breakup * 10})`);
    keyhole.setAttribute('opacity', 1 - breakup);
    coreLight.setAttribute('opacity', breakup);

    // Both handovers use the unmodified drawing. The scroll position alone
    // controls disassembly, the changed core, and the reverse reassembly.
    carrier.style.transform = `translate3d(${x - baseWidth / 2}px,${y - baseHeight / 2}px,0) rotate(${rotation}deg) scale(${scale})`;
    carrier.style.opacity = String(mix(initialOpacity, 1, clamp(progress / .12)));
    carrier.style.willChange = 'transform';
    setPhase('flight');
  }

  function schedule(measureAgain = false) {
    if (!enabled) return;
    if (measureAgain) needsMeasure = true;
    if (!frame) frame = requestAnimationFrame(render);
  }

  function updatePreference() {
    enabled = !motionPreference.matches;
    if (!enabled) {
      cancelAnimationFrame(frame);
      frame = 0;
      currentPhase = '';
      delete root.dataset.securityScroll;
      source.classList.remove('security-source-away');
      carrier.style.opacity = '0';
      carrier.style.willChange = 'auto';
    } else schedule(true);
  }

  window.addEventListener('scroll', () => schedule(), { passive: true });
  window.addEventListener('resize', () => schedule(true), { passive: true });
  window.addEventListener('pageshow', () => schedule(true));
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame);
    frame = 0;
  });
  motionPreference.addEventListener('change', updatePreference);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(() => schedule(true));
    observer.observe(document.querySelector('.hero'));
    observer.observe(document.querySelector('#projektit'));
  }
  document.fonts?.ready.then(() => schedule(true));
  updatePreference();
<<<<<<< Updated upstream
});
=======
<<<<<<< HEAD
});
=======
})();
>>>>>>> 5769209a68eb77c3d51b96ada92da984e22aa513
>>>>>>> Stashed changes
