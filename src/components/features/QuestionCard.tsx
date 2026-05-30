"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import type { Question } from "@/types";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";

interface QuestionCardProps {
  question: Question;
  /** Currently selected option id (pre-submit) or chosen answer (post). */
  selected: string | null;
  /** True once the answer has been submitted and feedback shown. */
  answered: boolean;
  hintUsed: boolean;
  isLast: boolean;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  onUseHint: () => void;
}

const TYPE_KEY = (t: Question["type"]): TranslationKey =>
  `engine.questionType.${t}` as TranslationKey;

/**
 * Renders a single question of any of the six supported types. Layout adapts:
 * true/false shows two wide buttons; everything else shows a vertical option
 * list. Debugging / code-output / fill-blank surface the code block prominently.
 */
export function QuestionCard({
  question,
  selected,
  answered,
  hintUsed,
  isLast,
  onSelect,
  onSubmit,
  onNext,
  onUseHint,
}: QuestionCardProps) {
  const { t, tc } = useLanguage();

  const isCorrect = answered && selected === question.correctOptionId;
  const isTrueFalse = question.type === "true-false";
  const hasHint = !!question.hint;

  return (
    <Card glass className="relative overflow-hidden p-6 sm:p-8">
      {/* Type tag */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Pill tone="primary">
          <Sparkles className="h-3 w-3" />
          {t(TYPE_KEY(question.type))}
        </Pill>
        {hintUsed && (
          <Pill tone="warning">
            <Lightbulb className="h-3 w-3" />
            {t("engine.hintUsed")}
          </Pill>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold leading-snug sm:text-xl">
        {tc(question.prompt)}
      </h2>

      {/* Code block */}
      {question.code && (
        <div className="mt-4">
          <CodeBlock code={question.code} lang={question.codeLang} />
        </div>
      )}

      {/* Hint */}
      {hasHint && (
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {hintUsed ? (
              <motion.div
                key="hint-shown"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-foreground">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <span>{tc(question.hint!)}</span>
                </div>
              </motion.div>
            ) : (
              !answered && (
                <motion.button
                  key="hint-btn"
                  type="button"
                  onClick={onUseHint}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-warning/40 px-3 py-1.5 text-sm font-medium text-warning transition-colors hover:bg-warning/10"
                >
                  <Lightbulb className="h-4 w-4" />
                  {t("engine.showHint")}
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Options */}
      <div
        className={cn(
          "mt-6 grid gap-3",
          isTrueFalse && "sm:grid-cols-2",
        )}
      >
        {question.options.map((opt) => {
          const isThisCorrect = opt.id === question.correctOptionId;
          const isChosen = opt.id === selected;

          const state = !answered
            ? isChosen
              ? "selected"
              : "idle"
            : isThisCorrect
              ? "correct"
              : isChosen
                ? "wrong"
                : "idle";

          return (
            <button
              key={opt.id}
              type="button"
              disabled={answered}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "group flex items-center justify-between gap-3 rounded-xl border p-4 text-start text-sm transition-all duration-200",
                "enabled:active:scale-[0.99]",
                isTrueFalse && "justify-center text-base font-semibold",
                state === "idle" &&
                  "border-line bg-surface hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-2 hover:shadow-glow-sm",
                state === "selected" &&
                  "border-primary bg-primary/10 ring-1 ring-primary/40",
                state === "correct" &&
                  "border-success bg-success/10 text-success",
                state === "wrong" && "border-danger bg-danger/10 text-danger",
              )}
            >
              <span className="flex items-center gap-3">
                {!isTrueFalse && (
                  <span
                    className={cn(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-bold uppercase",
                      state === "idle" && "border-line text-muted",
                      state === "selected" && "border-primary text-primary",
                      state === "correct" && "border-success text-success",
                      state === "wrong" && "border-danger text-danger",
                    )}
                  >
                    {opt.id}
                  </span>
                )}
                <span>{tc(opt.text)}</span>
              </span>
              {state === "correct" && <Check className="h-4 w-4" />}
              {state === "wrong" && <X className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {/* Feedback + explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={cn(
                "rounded-xl border p-4",
                isCorrect
                  ? "border-success/30 bg-success/5"
                  : "border-danger/30 bg-danger/5",
              )}
            >
              <p
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold",
                  isCorrect ? "text-success" : "text-danger",
                )}
              >
                {isCorrect ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                {isCorrect ? t("engine.correct") : t("engine.wrong")}
              </p>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-foreground">
                  {t("engine.explanation")}:{" "}
                </span>
                {tc(question.explanation)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        {!answered ? (
          <Button onClick={onSubmit} disabled={selected === null}>
            <Check className="h-4 w-4" />
            {t("engine.submit")}
          </Button>
        ) : (
          <Button onClick={onNext}>
            {isLast ? t("engine.finish") : t("engine.next")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        )}
      </div>
    </Card>
  );
}
