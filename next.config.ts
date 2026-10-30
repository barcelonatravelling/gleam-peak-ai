import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (Spanish and /en), so unmatched URLs need a page of their own.
    globalNotFound: true,
  },
  async headers() {
    // Basic browser protections for every page: no framing by other sites, no MIME sniffing,
    // only the origin sent as referrer to other sites, and no camera, microphone or location.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // The previous site switched language with ?lang=en on the same URL.
    return [
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "en" }],
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
