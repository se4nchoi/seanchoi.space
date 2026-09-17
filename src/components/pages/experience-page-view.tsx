import React from "react";
import type { AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ExperienceEntry } from "@/components/ui/experience-entry";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/prose";
import {
  canonicalContentRegistry,
  canonicalSupportingProjects,
  formatDateRange,
  getLocalizedText,
  systemLayerSkillGroups,
} from "@/data/content";

export interface ExperiencePageViewProps {
  locale: AppLocale;
}

export function ExperiencePageView({ locale }: ExperiencePageViewProps) {
  const dict = getDictionary(locale);
  const isKo = locale === "ko";
  const { experiences, educationAndTraining, skills } = canonicalContentRegistry;

  const degreeRecord = educationAndTraining.find((e) => e.kind === "education");
  const trainingRecord = educationAndTraining.find(
    (e) => e.kind === "training" && e.status === "in-progress"
  );

  const selfDirectedProjects = canonicalSupportingProjects.filter(
    (p) => p.context === "self-directed"
  );
  const inClassExercises = canonicalSupportingProjects.filter(
    (p) => p.context === "training-exercise"
  );

  const levelLabel = (level: (typeof skills)[number]["evidenceLevel"]) => {
    if (level === "professional") return dict.careerUI.professionalLevel;
    if (level === "project") return dict.careerUI.projectLevel;
    if (level === "training") return dict.careerUI.trainingLevel;
    return isKo ? "학습 근거" : "Learning evidence";
  };
  const layerLabel = (id: (typeof systemLayerSkillGroups)[number]["id"]) => {
    const labels = {
      interfaces: dict.careerUI.layerInterfaces,
      applications: dict.careerUI.layerApplications,
      infrastructure: dict.careerUI.layerInfrastructure,
      "physical-systems": dict.careerUI.layerPhysicalSystems,
      "ai-perception": dict.careerUI.layerAiPerception,
    };
    return labels[id];
  };

  return (
    <Container size="default" className="space-y-16 pb-16">
      {/* 1. Page Header */}
      <PageIntro
        title={dict.careerUI.experienceTitle}
        summary={dict.careerUI.experienceIntro}
      />

      {/* 2. Professional Experience Section */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.professionalExperience}
        </h2>
        <div className="space-y-6">
          {experiences.map((exp) => {
            const org = getLocalizedText(exp.organization, locale);
            const role = getLocalizedText(exp.role, locale);
            const summary = getLocalizedText(exp.summary, locale);
            const dateStr = formatDateRange(exp.dateRange, locale);
            const contribs = exp.contributions.map((c) =>
              getLocalizedText(c.text, locale)
            );

            return (
              <div
                key={exp.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <ExperienceEntry
                  organization={org}
                  role={role}
                  dateLabel={dateStr}
                  summary={summary}
                  contributions={contribs}
                  headingLevel={3}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Education & Training Section */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.educationAndTraining}
        </h2>
        <div className="space-y-4">
          {/* Degree */}
          {degreeRecord && (
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] leading-[var(--leading-tight)]">
                    {getLocalizedText(degreeRecord.program, locale)}
                  </h3>
                  <p className="text-[length:var(--text-small)] font-medium text-[var(--muted)]">
                    {getLocalizedText(degreeRecord.institution, locale)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Tag variant="default">{dict.careerUI.completed}</Tag>
                  <time className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
                    {formatDateRange(degreeRecord.dateRange, locale)}
                  </time>
                </div>
              </div>
              <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
                {isKo
                  ? "2026년 6월 졸업하고 학위를 취득했습니다."
                  : "Completed and conferred in June 2026."}
              </p>
            </div>
          )}

          {/* Current Training */}
          {trainingRecord && (
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] leading-[var(--leading-tight)]">
                    {getLocalizedText(trainingRecord.program, locale)}
                  </h3>
                  <p className="text-[length:var(--text-small)] font-medium text-[var(--muted)]">
                    {getLocalizedText(trainingRecord.institution, locale)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Tag variant="accent">{dict.careerUI.trainingLevel}</Tag>
                  <Tag variant="default">{dict.careerUI.inProgress}</Tag>
                  <time className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
                    {formatDateRange(trainingRecord.dateRange, locale)}
                  </time>
                </div>
              </div>
              <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--foreground)]">
                {isKo
                  ? "기존 소프트웨어 개발 역량을 산업 현장과 연결하기 위해 학습 범위를 확장하고 있습니다. 현재 PLC/래더 로직, 센서와 IoT, 산업 네트워크, Linux, AI/ML, OpenVINO, 엣지 추론, 설비/OT 연동을 학습·실습하고 있습니다."
                  : "Current study includes PLC/ladder logic, sensors and IoT, industrial networking, Linux, AI/ML, OpenVINO, edge inference, and equipment/OT integration."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Self-Directed Projects & In-Class Exercises Section */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.sideProjects}
        </h2>
        <p className="text-[length:var(--text-body)] text-[var(--muted)]">
          {dict.careerUI.sideProjectsIntro}
        </p>

        {/* Self-Directed Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selfDirectedProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
                  {getLocalizedText(proj.title, locale)}
                </h3>
                <Tag variant="accent">{dict.careerUI.projectLevel}</Tag>
              </div>
              {proj.role && (
                <p className="text-[length:var(--text-small)] font-mono text-[var(--muted)]">
                  {getLocalizedText(proj.role, locale)}
                </p>
              )}
              <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
                {getLocalizedText(proj.summary, locale)}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.technologies.map((tech) => (
                  <Tag key={tech} variant="muted">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* In-Class Exercises */}
        {inClassExercises.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
              {dict.careerUI.trainingExercises}
            </h3>
            <p className="text-[length:var(--text-small)] text-[var(--muted)]">
              {dict.careerUI.trainingExercisesSummary}
            </p>
            {inClassExercises.map((ex) => (
              <div
                key={ex.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[length:var(--text-body)] text-[var(--foreground)]">
                    {getLocalizedText(ex.title, locale)}
                  </span>
                  <Tag variant="muted">{dict.careerUI.trainingLevel}</Tag>
                </div>
                <p className="text-[length:var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--muted)]">
                  {getLocalizedText(ex.summary, locale)}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ex.technologies.map((t) => (
                    <Tag key={t} variant="muted">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Capabilities by System Layer Section */}
      <section className="space-y-6">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.capabilitiesBySystemLayer}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {systemLayerSkillGroups.map((group) => {
            const groupSkills = group.skillIds
              .map((skillId) => skills.find((skill) => skill.id === skillId))
              .filter((skill) => skill !== undefined);
            return (
              <div
                key={group.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-3"
              >
                <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
                  {layerLabel(group.id)}
                </h3>
                <ul className="space-y-2">
                  {groupSkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex flex-wrap items-center justify-between gap-2 text-[length:var(--text-small)]"
                    >
                      <span className="font-medium text-[var(--foreground)]">
                        {getLocalizedText(skill.name, locale)}
                      </span>
                      <Tag
                        variant={
                          skill.evidenceLevel === "professional" ? "accent" : "muted"
                        }
                      >
                        {levelLabel(skill.evidenceLevel)}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Contribution Boundaries & Disclosure Safeguards Section */}
      <section className="space-y-4">
        <h2 className="text-[length:var(--text-heading-2)] font-semibold tracking-[var(--tracking-display)] text-[var(--foreground)] border-b border-[var(--border)] pb-2">
          {dict.careerUI.contributionBoundaries}
        </h2>
        <div className="space-y-4">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-2">
            <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
              {dict.careerUI.boundaryEmgTitle}
            </h3>
            <Prose>
              <p>{dict.careerUI.boundaryEmgBody}</p>
            </Prose>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-2">
            <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
              {dict.careerUI.boundaryMilitaryTitle}
            </h3>
            <Prose>
              <p>{dict.careerUI.boundaryMilitaryBody}</p>
            </Prose>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-2">
            <h3 className="text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)]">
              {dict.careerUI.boundaryTrainingTitle}
            </h3>
            <Prose>
              <p>{dict.careerUI.boundaryTrainingBody}</p>
            </Prose>
          </div>
        </div>
      </section>
    </Container>
  );
}
