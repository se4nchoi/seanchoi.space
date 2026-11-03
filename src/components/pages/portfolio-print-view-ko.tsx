import React from "react";
import Image from "next/image";
import { canonicalContentRegistry, canonicalSupportingProjects, systemLayerSkillGroups } from "@/data/content";
import { caseStudies, type CaseStudy, type CaseStudyFigure } from "@/data/case-studies";
import { workMedia, type WorkMedia } from "@/data/work-media";
import { formatDateRange } from "@/lib/content/format";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvidenceLevelLabel, getSystemLayerLabel, getWorkContextLabel } from "@/i18n/career-labels";
import type { LocalizedText, SupportingProjectRecord as SupportingProject } from "@/lib/content/schemas";

// Korean portfolio PDF source, laid out like the Busan program's sample profile:
// one cover page, then one page per project. Rendered only on the preview channel
// and printed to public/portfolio.pdf by scripts/portfolio-pdf.mjs (Sean approved
// publishing this PDF on 2026-11-03). Korean case-study copy is still marked draft,
// so Sean reviews the printed PDF before each publish.
const SITE = "seanchoi.space";
const NAVY = "#0f2a4a";
const ACCENT = "#0b63b6";

// Stated by Sean on 2026-11-03 for the program profile; not part of the site registry.
const CERTIFICATIONS = ["ADsP (데이터분석 준전문가)", "운전면허 2종", "CELPIP-General 11 (영어)"];

const ko = (text: LocalizedText) => text.ko ?? text.en;

type ProjectPage =
  | { kind: "case-study"; study: CaseStudy }
  | { kind: "supporting"; project: SupportingProject; media?: WorkMedia };

function supporting(id: string): ProjectPage {
  const project = canonicalSupportingProjects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown supporting project: ${id}`);
  return { kind: "supporting", project, media: workMedia[id] };
}

const caseStudy = (slug: string): ProjectPage => {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return { kind: "case-study", study };
};

const projectOrder: ProjectPage[] = [
  caseStudy("indy7-digital-twin"),
  supporting("project-plc-robot-cell-integration"),
  caseStudy("bamboochat"),
  supporting("evidence-item-ruta40"),
  supporting("evidence-item-hoek-immersion"),
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-[13px] font-bold" style={{ color: NAVY }}>
      {children}
    </h2>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded px-2 py-0.5 text-[10px] font-medium"
          style={{ background: "#e8eef7", color: NAVY }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function FigureBox({
  media,
  title,
  maxHeight = "max-h-[105mm]",
}: {
  media: { src: string; width: number; height: number; alt: string; caption: string };
  title: string;
  maxHeight?: string;
}) {
  return (
    <figure className="break-inside-avoid rounded-lg p-4" style={{ background: "#f3f6fb" }}>
      <p className="mb-3 text-[11px] font-semibold" style={{ color: NAVY }}>
        {title}
      </p>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        className={`mx-auto h-auto ${maxHeight} w-auto max-w-full rounded border border-[#d8dee8] object-contain`}
      />
      <figcaption className="mt-2 text-center text-[10px] italic text-[#6b7280]">{media.caption}</figcaption>
    </figure>
  );
}

function figureMedia(figure: CaseStudyFigure) {
  return { src: figure.src, width: figure.width, height: figure.height, alt: ko(figure.alt), caption: ko(figure.caption) };
}

function ProjectHeader({ index, total, label, title }: { index: number; total: number; label: string; title: string }) {
  return (
    <header className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ background: NAVY }}>
            PROJECT {index}
          </span>
          <span className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: ACCENT, color: ACCENT }}>
            {label}
          </span>
        </div>
        <span className="text-[10px] text-[#6b7280]">
          {index} / {total}
        </span>
      </div>
      <h1 className="text-[20px] font-bold leading-snug" style={{ color: NAVY }}>
        {title}
      </h1>
    </header>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4 text-[11px] leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function CaseStudyPage({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
  const dict = getDictionary("ko");
  return (
    <section className="break-before-page space-y-4">
      <ProjectHeader index={index} total={total} label={dict.careerUI.personalProjectLabel} title={ko(study.title)} />
      <div>
        <SectionTitle>개요</SectionTitle>
        <p className="text-[11px] leading-relaxed">{ko(study.summary)}</p>
        <p className="mt-1 text-[10px] text-[#6b7280]">
          {ko(study.period)} · {ko(study.status)} · {study.repositoryHref.replace("https://", "")}
        </p>
      </div>
      <div>
        <SectionTitle>사용 기술</SectionTitle>
        <Chips items={study.stack} />
      </div>
      <div>
        <SectionTitle>주요 내용 / 본인 역할</SectionTitle>
        <p className="mb-1.5 text-[11px] leading-relaxed">{ko(study.howBuilt)}</p>
        <Bullets items={study.built.slice(0, 4).map(ko)} />
      </div>
      <FigureBox media={figureMedia(study.hero)} title="주요 화면" maxHeight="max-h-[78mm]" />
      <div className="grid grid-cols-2 gap-5">
        <div>
          <SectionTitle>검증</SectionTitle>
          <Bullets items={study.verification.slice(0, 2).map(ko)} />
        </div>
        <div>
          <SectionTitle>한계</SectionTitle>
          <Bullets items={study.limits.slice(0, 2).map(ko)} />
        </div>
      </div>
    </section>
  );
}

function SupportingPage({ project, media, index, total }: { project: SupportingProject; media?: WorkMedia; index: number; total: number }) {
  return (
    <section className="break-before-page space-y-4">
      <ProjectHeader
        index={index}
        total={total}
        label={getWorkContextLabel(project.context, "ko")}
        title={ko(project.title)}
      />
      <div>
        <SectionTitle>개요</SectionTitle>
        <p className="text-[11px] leading-relaxed">{ko(project.summary)}</p>
        {project.role && <p className="mt-1 text-[10px] text-[#6b7280]">역할: {ko(project.role)}</p>}
      </div>
      <div>
        <SectionTitle>사용 기술</SectionTitle>
        <Chips items={project.technologies} />
      </div>
      <div>
        <SectionTitle>주요 내용 / 본인 역할</SectionTitle>
        <p className="mb-1.5 text-[11px] leading-relaxed">{ko(project.contributionBoundary)}</p>
        <Bullets items={project.completedScope.map(ko)} />
      </div>
      {media && (
        <FigureBox
          media={{ src: media.src, width: media.width, height: media.height, alt: media.alt.ko, caption: media.caption.ko }}
          title={project.context === "training-exercise" ? "실습 사진" : "주요 화면"}
        />
      )}
    </section>
  );
}

export function PortfolioPrintViewKo({ generatedOn }: { generatedOn: string }) {
  const dict = getDictionary("ko");
  const { siteIdentity, experiences, educationAndTraining, links, skills } = canonicalContentRegistry;
  const email = links.find((l) => l.kind === "email")?.href.replace("mailto:", "");
  const github = links.find((l) => l.kind === "github")?.href.replace("https://", "");
  const linkedin = links.find((l) => l.kind === "linkedin")?.href.replace("https://www.", "");
  const skillName = (id: string) => {
    const skill = skills.find((s) => s.id === id);
    return skill ? ko(skill.name) : undefined;
  };
  const total = projectOrder.length;

  return (
    <div
      className="mx-auto max-w-[182mm] bg-white text-[11px] text-[#1f2937] print:max-w-none [&_*]:print:shadow-none"
      style={{ fontFamily: '"Noto Sans KR", "Noto Sans CJK KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif' }}
    >
      <style>{`@page { size: A4; margin: 14mm 14mm 14mm; } @media print { html, body { background: #fff !important; } }`}</style>

      {/* Cover */}
      <section className="space-y-7">
        <header className="-mx-1 rounded-lg px-7 py-7 text-white" style={{ background: NAVY }}>
          <h1 className="text-[28px] font-bold leading-tight">
            {siteIdentity ? ko(siteIdentity.displayName) : ""}
            <span className="ml-3 text-[15px] font-normal opacity-80">Sean Choi</span>
          </h1>
          <p className="mt-1.5 text-[13px] opacity-90">{dict.careerUI.homeHeadline}</p>
          <div className="mt-5 space-y-0.5 text-[10.5px] opacity-90">
            <p>
              {email} · {siteIdentity ? ko(siteIdentity.location) : ""}
            </p>
            <p>
              {SITE} · {github} · {linkedin}
            </p>
          </div>
        </header>

        <p className="text-[11px] leading-relaxed">{siteIdentity?.trajectory ? ko(siteIdentity.trajectory) : ""}</p>

        <div>
          <SectionTitle>학력 및 교육</SectionTitle>
          <div className="space-y-1">
            {educationAndTraining.map((e) => (
              <div key={e.id} className="flex items-baseline justify-between gap-4">
                <p>
                  <span className="font-semibold">{ko(e.institution)}</span> {ko(e.program)}
                </p>
                <p className="shrink-0 text-[10px] text-[#6b7280]">{formatDateRange(e.dateRange, "ko")}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>경력</SectionTitle>
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-semibold">
                    {ko(exp.organization)} <span className="font-normal text-[#4b5563]">· {ko(exp.role)}</span>
                  </p>
                  <p className="shrink-0 text-[10px] text-[#6b7280]">{formatDateRange(exp.dateRange, "ko")}</p>
                </div>
                <p className="text-[10.5px] leading-relaxed text-[#4b5563]">{ko(exp.summary)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>보유 자격증</SectionTitle>
          <p>{CERTIFICATIONS.join(" · ")}</p>
        </div>

        <div className="break-inside-avoid">
          <SectionTitle>기술사항</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {systemLayerSkillGroups.map((group) => (
              <div key={group.id} className="rounded-lg px-3 py-2" style={{ background: "#f3f6fb" }}>
                <p className="text-[10.5px] font-semibold" style={{ color: NAVY }}>
                  {getSystemLayerLabel(group.id, "ko")}
                </p>
                <p className="text-[10px] leading-relaxed text-[#4b5563]">
                  {group.skillIds.map(skillName).filter(Boolean).join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[9.5px] text-[#6b7280]">
            {getEvidenceLevelLabel("professional", "ko")} 경력과 {getEvidenceLevelLabel("training", "ko")}·개인 프로젝트 경험을
            구분해 표기했습니다. 프로젝트별 구분은 각 페이지 상단에 있습니다.
          </p>
        </div>
      </section>

      {projectOrder.map((page, i) =>
        page.kind === "case-study" ? (
          <CaseStudyPage key={page.study.slug} study={page.study} index={i + 1} total={total} />
        ) : (
          <SupportingPage key={page.project.id} project={page.project} media={page.media} index={i + 1} total={total} />
        )
      )}

      <p className="pt-4 text-[9.5px] text-[#6b7280]">
        {generatedOn} 기준 · 최신 내용은 {SITE}에서 확인할 수 있습니다.
      </p>
    </div>
  );
}
