import React from "react";
import Link from "next/link";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { ExternalLink } from "@/components/ui/external-link";
import {
  canonicalContentRegistry,
  formatDateRange,
  getLocalizedText,
} from "@/data/content";

export interface HomePageViewProps {
  locale: AppLocale;
}

export function HomePageView({ locale }: HomePageViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const { siteIdentity, experiences, educationAndTraining, skills, links } =
    canonicalContentRegistry;

  const expHref = isKo ? "/ko/experience" : "/experience";
  const projectsHref = isKo ? "/ko/projects" : "/projects";

  const displayName = siteIdentity
    ? getLocalizedText(siteIdentity.displayName, locale)
    : isKo
      ? "최예현"
      : "Sean Choi";

  const currentTrainingRecord = educationAndTraining.find(
    (e) => e.kind === "training" && e.status === "in-progress"
  );

  const degreeRecord = educationAndTraining.find((e) => e.kind === "education");

  const professionalSkills = skills.filter(
    (s) => s.evidenceLevel === "professional"
  );
  const projectSkills = skills.filter((s) => s.evidenceLevel === "project");
  const trainingSkills = skills.filter((s) => s.evidenceLevel === "training");

  const githubLink = links.find((l) => l.kind === "github");
  const linkedinLink = links.find((l) => l.kind === "linkedin");
  const emailLink = links.find((l) => l.kind === "email");

  return (
    <Container size="default" className="space-y-16 pb-16">
      {/* 1. First Viewport: Identity Hierarchy & Primary Actions */}
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[length:var(--text-small)] font-mono text-[var(--muted)] tracking-[var(--tracking-label)] uppercase">
              {isKo ? "소프트웨어 개발자" : "Software Developer"}
            </span>
            <span className="text-[var(--muted)] font-mono">•</span>
            <span className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
              {dict.careerUI.basedIn}
            </span>
          </div>
          <h1 className="text-[length:var(--text-display)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[var(--foreground)]">
            {displayName}
          </h1>
        </div>

        <div className="space-y-3 max-w-[var(--max-width-prose)] text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
          <p className="font-medium text-[var(--foreground)] text-[length:var(--text-heading-3)]">
            {dict.careerUI.homeHeadline}
          </p>
          <p>{dict.careerUI.homePositioning}</p>
          {degreeRecord && (
            <p className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
              {getLocalizedText(degreeRecord.program, locale)} —{" "}
              {getLocalizedText(degreeRecord.institution, locale)}, 2026
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={expHref}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[length:var(--text-small)] font-medium text-[var(--accent-foreground)] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.careerUI.viewExperience}
          </Link>
          <Link
            href={projectsHref}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[length:var(--text-small)] font-medium text-[var(--foreground)] hover:bg-[var(--border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.careerUI.viewProjects}
          </Link>
        </div>

        {/* Public Profile Links in Hero */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-[length:var(--text-small)] text-[var(--muted)]">
          {emailLink && (
            <a
              href={emailLink.href}
              className="font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>{dict.careerUI.emailLabel}</span>
              <span aria-hidden="true">✉</span>
            </a>
          )}
          {githubLink && (
            <ExternalLink
              href={githubLink.href as `https://${string}`}
              newTabLabel={dict.openInNewTab}
            >
              GitHub
            </ExternalLink>
          )}
          {linkedinLink && (
            <ExternalLink
              href={linkedinLink.href as `https://${string}`}
              newTabLabel={dict.openInNewTab}
            >
              LinkedIn
            </ExternalLink>
          )}
        </div>
      </section>

      {/* 2. Verified Professional Experience Snapshot */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.experienceSnapshot}
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => {
            const org = getLocalizedText(exp.organization, locale);
            const role = getLocalizedText(exp.role, locale);
            const summary = getLocalizedText(exp.summary, locale);
            const dateStr = formatDateRange(exp.dateRange, locale);

            return (
              <div
                key={exp.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-2"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] leading-[var(--leading-tight)]">
                      {role}
                    </h3>
                    <p className="text-[length:var(--text-small)] font-medium text-[var(--muted)]">
                      {org}
                    </p>
                  </div>
                  <time className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
                    {dateStr}
                  </time>
                </div>
                <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
                  {summary}
                </p>
              </div>
            );
          })}
        </div>
        <div>
          <Link
            href={expHref}
            className="inline-flex items-center min-h-[44px] text-[length:var(--text-small)] font-medium text-[var(--accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {dict.careerUI.viewFullExperience} →
          </Link>
        </div>
      </section>

      {/* 3. Current Training & Trajectory */}
      {currentTrainingRecord && (
        <section className="space-y-6">
          <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
            {dict.careerUI.currentTraining}
          </h2>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
                {getLocalizedText(currentTrainingRecord.program, locale)}
              </h3>
              <div className="flex gap-2">
                <Tag variant="accent">{dict.careerUI.trainingLevel}</Tag>
                <Tag variant="default">{dict.careerUI.inProgress}</Tag>
              </div>
            </div>
            <p className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
              {getLocalizedText(currentTrainingRecord.institution, locale)} ·{" "}
              {formatDateRange(currentTrainingRecord.dateRange, locale)}
            </p>
            <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
              {isKo
                ? "기존 소프트웨어 개발 역량을 산업 현장과 연결하기 위해 학습 범위를 확장하고 있습니다. 현재 PLC/래더 로직, 센서와 IoT, 산업 네트워크, Linux, AI/ML, OpenVINO, 엣지 추론, 설비/OT 연동을 학습·실습하고 있습니다."
                : "Current study includes PLC/ladder logic, sensors and IoT, industrial networking, Linux, AI/ML, OpenVINO, edge inference, and equipment/OT integration."}
            </p>
          </div>
        </section>
      )}

      {/* 4. Skills & Evidence Level */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.skillsAndEvidence}
        </h2>
        <div className="space-y-6">
          {/* Professional Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[length:var(--text-small)] text-[var(--foreground)]">
                {dict.careerUI.professionalLevel}
              </span>
              <span className="text-[length:var(--text-small)] text-[var(--muted)]">
                ({isKo ? "실무 애플리케이션 및 운영 시스템 연동" : "Professional applications & operational integration"})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {professionalSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[length:var(--text-small)]"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {getLocalizedText(skill.name, locale)}
                  </span>
                  <Tag variant="accent">{dict.careerUI.professionalLevel}</Tag>
                </div>
              ))}
            </div>
          </div>

          {/* Project Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[length:var(--text-small)] text-[var(--foreground)]">
                {dict.careerUI.projectLevel}
              </span>
              <span className="text-[length:var(--text-small)] text-[var(--muted)]">
                ({isKo ? "자발적 사이드 프로젝트" : "Self-directed side projects"})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[length:var(--text-small)]"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {getLocalizedText(skill.name, locale)}
                  </span>
                  <Tag variant="default">{dict.careerUI.projectLevel}</Tag>
                </div>
              ))}
            </div>
          </div>

          {/* Training Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[length:var(--text-small)] text-[var(--foreground)]">
                {dict.careerUI.trainingLevel}
              </span>
              <span className="text-[length:var(--text-small)] text-[var(--muted)]">
                ({isKo ? "교육 및 실습 진행 중" : "In-progress training"})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trainingSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[length:var(--text-small)]"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {getLocalizedText(skill.name, locale)}
                  </span>
                  <Tag variant="muted">{dict.careerUI.trainingLevel}</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact & Public Profiles */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.contactAndProfiles}
        </h2>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-6 text-[length:var(--text-small)]">
            {emailLink && (
              <div>
                <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
                  {getLocalizedText(emailLink.label, locale)}
                </span>
                <a
                  href={emailLink.href}
                  className="font-medium text-[var(--accent)] hover:underline"
                >
                  {emailLink.href.replace(/^mailto:/, "")}
                </a>
              </div>
            )}
            {githubLink && (
              <div>
                <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
                  {getLocalizedText(githubLink.label, locale)}
                </span>
                <ExternalLink
                  href={githubLink.href as `https://${string}`}
                  newTabLabel={dict.openInNewTab}
                >
                  {githubLink.href.replace(/^https?:\/\//, "")}
                </ExternalLink>
              </div>
            )}
            {linkedinLink && (
              <div>
                <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
                  {getLocalizedText(linkedinLink.label, locale)}
                </span>
                <ExternalLink
                  href={linkedinLink.href as `https://${string}`}
                  newTabLabel={dict.openInNewTab}
                >
                  {linkedinLink.href
                    .replace(/^https?:\/\//, "")
                    .replace(/^www\./, "")
                    .replace(/\/$/, "")}
                </ExternalLink>
              </div>
            )}
            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase tracking-wider mb-1">
                {isKo ? "위치" : "Location"}
              </span>
              <span className="font-medium text-[var(--foreground)]">
                {dict.careerUI.basedIn}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
