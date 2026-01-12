import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CategoryPostList from "../../components/CategoryPostList";
import { categoryMetadata, getCategorySlugs, getPostsByCategory, type Category } from "../../lib/posts";

export async function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category as Category;
  const meta = categoryMetadata[category];
  if (!meta) {
    return {};
  }
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description
    }
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as Category;
  const meta = categoryMetadata[category];
  if (!meta) {
    notFound();
  }

  const posts = await getPostsByCategory(category);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-300 dark:text-ink-500">Category</p>
        <h1 className="text-3xl font-semibold text-ink-900 dark:text-white">{meta.title}</h1>
        <p className="text-lg text-ink-500 dark:text-ink-300">{meta.description}</p>
      </header>

      <CategoryPostList posts={posts} />
    </div>
  );
}
