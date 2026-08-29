import React from "react";
import { Tag } from "@/components/ui/tag";

export interface TopicItem {
  name: string;
  count: number;
}

export interface TopicListProps {
  topics: TopicItem[];
  title?: string;
}

export function TopicList({ topics, title = "Topics" }: TopicListProps) {
  if (topics.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <Tag key={t.name} variant="muted">
            {t.name} ({t.count})
          </Tag>
        ))}
      </div>
    </div>
  );
}
