import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { dictionaries } from "@/i18n/dictionaries";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found — seanchoi.space",
};

export default function GlobalNotFound() {
  const en = dictionaries.en;
  const ko = dictionaries.ko;

  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          {en.skipToContent}
        </a>
        <main
          id="main-content"
          className="mx-auto max-w-[var(--max-width-shell)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="max-w-[var(--max-width-prose)] space-y-12">
            <section className="space-y-4">
              <h1 className="text-heading-1 font-semibold leading-tight tracking-display">
                {en.notFoundTitle}
              </h1>
              <p className="text-body leading-relaxed text-muted">
                {en.notFoundBody}
              </p>
            </section>

            <section
              lang="ko"
              className="space-y-4 border-t border-line pt-8"
            >
              <h2 className="text-heading-2 font-semibold leading-tight">
                {ko.notFoundTitle}
              </h2>
              <p className="text-body leading-relaxed text-muted">
                {ko.notFoundBody}
              </p>
            </section>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center text-small font-medium text-accent underline underline-offset-4 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                {en.backHome} / {ko.backHome}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
