// Inline scripts that run in <head> before first paint. Kept in a plain
// (server-safe) module: exporting them from a "use client" file turns them
// into client references and the script body is lost.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

// Decides whether the opening loader runs (once per session, never with
// reduced motion). See components/motion/Loader.tsx.
export const loaderInitScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('fx-loaded')){d.setAttribute('data-loader','skip')}else{d.setAttribute('data-loader','run')}}catch(e){}})();`;
