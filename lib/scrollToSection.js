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

export function scrollToTarget(targetId, behavior = "smooth") {
  const landingTop = getTargetScrollTop(targetId);
  if (landingTop === null) return false;
  window.scrollTo({ top: landingTop, behavior });
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
