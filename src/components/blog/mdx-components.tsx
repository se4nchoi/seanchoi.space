import React from "react";
import type { ComponentType, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import type { AppLocale } from "@/i18n/config";
import { Callout, type CalloutProps } from "./callout";
import { MdxLink, type MdxLinkProps } from "./mdx-link";
import { MdxPre, MdxCode } from "./mdx-code";
import { FigureMdx, type FigureMdxProps } from "./figure";
import { slugifyHeading } from "@/lib/content/blog";

export function getHeadingText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getHeadingText).join("");
  if (React.isValidElement(children) && (children.props as { children?: ReactNode })?.children) {
    return getHeadingText((children.props as { children?: ReactNode }).children);
  }
  return "";
}

export interface CreateMdxComponentsOptions {
  getHeadingId?: (text: string) => string;
  locale?: AppLocale;
}

export function createMdxComponents(options?: CreateMdxComponentsOptions): MDXComponents {
  const getHeadingId = options?.getHeadingId || slugifyHeading;
  const locale = options?.locale || "en";

  return {
    h1: () => {
      throw new Error(
        "MDX body must not include an <h1> tag. The article page title is the sole <h1>."
      );
    },
    h2: ({ children, id: explicitId, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = getHeadingText(children);
      const id = explicitId || getHeadingId(text);
      return (
        <h2
          id={id}
          className={`scroll-mt-20 text-[length:var(--text-heading-2)] font-semibold text-[var(--foreground)] ${className}`}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, id: explicitId, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = getHeadingText(children);
      const id = explicitId || getHeadingId(text);
      return (
        <h3
          id={id}
          className={`scroll-mt-20 text-[length:var(--text-heading-3)] font-semibold text-[var(--foreground)] ${className}`}
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4: ({ children, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className={`text-[length:var(--text-body)] font-semibold text-[var(--foreground)] ${className}`}
        {...props}
      >
        {children}
      </h4>
    ),
    a: MdxLink as ComponentType<MdxLinkProps>,
    pre: MdxPre as ComponentType<React.HTMLAttributes<HTMLPreElement>>,
    code: MdxCode as ComponentType<React.HTMLAttributes<HTMLElement>>,
    Callout: ((props: CalloutProps) => <Callout locale={locale} {...props} />) as ComponentType<CalloutProps>,
    Figure: FigureMdx as ComponentType<FigureMdxProps>,
  };
}
