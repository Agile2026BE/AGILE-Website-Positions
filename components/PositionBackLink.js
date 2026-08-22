"use client";

import { useEffect, useState } from "react";

// The position detail pages are statically generated, so they have no way to
// know at build time where a visitor came from. This progressively upgrades
// the default "Back to Positions" link on the client once we can read the
// "from" marker a referring page attached to the URL (see HomeResourcesAccordion,
// which tags its Featured Positions links this way) — so someone who opened a
// position from the homepage's Explore Resources panel lands back there
// instead of the full careers search.
const SOURCES = {
  "home-featured": { label: "Back to Featured Positions", href: "/#explore-resources-featured" },
};

const DEFAULT_SOURCE = { label: "Back to Positions", href: "/careers/#positions" };

export default function PositionBackLink({ className }) {
  const [source, setSource] = useState(DEFAULT_SOURCE);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from && SOURCES[from]) setSource(SOURCES[from]);
  }, []);

  return (
    <a className={className} href={source.href}>
      ← {source.label}
    </a>
  );
}
