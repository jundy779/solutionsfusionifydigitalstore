import { useState, useCallback, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Lazy load SplashScreen to reduce initial bundle
const SplashScreen = lazy(() => import("./components/layout/SplashScreen").then(m => ({ default: m.SplashScreen })));

// Anti-devtools deterrent (production only)
if (import.meta.env.PROD) {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12") { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === "u") { e.preventDefault(); return; }
  });

  console.log("%c⚠ STOP!", "color: #FF3B30; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
  console.log("%cThis browser feature is intended for developers. If someone told you to copy-paste something here, it is a scam.", "color: #FF9500; font-size: 16px;");
  console.log("%c© Fusionify Digital Solutions — Unauthorized access is prohibited.", "color: #8E8E93; font-size: 12px;");
}

// Minimal loading placeholder while SplashScreen loads
const SplashFallback = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center z-[9999]">
    <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleComplete = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && (
        <Suspense fallback={<SplashFallback />}>
          <SplashScreen onComplete={handleComplete} />
        </Suspense>
      )}
      <App />
    </>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
