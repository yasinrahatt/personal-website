import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-4xl font-semibold text-ink-900 dark:text-white">Page not found</h1>
      <p className="text-ink-500 dark:text-ink-300">The page you are looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-sm text-ink-500 underline hover:text-ink-900 dark:text-ink-300 dark:hover:text-white">
        Go back home
      </Link>
    </div>
  );
}
