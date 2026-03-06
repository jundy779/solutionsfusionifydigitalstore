import { useState, useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { SplashScreen } from "./components/layout/SplashScreen";
import App from "./App.tsx";
import "./index.css";

// Anti-devtools deterrent (production only)
if (import.meta.env.PROD) {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Block common devtools keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") { e.preventDefault(); return; }
    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") { e.preventDefault(); return; }
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") { e.preventDefault(); return; }
    // Ctrl+Shift+C / Cmd+Option+C (Element picker)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") { e.preventDefault(); return; }
    // Ctrl+U / Cmd+U (View source)
    if ((e.ctrlKey || e.metaKey) && e.key === "u") { e.preventDefault(); return; }
  });

  // Console warning
  console.log(
    "%c⚠ STOP!",
    "color: #FF3B30; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
  );
  console.log(
    "%cThis browser feature is intended for developers. If someone told you to copy-paste something here, it is a scam and will give them access to your account.",
    "color: #FF9500; font-size: 16px;"
  );
  console.log(
    "%c© Fusionify Digital Solutions — Unauthorized access is prohibited.",
    "color: #8E8E93; font-size: 12px;"
  );
}

const Root = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <App />
    </>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
