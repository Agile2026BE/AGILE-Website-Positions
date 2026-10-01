// Short share links (/p/:id, and /s/:id which redirects here) for filled,
// dormant, or retired positions show the same "Opportunity Has Been Filled"
// page as full position URLs. Single source of truth: the careers not-found.
export { default } from "../../careers/positions/[slug]/not-found";
