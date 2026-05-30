"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import type { QuestionLanguage } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  /** Language label shown in the window chrome. */
  lang?: QuestionLanguage;
  /** Hide line numbers (e.g. for one-liners). */
  noLineNumbers?: boolean;
  className?: string;
}

const LANG_LABEL: Record<QuestionLanguage, string> = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  php: "PHP",
  sql: "SQL",
  bash: "Bash",
  json: "JSON",
  text: "Code",
};

/**
 * Professional editor-style code block: window chrome with traffic-light dots,
 * a language label, copy button, optional line numbers, and a subtle gradient
 * top border. Always LTR + monospace regardless of UI direction (code is LTR).
 */
export function CodeBlock({
  code,
  lang = "text",
  noLineNumbers,
  className,
}: CodeBlockProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div
      dir="ltr"
      className={cn(
        // Editor surface: a touch lighter than the page in dark, a soft slate
        // panel in light — professional in both, never plain white.
        "relative overflow-hidden rounded-xl border border-line text-left shadow-card",
        "bg-slate-50 dark:bg-[#0b0d18]",
        className,
      )}
    >
      {/* gradient hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ms-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
            <Terminal className="h-3.5 w-3.5" />
            {LANG_LABEL[lang]}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={t("a11y.copyCode")}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* code */}
      <div className="overflow-x-auto">
        <pre className="min-w-full p-4 font-mono text-[13px] leading-relaxed text-slate-800 dark:text-slate-100">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="grid grid-cols-[auto_1fr] gap-4">
                {!noLineNumbers && (
                  <span className="select-none text-right text-slate-400 dark:text-slate-600">
                    {i + 1}
                  </span>
                )}
                <span className="whitespace-pre">{line || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
