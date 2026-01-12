"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "../lib/posts";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" }
] as const;

type SortOrder = (typeof sortOptions)[number]["value"];

export default function CategoryPostList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const byQuery = normalized
      ? posts.filter(
          (post) =>
            post.title.toLowerCase().includes(normalized) ||
            post.summary.toLowerCase().includes(normalized)
        )
      : posts;
    const sorted = [...byQuery].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [posts, query, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full flex-col text-sm text-ink-500 dark:text-ink-300">
          Search
          <input
            type="text"
            placeholder="Search posts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 w-full rounded-lg border border-ink-300 bg-transparent px-3 py-2 text-base text-ink-900 placeholder:text-ink-300 focus:border-ink-500 focus:outline-none dark:text-white dark:placeholder:text-ink-500"
          />
        </label>
        <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
          <span>Sort</span>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            className="rounded-lg border border-ink-300 bg-transparent px-3 py-2 text-base text-ink-900 focus:border-ink-500 focus:outline-none dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <p className="text-ink-500 dark:text-ink-300">No posts match your search.</p>
        ) : (
          filtered.map((post) => (
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
          ))
        )}
      </div>
    </div>
  );
}
