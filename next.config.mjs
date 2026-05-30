/** @type {import('next').NextConfig} */

// Legacy /quiz/<x> URLs are redirected at the server level (reliable, no
// render/loading-boundary edge cases). Two cases:
//   - category slug  → /tracks/<slug>
//   - language id     → /quiz/<category>/<id>
const TRACK_REDIRECTS = {
  // Frontend
  html: "frontend",
  css: "frontend",
  javascript: "frontend",
  typescript: "frontend",
  react: "frontend",
  nextjs: "frontend",
  // Backend
  php: "backend",
  laravel: "backend",
  nodejs: "backend",
  express: "backend",
  sql: "backend",
  "rest-api": "backend",
  authentication: "backend",
};

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/quiz/frontend", destination: "/tracks/frontend", permanent: true },
      { source: "/quiz/backend", destination: "/tracks/backend", permanent: true },
      ...Object.entries(TRACK_REDIRECTS).map(([id, category]) => ({
        source: `/quiz/${id}`,
        destination: `/quiz/${category}/${id}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
