import { getAllPosts } from "../../lib/posts";

const siteUrl = "https://example.com";

function escapeXml(input: string) {
  return input.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return char;
    }
  });
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/${post.category}/${post.slug}`;
      return `\n      <item>\n        <title>${escapeXml(post.title)}</title>\n        <link>${url}</link>\n        <guid>${url}</guid>\n        <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n        <description>${escapeXml(post.summary)}</description>\n      </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n  <rss version="2.0">\n    <channel>\n      <title>Yasin Rahat</title>\n      <link>${siteUrl}</link>\n      <description>Founder, traveler, and builder.</description>\n      ${items}\n    </channel>\n  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
}
