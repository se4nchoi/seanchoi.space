import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    globalNotFound: true,
  },
  // Preview deployments (dev.seanchoi.space) must never be indexed.
  async headers() {
    if (process.env.VERCEL_ENV !== "preview") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  // v1 served its work history at /work; keep old links working.
  async redirects() {
    return [
      { source: "/work", destination: "/experience", permanent: true },
      { source: "/ko/work", destination: "/ko/experience", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
