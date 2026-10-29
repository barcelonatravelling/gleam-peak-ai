import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (Spanish and /en), so unmatched URLs need a page of their own.
    globalNotFound: true,
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
