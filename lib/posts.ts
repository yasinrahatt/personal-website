import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Category = "founder-story" | "travel" | "thoughts" | "academic";

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: Category;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};

const contentRoot = path.join(process.cwd(), "content");

export const categoryMetadata: Record<Category, { title: string; description: string }> = {
  "founder-story": {
    title: "Founder Story",
    description: "Lessons learned while building products and teams."
  },
  travel: {
    title: "Travel",
    description: "Moments and notes from the road."
  },
  thoughts: {
    title: "Thoughts",
    description: "Ideas on product, craft, and life."
  },
  academic: {
    title: "Academic Works",
    description: "Research notes and academic reflections."
  }
};

export const categories = Object.keys(categoryMetadata) as Category[];

const wordsPerMinute = 200;

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

function getMarkdownFiles(category: Category): string[] {
  const directory = path.join(contentRoot, category);
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory).filter((file) => file.endsWith(".md"));
}

export async function getPostBySlug(category: Category, slug: string): Promise<Post | null> {
  const filePath = path.join(contentRoot, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    content: contentHtml,
    readingTime: calculateReadingTime(content)
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    categories.flatMap(async (category) => {
      const files = getMarkdownFiles(category);
      return Promise.all(
        files.map(async (file) => {
          const slug = file.replace(/\.md$/, "");
          return getPostBySlug(category, slug);
        })
      );
    })
  );

  return posts
    .flat()
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostsByCategory(category: Category): Promise<Post[]> {
  const files = getMarkdownFiles(category);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      return getPostBySlug(category, slug);
    })
  );

  return posts
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCategorySlugs(): Category[] {
  return categories;
}

export function getAdjacentPosts(posts: Post[], slug: string): { previous: Post | null; next: Post | null } {
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  };
}
