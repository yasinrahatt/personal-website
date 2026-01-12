import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: {
    default: "Yasin Rahat",
    template: "%s | Yasin Rahat"
  },
  description: "Founder, traveler, and builder. Essays and notes by Yasin Rahat.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Yasin Rahat",
    description: "Founder, traveler, and builder. Essays and notes by Yasin Rahat.",
    type: "website"
  }
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/founder-story", label: "Founder Story" },
  { href: "/travel", label: "Travel" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/academic", label: "Academic Works" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <header className="sticky top-0 z-10 border-b border-ink-300 bg-white/80 backdrop-blur dark:border-ink-700 dark:bg-ink-900/80">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <nav className="flex flex-wrap items-center gap-4 text-sm text-ink-500 dark:text-ink-300">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-ink-900 dark:hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 pb-20 pt-12">{children}</main>
      </body>
    </html>
  );
}
