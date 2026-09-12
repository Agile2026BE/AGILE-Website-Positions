/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/positions", destination: "/careers", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/s/:id", destination: "/p/:id#similar-positions", permanent: false },
    ];
  },
};

export default nextConfig;
