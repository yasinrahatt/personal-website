import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryMetadata, getAdjacentPosts, getCategorySlugs, getPostBySlug, getPostsByCategory, type Category } from "../../../lib/posts";

export async function generateStaticParams() {
  const params = await Promise.all(
    getCategorySlugs().map(async (category) => {
      const posts = await getPostsByCategory(category);
      return posts.map((post) => ({ category, slug: post.slug }));
    })
  );

  return params.flat();
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const category = params.category as Category;
  const post = await getPostBySlug(category, params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article"
    }
  };
}

export default async function PostPage({ params }: { params: { category: string; slug: string } }) {
  const category = params.category as Category;
  const meta = categoryMetadata[category];
  if (!meta) {
    notFound();
  }

  const post = await getPostBySlug(category, params.slug);
  if (!post) {
    notFound();
  }

  const posts = await getPostsByCategory(category);
  const { previous, next } = getAdjacentPosts(posts, post.slug);

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Link href={`/${category}`} className="text-sm text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white">
          ← Back to {meta.title}
        </Link>
        <h1 className="text-4xl font-semibold text-ink-900 dark:text-white">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500 dark:text-ink-300">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span className="rounded-full border border-ink-300 px-3 py-1 text-xs uppercase tracking-wide dark:border-ink-700">
            {meta.title}
          </span>
        </div>
      </header>

      <div className="prose-content space-y-6 text-lg text-ink-700 dark:text-ink-300" dangerouslySetInnerHTML={{ __html: post.content }} />

      <nav className="flex flex-col justify-between gap-6 border-t border-ink-300 pt-8 text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300 sm:flex-row">
        {previous ? (
          <Link href={`/${category}/${previous.slug}`} className="hover:text-ink-900 dark:hover:text-white">
            ← Previous: {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/${category}/${next.slug}`} className="hover:text-ink-900 dark:hover:text-white">
            Next: {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
