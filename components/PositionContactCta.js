"use client";

// This position detail page's own "Start a Conversation" button used to be
// a bare <a href="#contact">. Clicking it let the browser run its own
// native same-page anchor scroll (which honors both the page's global
// scroll-padding-top AND the contact section's scroll-margin-top) at the
// exact same time our own SiteHeader correction logic was also trying to
// scroll to the same place — two competing scrolls racing for the final
// resting position, which is what was landing this specific button short.
// Routing the click through the same scrollToTarget() used everywhere else
// on the site removes the native scroll from the picture entirely, so
// there's only ever one thing moving the page.
import { handleSamePageNav } from "../lib/scrollToSection";

export default function PositionContactCta({ className }) {
  return (
    <a
      className={className}
      href="#contact"
      onClick={(event) => handleSamePageNav(event, "#contact", window.location.pathname)}
    >
      Start a Conversation
    </a>
  );
}
