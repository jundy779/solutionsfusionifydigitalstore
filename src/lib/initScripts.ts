// Inline scripts that run in <head> before first paint. Kept in a plain
// (server-safe) module: exporting them from a "use client" file turns them
// into client references and the script body is lost.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

// Decides whether the opening loader runs (once per session, never with
// reduced motion) and also ends it. The timer lives here, not in React, so the
// curtain lifts ~1.65s after the HTML arrives instead of after hydration: on
// slow phones the page used to stay locked (body overflow hidden) for 4 to 9s,
// and forever if the JavaScript failed. See components/motion/Loader.tsx.
export const loaderInitScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('fx-loaded')){d.setAttribute('data-loader','skip')}else{d.setAttribute('data-loader','run');setTimeout(function(){if(d.getAttribute('data-loader')==='run'){d.setAttribute('data-loader','done');try{sessionStorage.setItem('fx-loaded','1')}catch(e){}}},1650)}}catch(e){}})();`;
