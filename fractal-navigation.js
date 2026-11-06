/* Fractal page navigation: recursive geometry + live DOM fragments + compositor motion. */
(() => {
  'use strict';
  if (window.SKFractalNavigation || !window.SKPage || !window.SKFractalGeometry) return;
  if (!/^https?:$/.test(location.protocol) || !Element.prototype.animate || !Element.prototype.attachShadow) return;
  window.SKFractalNavigation = true;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pageNames = new Set(['index.html', 'cv.html', 'ai.html', 'photography.html']);
  const directory = new URL('.', location.href).pathname;
  const cache = new Map();
  let currentPath = location.pathname, busy = false, queued = null, activeAnimations = [];
  let scrollTimer;
  const pathOf = url => url.pathname.replace(/\/$/, '/index.html');
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const paint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  function routeFor(anchor) {
    if (!anchor || anchor.hasAttribute('download') || anchor.target && anchor.target !== '_self' || anchor.hasAttribute('data-no-transition')) return null;
    const url = new URL(anchor.href, location.href);
    const name = url.pathname.split('/').pop() || 'index.html';
    if (url.origin !== location.origin || new URL('.', url).pathname !== directory || !pageNames.has(name)) return null;
    return url;
  }
  function getPage(url) {
    const key = url.pathname + url.search;
    if (!cache.has(key)) {
      const request = fetch(key, { credentials:'same-origin', signal:AbortSignal.timeout(5000) }).then(async response => {
        if (!response.ok) throw new Error('Page unavailable');
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if (!doc.querySelector('main#main') || !doc.querySelector('.site-header')) throw new Error('Unexpected page');
        return html;
      }).catch(error => { cache.delete(key); throw error; });
      cache.set(key, request);
    }
    return cache.get(key).then(html => new DOMParser().parseFromString(html, 'text/html'));
  }
  function rememberScroll() {
    if (busy) return;
    history.replaceState({ ...history.state, skScroll:[scrollX, scrollY] }, '', location.href);
  }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  rememberScroll();
  addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(rememberScroll, 120); }, {passive:true});
  addEventListener('pagehide', rememberScroll);

  // Copy only the visible page and preserve the space occupied by distant sections.
  // One isolated shadow tree keeps fragment IDs and CSS away from the working page.
  function snapshot(width, height) {
    const scroll = scrollY;
    function clone(node) {
      if (node.nodeType !== Node.ELEMENT_NODE) return node.cloneNode(false);
      if (/^(SCRIPT|NOSCRIPT|DIALOG|IFRAME)$/.test(node.tagName) || node.matches('.toast,.shield-flight,.progress-line,.skip-link')) return null;
      if (/^(SECTION|ARTICLE|FIGURE|HEADER|FOOTER)$/.test(node.tagName)) {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -60 || rect.top > height + 60) {
          const spacer = document.createElement('div'), style = getComputedStyle(node);
          spacer.style.cssText = `width:${rect.width}px;height:${rect.height}px;margin:${style.margin};flex:${style.flex};grid-area:${style.gridArea};visibility:hidden;box-sizing:border-box;`;
          return spacer;
        }
      }
      const copy = node.cloneNode(false);
      if (node.tagName === 'SVG') return node.cloneNode(true);
      if (node.tagName === 'IMG') { copy.loading = 'eager'; copy.src = node.currentSrc || node.src; }
      for (const child of node.childNodes) { const result=clone(child); if(result) copy.append(result); }
      return copy;
    }
    const world = document.createElement('div');
    world.className = 'fractal-world ' + document.body.className + ' ' + root.className.replace(/fractal-\S+/g,'');
    if (root.dataset.theme) world.dataset.theme = root.dataset.theme;
    if (root.dataset.securityScroll) world.dataset.securityScroll = root.dataset.securityScroll;
    world.style.width = width + 'px';
    for (const node of document.body.childNodes) { const copy=clone(node); if(copy) world.append(copy); }
    return {world, scroll};
  }
  function pageCSS() {
    let css='';
    for (const sheet of document.styleSheets) {
      try { for(const rule of sheet.cssRules) if(!rule.cssText.startsWith('@font-face')) css+=rule.cssText+'\n'; } catch {}
    }
    // Match element selectors only; never rewrite names such as .project-body.
    return css.replace(/(?<![\w-])(?:body|html)(?=[\s.{:#>\[])/g, '.fractal-world');
  }
  const internalCSS = `
    :host{display:block;position:fixed;inset:0;overflow:hidden;background:var(--paper);pointer-events:auto;perspective:1500px}
    .field{position:absolute;inset:0;overflow:hidden;background:radial-gradient(ellipse at 50% 47%,var(--soft),var(--paper) 72%)}
    .filaments{position:absolute;inset:0;width:100%;height:100%;opacity:0;color:var(--olive)}
    .facet{position:absolute;overflow:hidden;contain:layout paint style;will-change:transform,opacity;backface-visibility:hidden;transform-style:flat}
    .fractal-world{position:absolute;left:0;top:0;pointer-events:none;margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased}
    .fractal-world::before{display:none!important}
    .fractal-world *,.fractal-world *::before,.fractal-world *::after{animation:none!important;transition:none!important;caret-color:transparent!important}
    .edge{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;overflow:visible;color:var(--olive)}
    .edge polygon{stroke:currentColor;stroke-width:.8;vector-effect:non-scaling-stroke;fill:none}
  `;
  function overlay(width,height,geometry) {
    const host=document.createElement('div');host.className='fractal-transition';host.setAttribute('aria-hidden','true');host.setAttribute('inert','');
    const shadow=host.attachShadow({mode:'open'}),style=document.createElement('style');
    style.textContent=pageCSS()+internalCSS;shadow.append(style);
    const field=document.createElement('div');field.className='field';shadow.append(field);
    const ns='http://www.w3.org/2000/svg', wires=document.createElementNS(ns,'svg');
    wires.setAttribute('viewBox',`0 0 ${width} ${height}`);wires.setAttribute('class','filaments');
    for (const leaf of geometry) {
      const p=document.createElementNS(ns,'path');
      p.setAttribute('d',`M${leaf.parent.x} ${leaf.parent.y} Q${width/2} ${height/2} ${leaf.cloud.x} ${leaf.cloud.y}`);
      p.setAttribute('fill','none');p.setAttribute('stroke','currentColor');p.setAttribute('stroke-width','.65');p.setAttribute('stroke-opacity','.22');
      wires.append(p);
      const dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',leaf.cloud.x);dot.setAttribute('cy',leaf.cloud.y);dot.setAttribute('r',leaf.depth%3===0?'2':'1');dot.setAttribute('fill','currentColor');wires.append(dot);
    }
    shadow.append(wires);document.documentElement.append(host);
    return {host,shadow,style,wires,width,height};
  }
  function fragments(view,shot,geometry) {
    const group=document.createElement('div'), result=[];
    for (const leaf of geometry) {
      const tile=document.createElement('div'),b=leaf.box;
      tile.className='facet';
      tile.style.cssText=`left:${b.x}px;top:${b.y}px;width:${b.w+.5}px;height:${b.h+.5}px;clip-path:polygon(${leaf.local.map(p=>`${p.x}px ${p.y}px`).join(',')});transform-origin:${leaf.centroid.x-b.x}px ${leaf.centroid.y-b.y}px;`;
      const world=shot.world.cloneNode(true);
      world.style.transform=`translate(${-b.x}px,${-b.y-shot.scroll}px)`;
      tile.append(world);
      const ns='http://www.w3.org/2000/svg',edge=document.createElementNS(ns,'svg'),outline=document.createElementNS(ns,'polygon');
      edge.setAttribute('class','edge');edge.setAttribute('viewBox',`0 0 ${b.w+.5} ${b.h+.5}`);
      outline.setAttribute('points',leaf.local.map(p=>`${p.x},${p.y}`).join(' '));edge.append(outline);tile.append(edge);
      group.append(tile);result.push({tile,edge,leaf});
    }
    view.shadow.append(group);
    return {group,items:result};
  }
  function pose(leaf,amount,branch=0,turn=1) {
    const dx=(leaf.cloud.x-leaf.centroid.x)*amount+leaf.branch.x*branch;
    const dy=(leaf.cloud.y-leaf.centroid.y)*amount+leaf.branch.y*branch;
    const sx=1+(leaf.scale-1)*amount, sy=1+(leaf.scale*.8-1)*amount;
    return `translate3d(${dx}px,${dy}px,${Math.sin(amount*Math.PI)*60}px) rotate(${leaf.turn*amount*turn}deg) rotateX(${leaf.tilt*amount}deg) scale(${sx},${sy})`;
  }
  function animate(set,incoming) {
    const animations=[];
    for(const {tile,edge,leaf} of set.items) {
      const frames=incoming ? [
        {transform:pose(leaf,1),opacity:.42,offset:0},
        {transform:pose(leaf,.72,-.5,.85),opacity:.85,offset:.25},
        {transform:pose(leaf,.13,-.15,.45),opacity:1,offset:.68},
        {transform:pose(leaf,0),opacity:1,offset:1}
      ] : [
        {transform:pose(leaf,0),opacity:1,offset:0},
        {transform:pose(leaf,.04,.7,.3),opacity:1,offset:.22},
        {transform:pose(leaf,.53,1.1,.85),opacity:.96,offset:.65},
        {transform:pose(leaf,1),opacity:.42,offset:1}
      ];
      const options={duration:incoming?800:650,delay:incoming?150-leaf.delay*.7:leaf.delay,easing:'cubic-bezier(.22,.65,.2,1)',fill:'both'};
      const animation=tile.animate(frames,options);animations.push(animation);
      activeAnimations.push(animation,edge.animate([{opacity:0},{opacity:.85,offset:.4},{opacity:incoming?0:.7}],options));
    }
    return Promise.all(animations.map(a=>a.finished.catch(()=>{})));
  }
  async function stylesFor(doc) {
    await Promise.all([...doc.querySelectorAll('link[rel="stylesheet"]')].map(link=>{
      const href=new URL(link.getAttribute('href'),location.href).href;
      if([...document.querySelectorAll('link[rel="stylesheet"]')].some(old=>old.href===href)) return;
      return new Promise((resolve,reject)=>{const node=link.cloneNode();node.onload=resolve;node.onerror=reject;document.head.append(node);});
    }));
  }
  async function mount(doc,url,pop,position) {
    window.SKPage.dispose();
    for(const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
    if(!pop) history.pushState({skScroll:[0,0]},'',url.href);
    currentPath=url.pathname;
    const body=document.importNode(doc.body,true);
    body.querySelectorAll('script').forEach(node=>node.remove());
    body.inert=true;document.body.replaceWith(body);
    document.title=doc.title;root.lang=doc.documentElement.lang||'fi';
    for(const selector of ['meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]']) {
      const next=doc.querySelector(selector),current=document.querySelector(selector);if(next&&current) current.content=next.content;
    }
    document.querySelectorAll('script[data-route-module]').forEach(node=>node.remove());
    const scripts=[];
    for(const script of doc.querySelectorAll('script[src]')) {
      const src=script.getAttribute('src');
      if(/^(page-lifecycle|fractal-geometry|fractal-navigation)\.js/.test(src)) continue;
      const resource=new URL(src,url);
      if(resource.origin!==location.origin) throw new Error('Unexpected page script');
      scripts.push(new Promise((resolve,reject)=>{
        const node=document.createElement('script');node.src=resource.href;node.async=false;node.dataset.routeModule='true';node.onload=resolve;node.onerror=reject;document.head.append(node);
      }));
    }
    await Promise.all(scripts);
    let top=pop&&position?position[1]:0;
    root.dataset.fractalRestore = String(top);
    if(!pop&&url.hash){let target;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{}if(target) top=target.getBoundingClientRect().top+scrollY-105;}
    scrollTo({left:0,top,behavior:'instant'});
    await paint();
    const visibleImages=[...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&!img.complete;});
    await Promise.race([Promise.all(visibleImages.map(img=>img.decode().catch(()=>{}))),delay(250)]);
    document.querySelectorAll('.reveal').forEach(node=>{const r=node.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight) node.classList.add('in-view');});
  }
  async function navigate(url,{pop=false,position=null,origin=null}={}) {
    if(busy){queued={url,options:{pop,position,origin}};return;}
    busy=true;clearTimeout(scrollTimer);
    const started=performance.now();
    root.dataset.fractalFromScroll=String(scrollY);
    root.dataset.fractalNavigation='preparing';
    let view,watchdog;
    try {
      if(!pop) history.replaceState({...history.state,skScroll:[scrollX,scrollY]},'',location.href);
      for(const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
      const width=root.clientWidth,height=innerHeight;
      const seed=crypto.getRandomValues(new Uint32Array(1))[0];
      const geometry=window.SKFractalGeometry.create(width,height,seed,width<600?24:width<1000?36:52,origin||undefined);
      const shot=snapshot(width,height);
      const ready=getPage(url).then(async doc=>{await stylesFor(doc);return doc;});
      // Attach a rejection handler while the outgoing animation is in progress.
      ready.catch(()=>{});
      view=overlay(width,height,geometry);view.host.hidden=true;
      const outgoing=fragments(view,shot,geometry);
      view.host.dataset.seed=String(seed);view.host.dataset.pieces=String(geometry.length);
      root.classList.add('fractal-busy');document.body.inert=true;
      await paint();view.host.hidden=false;root.classList.add('fractal-covered');
      root.dataset.fractalPrepared=String(Math.round(performance.now()-started));
      root.dataset.fractalNavigation='disassembling';
      watchdog=setTimeout(()=>location.assign(url.href),7000);
      const wires=view.wires.animate([{opacity:0},{opacity:.7}],{duration:600,delay:150,fill:'forwards'});activeAnimations.push(wires);
      await animate(outgoing,false);
      root.dataset.fractalDeparted=String(Math.round(performance.now()-started));
      root.dataset.fractalNavigation='transforming';
      const doc=await ready;
      await mount(doc,url,pop,position);
      root.dataset.fractalMounted=String(Math.round(performance.now()-started));
      view.style.textContent=pageCSS()+internalCSS;
      const next=snapshot(width,height);
      const incoming=fragments(view,next,geometry);
      outgoing.group.remove();
      root.dataset.fractalNavigation='assembling';
      activeAnimations.push(view.wires.animate([{opacity:.7},{opacity:0}],{duration:650,delay:180,fill:'forwards'}));
      await animate(incoming,true);
      root.dataset.fractalLastSeed=String(seed);
      root.dataset.fractalLastPieces=String(geometry.length);
      root.dataset.fractalDuration=String(Math.round(performance.now()-started));
    } catch(error) {
      console.warn('Page transition fell back to regular navigation.',error);
      location.assign(url.href);
    } finally {
      clearTimeout(watchdog);
      root.classList.remove('fractal-covered','fractal-busy');
      document.body.inert=false;view?.host.remove();
      activeAnimations.forEach(a=>a.cancel());activeAnimations=[];
      root.dataset.fractalNavigation='idle';busy=false;
      document.querySelector('main')?.focus({preventScroll:true});
      document.dispatchEvent(new CustomEvent('sk:navigation-ready'));
      rememberScroll();
      if(queued){const next=queued;queued=null;navigate(next.url,next.options);}
    }
  }
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||reduced.matches) return;
    const url=routeFor(event.target.closest?.('a[href]'));
    if(!url||pathOf(url)===pathOf(new URL(location.href))) return;
    event.preventDefault();
    navigate(url,{origin:event.detail?{x:event.clientX,y:event.clientY}:null});
  });
  for(const type of ['pointerover','focusin']) document.addEventListener(type,event=>{
    if(reduced.matches||navigator.connection?.saveData)return;
    const url=routeFor(event.target.closest?.('a[href]'));if(url&&pathOf(url)!==pathOf(new URL(location.href))) getPage(url).catch(()=>{});
  },{passive:true});
  addEventListener('popstate',event=>{
    const url=new URL(location.href);
    if(pathOf(url)===pathOf(new URL(currentPath,location.origin))&&!busy){if(event.state?.skScroll)scrollTo({left:0,top:event.state.skScroll[1],behavior:'instant'});return;}
    if(reduced.matches){location.reload();return;}
    navigate(url,{pop:true,position:event.state?.skScroll});
  });
  reduced.addEventListener('change',()=>{if(reduced.matches)activeAnimations.forEach(a=>{try{a.finish();}catch{}});});
  addEventListener('resize',()=>{if(busy)activeAnimations.forEach(a=>{try{a.finish();}catch{}});},{passive:true});
  root.dataset.fractalNavigation='idle';
})();
