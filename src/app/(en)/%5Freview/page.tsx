import React from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { Tag } from "@/components/ui/tag";
import { ExternalLink } from "@/components/ui/external-link";
import { EvidenceCard } from "@/components/ui/evidence-card";
import { ExperienceEntry } from "@/components/ui/experience-entry";
import { ProjectCard } from "@/components/ui/project-card";
import { ArticleCard } from "@/components/ui/article-card";
import { Figure } from "@/components/ui/figure";
import { Prose } from "@/components/ui/prose";
import { dictionaries } from "@/i18n/dictionaries";
import { isSkeletonPreviewEnabled } from "@/lib/skeleton-preview";

export default function ComponentReviewPage() {
  if (!isSkeletonPreviewEnabled()) {
    notFound();
  }

  const enDict = dictionaries.en;
  const koDict = dictionaries.ko;

  return (
    <Container size="default" className="space-y-16 pb-16">
      <PageIntro
        eyebrow="Preview & Development Only"
        title="Component & Token Review"
        summary="This page reviews the visual design grammar, semantic tokens, and presentation components with synthetic-only test fixtures."
      />

      {/* 1. Semantic Color Tokens */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          1. Semantic Color Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded border border-[var(--border)] p-4 bg-[var(--background)]">
            <span className="text-xs font-mono text-[var(--muted)]">--background</span>
          </div>
          <div className="rounded border border-[var(--border)] p-4 bg-[var(--surface)]">
            <span className="text-xs font-mono text-[var(--foreground)]">--surface</span>
          </div>
          <div className="rounded border border-[var(--border)] p-4 bg-[var(--surface)] text-[var(--muted)]">
            <span className="text-xs font-mono">--muted</span>
          </div>
          <div className="rounded border border-[var(--border)] p-4 bg-[var(--accent)] text-[var(--accent-foreground)]">
            <span className="text-xs font-mono">--accent</span>
          </div>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          2. Typography Scale
        </h2>
        <div className="space-y-4 rounded border border-[var(--border)] bg-[var(--surface)] p-6">
          <div>
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-display</span>
            <p className="text-[length:var(--text-display)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
              Display Scale Sample
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-heading-1</span>
            <p className="text-[length:var(--text-heading-1)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
              Heading 1 Sample
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-heading-2</span>
            <p className="text-[length:var(--text-heading-2)] font-semibold leading-[var(--leading-tight)]">
              Heading 2 Sample
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-heading-3</span>
            <p className="text-[length:var(--text-heading-3)] font-semibold leading-[var(--leading-tight)]">
              Heading 3 Sample
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-body</span>
            <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)]">
              Body text sample constrained by reading measure and line height tokens.
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-small</span>
            <p className="text-[length:var(--text-small)] text-[var(--muted)]">
              Small caption or metadata text token.
            </p>
          </div>
          <div className="border-t border-[var(--border)] pt-4">
            <span className="text-xs font-mono text-[var(--muted)] block mb-1">--text-code</span>
            <p className="font-mono text-[length:var(--text-code)] text-[var(--foreground)]">
              const sampleToken = &quot;--text-code&quot;;
            </p>
          </div>
        </div>
      </section>

      {/* 3. Spacing Scale */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          3. Spacing Scale
        </h2>
        <div className="flex flex-wrap items-end gap-3 rounded border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-1)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">1 (0.25rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-2)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">2 (0.5rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-3)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">3 (0.75rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-4)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">4 (1rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-6)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">6 (1.5rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-8)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">8 (2rem)</span>
          </div>
          <div className="text-center">
            <div className="h-16 w-[var(--spacing-12)] bg-[var(--accent)] mx-auto rounded-sm" />
            <span className="mt-2 block text-xs font-mono text-[var(--muted)]">12 (3rem)</span>
          </div>
        </div>
      </section>

      {/* 4. Borders & Radii */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          4. Borders &amp; Radii
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-4 text-center text-xs font-mono">
            --radius-sm (0.25rem)
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 text-center text-xs font-mono">
            --radius-md (0.5rem)
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 text-center text-xs font-mono">
            --radius-lg (0.75rem)
          </div>
        </div>
      </section>

      {/* 5. Focus-Visible & Interactive Target Size */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          5. Focus-Visible &amp; Interaction Target Size
        </h2>
        <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
          <p className="text-sm text-[var(--muted)]">
            Every interactive element provides at least 44px touch/click target height and a high-contrast 2px focus ring:
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              className="min-h-[44px] px-4 rounded border border-[var(--border)] bg-[var(--background)] text-sm font-medium hover:border-[var(--accent)] transition-colors"
            >
              Focusable Button (44px target)
            </button>
            <a
              href="#focus-target"
              className="min-h-[44px] inline-flex items-center px-4 rounded border border-[var(--accent)] text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
            >
              Focusable Link (44px target)
            </a>
          </div>
        </div>
      </section>

      {/* 6. Motion Policy */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          6. Animation &amp; Reduced Motion Policy
        </h2>
        <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)] leading-relaxed space-y-2">
          <p>
            Transitions are restrained to fast (140ms) and base (220ms) color/border states.
          </p>
          <p>
            When <code>prefers-reduced-motion: reduce</code> is requested by the operating system, all nonessential animation and transition durations are set to 0.01ms immediately.
          </p>
        </div>
      </section>

      {/* 7. Bilingual Dictionary Samples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          7. Bilingual Dictionary Side-by-Side
        </h2>
        <div className="overflow-x-auto rounded border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--background)] font-mono text-[var(--muted)]">
              <tr>
                <th className="p-3">Key</th>
                <th className="p-3">English (en)</th>
                <th className="p-3">Korean (ko)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {(Object.keys(enDict) as (keyof typeof enDict)[])
                .filter((key) => typeof enDict[key] === "string")
                .map((key) => (
                  <tr key={key}>
                    <td className="p-3 font-mono text-[var(--muted)]">{key}</td>
                    <td className="p-3">{enDict[key] as string}</td>
                    <td className="p-3">{koDict[key] as string}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Presentation Primitives */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2 text-[var(--foreground)]">
          8. Presentation Primitives (Synthetic Samples)
        </h2>

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Tag variant="default">Default Tag</Tag>
            <Tag variant="accent">Accent Tag</Tag>
            <Tag variant="muted">Muted Tag</Tag>
          </div>
        </div>

        {/* External Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">External Link</h3>
          <p className="text-sm">
            Inspect the repository on{" "}
            <ExternalLink href="https://example.com/repo">Example Source Code</ExternalLink> safely.
          </p>
        </div>

        {/* Evidence Card */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Evidence Card</h3>
          <EvidenceCard
            label="Example Verification Artifact"
            level="project"
            sourceKind="repository"
            url="https://example.com/repo"
          />
        </div>

        {/* Experience Entry */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Experience Entry</h3>
          <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-6">
            <ExperienceEntry
              organization="Example Organization"
              role="Example Software Engineer"
              dateLabel="2024-01 — 2025-01"
              employmentType="Full-time"
              headingLevel={3}
              summary="Example synthetic career summary for design and typography review."
              contributions={[
                "Implemented synthetic modular data layer with zero external side effects.",
                "Engineered clean-slate multi-root routing for bilingual precision.",
              ]}
            />
          </div>
        </div>

        {/* Project Card */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Project Card</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProjectCard
              title="Example Project"
              summary="Synthetic project card demonstration with status badges, role description, and topic tags."
              status="completed"
              role="Lead Developer"
              headingLevel={3}
              tags={["TypeScript", "Next.js", "Design System"]}
              href="/projects"
            />
            <ProjectCard
              title="Example Supporting System"
              summary="Synthetic secondary project card demonstration for layout and measure testing."
              status="in-progress"
              role="Contributor"
              headingLevel={3}
              tags={["Tailwind 4", "Accessibility"]}
              href="/projects"
            />
          </div>
        </div>

        {/* Article Card */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Article Card</h3>
          <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-6">
            <ArticleCard
              title="Example Technical Article"
              summary="Synthetic article summary demonstrating title, date formatting, topic tags, and subtle hover interaction."
              date="2026-08-28"
              topics={["Architecture", "Engineering"]}
              headingLevel={3}
              href="/blog"
            />
          </div>
        </div>

        {/* Figure */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Figure &amp; Media Container</h3>
          <Figure caption="Figure 1.0: Synthetic figure container with subtle border and caption.">
            <div className="p-8 text-center text-sm font-mono text-[var(--muted)] bg-[var(--surface)]">
              [ Caller Media / Diagram Container ]
            </div>
          </Figure>
        </div>

        {/* Prose */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">Prose Typography</h3>
          <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-6">
            <Prose>
              <h3>Heading Level Three in Long-Form Reading</h3>
              <p>
                Portfolio v2 prioritizes readability and restrained typography over novelty. Paragraphs are
                constrained to around 68 characters per line to maintain a comfortable reading rhythm.
              </p>
              <blockquote>
                Evidence-backed technical communication values truthfulness and boundary clarity over cosmetic flair.
              </blockquote>
              <p>
                Inline code like <code>createPageMetadata()</code> uses the system monospace stack with a fine border.
              </p>
            </Prose>
          </div>
        </div>
      </section>
    </Container>
  );
}
