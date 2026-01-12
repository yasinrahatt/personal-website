import Link from "next/link";
import { categoryMetadata, getAllPosts } from "../lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-300 dark:text-ink-500">Personal website</p>
        <h1 className="text-4xl font-semibold text-ink-900 dark:text-white sm:text-5xl">Yasin Rahat</h1>
        <p className="text-xl text-ink-500 dark:text-ink-300">Founder, traveler, and builder.</p>
        <p className="max-w-2xl text-lg leading-7 text-ink-500 dark:text-ink-300">
          I write about building products, traveling with curiosity, and the ideas shaping my work. This is a home
          for lessons learned and notes I want to remember.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-white">Start here</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(categoryMetadata).map(([slug, category]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="rounded-xl border border-ink-300 p-5 transition hover:border-ink-500 dark:border-ink-700"
            >
              <h3 className="text-xl font-semibold text-ink-900 dark:text-white">{category.title}</h3>
              <p className="mt-2 text-ink-500 dark:text-ink-300">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-white">Latest posts</h2>
        <div className="space-y-6">
          {latestPosts.map((post) => (
            <article key={post.slug} className="space-y-2">
              <p className="text-sm text-ink-500 dark:text-ink-300">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
                <span className="mx-2">•</span>
                {post.readingTime}
              </p>
              <Link
                href={`/${post.category}/${post.slug}`}
                className="text-2xl font-semibold text-ink-900 transition hover:text-ink-500 dark:text-white"
              >
                {post.title}
              </Link>
              <p className="text-ink-500 dark:text-ink-300">{post.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink-300 pt-8 text-sm text-ink-500 dark:border-ink-700 dark:text-ink-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="mailto:hello@example.com" className="hover:text-ink-900 dark:hover:text-white">
            hello@example.com
          </a>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink-900 dark:hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="hover:text-ink-900 dark:hover:text-white">
              X
            </a>
            <a href="#" className="hover:text-ink-900 dark:hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
