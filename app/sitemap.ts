import type { MetadataRoute } from "next";
import { getAllPosts, getCategorySlugs } from "../lib/posts";

const siteUrl = "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = getCategorySlugs();

  const categoryEntries = categories.map((category) => ({
    url: `${siteUrl}/${category}`,
    lastModified: new Date()
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    ...categoryEntries,
    ...postEntries
  ];
}
