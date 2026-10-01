/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/positions", destination: "/careers", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/s/:id", destination: "/p/:id#similar-positions", permanent: false },

      // Google Search Console "Not found (404)" cleanup (2026-10-01) — these IDs are
      // live positions, but Google has old slugs indexed from before the listing
      // content was rewritten. Redirecting preserves inbound links/search equity
      // and gives Google a clean 301 instead of a 404.
      { source: "/careers/positions/1178-civil-transportation-engineer-rancho-cordova", destination: "/careers/positions/1178-water-wastewater-project-manager-co", permanent: true },
      { source: "/careers/positions/1154-mechanical-engineer", destination: "/careers/positions/1154-senior-bim-design-specialist-voorhees-nj", permanent: true },
      { source: "/careers/positions/1175-senior-highway-civil-engineer-denver", destination: "/careers/positions/1175-transportation-project-manager-co", permanent: true },
      { source: "/careers/positions/1174-senior-transportation-project-manager-denver", destination: "/careers/positions/1174-senior-transportation-project-manager-ca", permanent: true },
      { source: "/careers/positions/1173-water-wastewater-project-engineer-denver", destination: "/careers/positions/1173-water-wastewater-senior-project-engineer-denver", permanent: true },
      { source: "/careers/positions/1157-senior-electrical-engineer", destination: "/careers/positions/1157-senior-mechanical-engineer-project-manager-nyc", permanent: true },
      { source: "/careers/positions/1160-mechanical-project-engineer", destination: "/careers/positions/1160-structural-engineer-clarks-summit-pa", permanent: true },
      { source: "/careers/positions/1153-electrical-engineer", destination: "/careers/positions/1153-electrical-engineer-ii-voorhees-nj", permanent: true },
      { source: "/careers/positions/1169-electrical-engineer-healthcare", destination: "/careers/positions/1169-water-wastewater-project-engineer-denver-co", permanent: true },
      { source: "/careers/positions/1176-senior-bridge-structures-project-engineer-denver", destination: "/careers/positions/1176-senior-structures-project-engineer-bridge-ca", permanent: true },
      { source: "/careers/positions/1179-civil-engineering-project-manager-north-carolina", destination: "/careers/positions/1179-senior-civil-cad-designer-co", permanent: true },
      { source: "/careers/positions/1171-mep-engineering-director", destination: "/careers/positions/1171-site-civil-project-manager-charlotte-nc", permanent: true },
      { source: "/careers/positions/1156-lead-mechanical-designer", destination: "/careers/positions/1156-senior-mechanical-engineer-voorhees-nj", permanent: true },
      { source: "/careers/positions/1158-senior-mechanical-engineer", destination: "/careers/positions/1158-senior-engineering-project-manager", permanent: true },
      { source: "/careers/positions/1180-site-civil-engineer-north-carolina", destination: "/careers/positions/1180-civil-engineer-project-manager-raleigh-nc", permanent: true },
      { source: "/careers/positions/1155-senior-mechanical-designer", destination: "/careers/positions/1155-senior-electrical-engineer-voorhees-nj", permanent: true },
      { source: "/careers/positions/1177-site-civil-engineer-project-manager-denver", destination: "/careers/positions/1177-land-development-project-manager-co", permanent: true },
      { source: "/careers/positions/1172-principal-mep-engineering", destination: "/careers/positions/1172-senior-project-engineer-plumbing-fire-protection-madison-nj", permanent: true },
      { source: "/careers/positions/1159-electrical-project-engineer", destination: "/careers/positions/1159-electrical-engineer", permanent: true },
    ];
  },
};

export default nextConfig;
