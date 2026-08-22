// Shared same-page anchor scrolling used by SiteHeader and any in-page CTA
// buttons (e.g. the "Explore Positions" button inside HeroSection). Keeping
// this logic in one place means every button that links to a hash on the
// current page lands using the same header-height-aware offset math instead
// of relying on the browser's native (and less reliable) anchor jump.

export function getTargetId(href) {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
}

// Pure calculation of the correct scroll position for a given target — no
// side effects. Used both to actually scroll (scrollToTarget) and to check
// whether the page is CURRENTLY sitting at the correct position (the
// settle-polling logic in SiteHeader.js). Keeping this as one shared
// function means the "is this correct?" check can never disagree with the
// "make this correct" action.
export function getTargetScrollTop(targetId) {
  if (targetId === "top") return 0;

  const target = document.getElementById(targetId);
  if (!target) return null;

  // The contact section (and any other section) defines its own
  // scroll-margin-top in its CSS module, tuned to clear the sticky header
  // with room for the heading to be fully visible. Read that computed
  // value directly instead of hardcoding it here, so this always agrees
  // with whatever the CSS actually says.
  if (targetId === "contact") {
    const computed = window.getComputedStyle(target).scrollMarginTop;
    const scrollMarginTop = parseFloat(computed) || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, targetTop - scrollMarginTop);
  }

  const header = document.querySelector(".site-header");
  const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const marketInsightsAdjustment = targetId === "market-insights" ? 33 : 0;
  const reviewsAdjustment = targetId === "reviews" ? -128 : 0;
  return Math.max(0, targetTop - headerHeight - 8 + marketInsightsAdjustment + reviewsAdjustment);
}

// app/globals.css sets `html{scroll-behavior:smooth}` site-wide. Per spec,
// window.scrollTo({behavior:"auto"}) does NOT mean "instant" when the
// scrolling box has scroll-behavior:smooth in CSS — "auto" explicitly
// defers to that CSS value, so it becomes a smooth (animated) scroll too.
// That was silently turning every "instant correction" in this file and in
// SiteHeader.js's settle-polling into an animated one, which could overlap
// with the browser's OWN native smooth-scroll-into-view (fired the instant
// an <a href="#..."> is clicked) — two competing animations racing for the
// final resting position. This forces a true, immediate jump by toggling
// scroll-behavior off on the root element for the instant this one scroll
// happens, then restoring whatever it was.
function scrollToInstant(top) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previous;
  });
}

export function scrollToTarget(targetId, behavior = "smooth") {
  const landingTop = getTargetScrollTop(targetId);
  if (landingTop === null) return false;
  if (behavior === "auto") {
    scrollToInstant(landingTop);
  } else {
    window.scrollTo({ top: landingTop, behavior });
  }
  return true;
}

// Wire an <a href="/careers/#positions"> style button so that when the
// visitor is ALREADY on the page the link points to, the click is handled
// with scrollToTarget() instead of a native anchor jump / full navigation.
// If the visitor is somewhere else (e.g. the homepage), this does nothing
// and the link behaves normally (a real page navigation to /careers).
export function handleSamePageNav(event, href, onPath) {
  const url = new URL(href, window.location.href);
  const sameSite = window.location.hostname === url.hostname;
  const onTargetPage = window.location.pathname === onPath;
  const targetId = getTargetId(href);

  if (!sameSite || !onTargetPage || !targetId) return;

  event.preventDefault();
  const nextHash = `#${targetId}`;
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, "", nextHash);
  }
  scrollToTarget(targetId);
}
