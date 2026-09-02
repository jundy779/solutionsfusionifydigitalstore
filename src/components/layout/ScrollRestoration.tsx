import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export const ScrollRestoration = () => {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Skip auto scroll-to-top when returning to the homepage via a hash nav
    // click; Navbar handles that scroll target itself.
    if (navigationType === "PUSH" && state && typeof state === "object" && "scrollTo" in state) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, navigationType, state]);

  return null;
};
