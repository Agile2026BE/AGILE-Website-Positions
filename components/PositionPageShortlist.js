"use client";

import { useEffect, useState } from "react";
import ShortlistButton from "./ShortlistButton";

// Must match the key/limit used by JobBoard.js exactly — this button reads
// and writes the SAME localStorage list the browsing grid uses, so a
// position shortlisted from a shared/emailed link shows up already
// shortlisted when that person later browses the full grid, and vice versa.
const SAVED_POSITIONS_KEY = "agile-saved-positions";
const MAX_SHORTLISTED_JOBS = 3;

export default function PositionPageShortlist({ job }) {
  const key = String(job?.id ?? job?.slug ?? "");
  const [ready, setReady] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    if (!key) return undefined;
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(SAVED_POSITIONS_KEY) || "[]");
        setIsShortlisted(Array.isArray(saved) && saved.map(String).includes(key));
      } catch {
        setIsShortlisted(false);
      } finally {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [key]);

  function toggle() {
    if (!key) return;
    try {
      const saved = JSON.parse(window.localStorage.getItem(SAVED_POSITIONS_KEY) || "[]");
      const list = Array.isArray(saved) ? saved.map(String) : [];
      const exists = list.includes(key);
      let next;
      if (exists) {
        next = list.filter((item) => item !== key);
      } else {
        if (list.length >= MAX_SHORTLISTED_JOBS) {
          window.alert("3/3 positions selected. Please remove one from your shortlist to add another.");
          return;
        }
        next = [...list, key];
      }
      window.localStorage.setItem(SAVED_POSITIONS_KEY, JSON.stringify(next));
      setIsShortlisted(!exists);
    } catch {
      // localStorage unavailable (private browsing, etc.) — button just won't persist.
    }
  }

  if (!ready) return <span aria-hidden="true" />;
  return <ShortlistButton isShortlisted={isShortlisted} onClick={toggle} />;
}
