/* Each page owns its listeners, timers and observers, including after navigation. */
(() => {
  'use strict';
  if (window.SKPage) return;
  const scopes = new Set();
  function register(name, init) {
    const abort = new AbortController();
    const timers = new Set(), intervals = new Set(), frames = new Set(), observers = new Set();
    const cleanup = [];
    const scope = {
      name, signal: abort.signal,
      timeout(fn, ms) { const id = window.setTimeout(() => { timers.delete(id); if (!abort.signal.aborted) fn(); }, ms); timers.add(id); return id; },
      interval(fn, ms) { const id = window.setInterval(() => { if (!abort.signal.aborted) fn(); }, ms); intervals.add(id); return id; },
      frame(fn) { if (abort.signal.aborted) return 0; const id = window.requestAnimationFrame(t => { frames.delete(id); if (!abort.signal.aborted) fn(t); }); frames.add(id); return id; },
      observer(Type) { return Type && class extends Type { constructor(...args) { super(...args); observers.add(this); } }; },
      cleanup(fn) { cleanup.push(fn); },
      dispose() {
        abort.abort(); timers.forEach(clearTimeout); intervals.forEach(clearInterval);
        frames.forEach(cancelAnimationFrame); observers.forEach(o => o.disconnect());
        cleanup.forEach(fn => { try { fn(); } catch {} }); scopes.delete(scope);
      }
    };
    // Registration is synchronous. Dynamic DOM-only listeners leave with their nodes.
    const original = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      const config = typeof options === 'boolean' ? { capture: options } : { ...options };
      config.signal ??= abort.signal;
      return original.call(this, type, listener, config);
    };
    scopes.add(scope);
    try { init(scope); }
    catch (error) { scope.dispose(); throw error; }
    finally { EventTarget.prototype.addEventListener = original; }
  }
  window.SKPage = {
    register,
    dispose() {
      [...scopes].forEach(s => s.dispose());
      delete document.documentElement.dataset.securityScroll;
      document.documentElement.classList.remove('motion-ready');
      for (const key of ['skNotify', 'skOpenDialog', 'skRevealEmail', 'skRevealPhone']) delete window[key];
    }
  };
})();
