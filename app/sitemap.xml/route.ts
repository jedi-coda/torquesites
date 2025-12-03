import { getAllGarageSlugs } from "@/lib/garage";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const slugs = getAllGarageSlugs();
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
    },
    {
      url: `${baseUrl}/partnership`,
      lastModified,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
    },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified,
    })),
  ];
}


