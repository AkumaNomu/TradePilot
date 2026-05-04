"use client";

import { useEffect } from "react";

function getTargetFromHash(hash: string) {
  if (!hash) return null;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return null;
  return document.getElementById(id);
}

export function ScrollManager() {
  useEffect(() => {
    function scrollToElement(el: HTMLElement, hash?: string) {
      const headerOffset = 88; // fixed navbar height + breathing room
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top - headerOffset;

      if (hash) window.history.pushState(null, "", hash);
      window.scrollTo({ top, behavior: "smooth" });
    }

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^=\"#\"]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = getTargetFromHash(href);
      if (!el) return;

      event.preventDefault();
      scrollToElement(el, href);
    }

    function onHashChange() {
      const el = getTargetFromHash(window.location.hash);
      if (!el) return;
      scrollToElement(el);
    }

    // Capture phase avoids the browser's default jump winning the race.
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("hashchange", onHashChange);

    // If the page loads with a hash, smooth scroll to it after mount.
    onHashChange();

    return () => {
      document.removeEventListener("click", onClick, { capture: true } as any);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
