import React from "react";
import Image from "next/image";
import { canonicalContentRegistry, canonicalSupportingProjects } from "@/data/content";
import { publishedCaseStudies, type CaseStudy, type CaseStudyFigure } from "@/data/case-studies";
import { formatDateRange, getLocalizedText } from "@/lib/content/format";
import { getDictionary } from "@/i18n/dictionaries";
import { TwinArchitectureDiagram } from "@/components/case-study/twin-architecture-diagram";
import { BambooChatArchitectureDiagram } from "@/components/case-study/bamboochat-architecture-diagram";

// Private application artifact: rendered only in development/preview and printed to
// a git-ignored PDF by scripts/portfolio-pdf.mjs. English only until Korean is reviewed.
const SITE = "seanchoi.space";
const pageBreak = "break-before-page";
const h2 = "mb-3 border-b border-line pb-1 text-lg font-semibold";
const small = "text-[11px] leading-snug text-muted";

function Shot({ figure, maxHeight }: { figure: CaseStudyFigure; maxHeight?: string }) {
  return (
    <figure className="break-inside-avoid">
      <Image
        src={figure.src}
        alt={figure.alt.en}
        width={figure.width}
        height={figure.height}
        className={`h-auto w-full rounded border border-line ${maxHeight ? `${maxHeight} object-cover object-top` : ""}`}
      />
      <figcaption className={`mt-1 ${small}`}>{figure.caption.en}</figcaption>
    </figure>
  );
}

function CaseStudyPages({ study }: { study: CaseStudy }) {
  const shots = study.walkthrough.flatMap((step) => (step.figure ? [step.figure] : []));
  return (
    <section className={`${pageBreak} space-y-4`}>
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-label text-accent">Case study</p>
        <h2 className="text-2xl font-semibold leading-tight">{study.title.en}</h2>
        <p className="text-sm leading-relaxed">{study.summary.en}</p>
        <p className={small}>
          {study.period.en} · {study.status.en} · {study.stack.join(" · ")}
        </p>
        <p className={small}>
          {study.repositoryHref.replace("https://", "")} · {SITE}/projects/{study.slug}
        </p>
      </header>
      <p className="rounded border border-line p-2 text-xs leading-relaxed">
        <span className="font-semibold">How it was built: </span>
        {study.howBuilt.en}
      </p>
      <Shot figure={study.hero} maxHeight="max-h-[55mm]" />
      <div className="grid grid-cols-2 gap-5 text-[11px] leading-snug">
        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold">Problem</h3>
          {study.problem.map((p) => <p key={p.en}>{p.en}</p>)}
          <h3 className="pt-1 text-sm font-semibold">What I built</h3>
          <ul className="list-disc space-y-1 pl-4">{study.built.map((b) => <li key={b.en}>{b.en}</li>)}</ul>
        </div>
        <div className="break-inside-avoid">
          {study.diagram === "indy7-twin" ? <TwinArchitectureDiagram locale="en" /> : <BambooChatArchitectureDiagram locale="en" />}
        </div>
      </div>
      <div className={`${pageBreak} space-y-4`}>
        <div className="grid grid-cols-2 gap-4">
          {shots.slice(0, 4).map((figure) => <Shot key={figure.src} figure={figure} />)}
        </div>
        <div className="grid grid-cols-2 gap-5 text-xs leading-relaxed">
          <div>
            <h3 className="mb-1 text-sm font-semibold">Design decisions</h3>
            <ul className="list-disc space-y-1 pl-4">{study.decisions.map((d) => <li key={d.en}>{d.en}</li>)}</ul>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="mb-1 text-sm font-semibold">Verification</h3>
              <ul className="list-disc space-y-1 pl-4">{study.verification.map((v) => <li key={v.en}>{v.en}</li>)}</ul>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold">Limits</h3>
              <ul className="list-disc space-y-1 pl-4">{study.limits.map((l) => <li key={l.en}>{l.en}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioPrintView({ generatedOn }: { generatedOn: string }) {
  const dict = getDictionary("en");
  const { siteIdentity, experiences, educationAndTraining, links } = canonicalContentRegistry;
  const email = links.find((l) => l.kind === "email")?.href.replace("mailto:", "");
  const github = links.find((l) => l.kind === "github")?.href.replace("https://", "");
  const linkedin = links.find((l) => l.kind === "linkedin")?.href.replace("https://www.", "");
  const caseStudyRecords = new Set(publishedCaseStudies.map((s) => s.supportingRecordId));
  const otherWork = canonicalSupportingProjects.filter(
    (p) => !caseStudyRecords.has(p.id) && p.context !== "training-exercise"
  );

  return (
    <div className="mx-auto max-w-[180mm] bg-white text-[#171717] print:max-w-none [&_*]:print:shadow-none">
      <style>{`@page { size: A4; margin: 14mm 14mm 16mm; } @media print { html, body { background: #fff !important; } }`}</style>

      <section className="space-y-5">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-display">{siteIdentity?.displayName.en}</h1>
          <p className="text-lg leading-snug">{dict.careerUI.homeHeadline}</p>
          <p className="text-sm text-muted">
            {siteIdentity?.location.en} · {email} · {SITE} · {github} · {linkedin}
          </p>
        </header>
        <p className="text-sm leading-relaxed">{siteIdentity?.trajectory ? getLocalizedText(siteIdentity.trajectory, "en") : ""}</p>

        <div>
          <h2 className={h2}>Experience</h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-semibold">
                    {exp.role.en} · {exp.organization.en}
                  </p>
                  <p className="shrink-0 text-xs text-muted">{formatDateRange(exp.dateRange, "en")}</p>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs leading-relaxed">
                  {exp.contributions.map((c) => <li key={c.text.en}>{c.text.en}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={h2}>Education &amp; training</h2>
          <div className="space-y-1 text-sm">
            {educationAndTraining.map((e) => (
              <div key={e.id} className="flex items-baseline justify-between gap-4">
                <p>
                  <span className="font-semibold">{e.program.en}</span>
                  {e.institution.en !== e.program.en && <span> · {e.institution.en}</span>}
                </p>
                <p className="shrink-0 text-xs text-muted">{formatDateRange(e.dateRange, "en")}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={h2}>Case studies in this document</h2>
          <ul className="list-disc space-y-1 pl-4 text-sm">
            {publishedCaseStudies.map((s) => (
              <li key={s.slug}>
                <span className="font-semibold">{s.title.en}</span>: {s.status.en.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {publishedCaseStudies.map((study) => <CaseStudyPages key={study.slug} study={study} />)}

      <section className={`${pageBreak} space-y-3`}>
        <h2 className={h2}>Other work</h2>
        {otherWork.map((p) => (
          <div key={p.id} className="break-inside-avoid space-y-1 text-xs leading-relaxed">
            <p className="text-sm font-semibold">
              {p.title.en}
              {p.status === "in-progress" && <span className="font-normal text-accent"> · in progress</span>}
            </p>
            <p>{p.summary.en}</p>
            <p className="text-muted">{p.contributionBoundary.en}</p>
            {p.plannedScope.length > 0 && (
              <p className="text-muted">Planned next: {p.plannedScope.map((s) => s.en).join("; ")}.</p>
            )}
            <p className="text-muted">{p.technologies.join(" · ")}</p>
          </div>
        ))}
        <p className={`pt-4 ${small}`}>
          Generated {generatedOn} from {SITE}. The website is the current source; this document is a snapshot.
        </p>
      </section>
    </div>
  );
}
