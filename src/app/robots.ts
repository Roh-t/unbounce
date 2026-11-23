import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://unbounce-ai.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features", "/templates", "/pricing", "/p/"],
        disallow: ["/dashboard/", "/editor/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
