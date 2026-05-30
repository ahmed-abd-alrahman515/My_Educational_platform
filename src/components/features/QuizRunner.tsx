"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import type { LevelId, Question, QuizResult, Track } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { buildQuiz } from "@/data/questions";
import { questionXp } from "@/lib/xp";
import { cn } from "@/lib/utils";
import { QuizResults } from "./QuizResults";

interface QuizRunnerProps {
  track: Track;
  level: LevelId;
  onExit: () => void;
}

type Phase = "playing" | "done";

/**
 * Runs a single quiz: presents questions one at a time, scores answers, awards
 * XP, and on completion submits the result to the progress provider and shows
 * the results screen.
 */
export function QuizRunner({ track, level, onExit }: QuizRunnerProps) {
  const { tc, t } = useLanguage();
  const { submitQuiz } = useProgress();

  // Build the quiz once per mount so question order stays stable.
  const quiz = useMemo(() => buildQuiz(track.id, level), [track.id, level]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [unlocked, setUnlocked] = useState<string[]>([]);

  if (quiz.questions.length === 0) {
    return (
      <Card glass className="p-10 text-center">
        <p className="text-muted">{t("quiz.empty")}</p>
        <Button variant="outline" className="mt-6" onClick={onExit}>
          {t("quiz.backToTracks")}
        </Button>
      </Card>
    );
  }

  const question: Question = quiz.questions[index];
  const total = quiz.questions.length;
  const isLast = index === total - 1;

  function choose(optionId: string) {
    if (revealed) return;
    setSelected(optionId);
    setRevealed(true);
    if (optionId === question.correctOptionId) {
      setScore((s) => s + 1);
      setXp((x) => x + questionXp(question.xp, level));
    }
  }

  function next() {
    if (isLast) {
      const result: QuizResult = {
        trackId: track.id,
        level,
        score,
        total,
        xpEarned: xp,
        completedAt: new Date().toISOString(),
      };
      setUnlocked(submitQuiz(result));
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (phase === "done") {
    return (
      <QuizResults
        track={track}
        level={level}
        score={score}
        total={total}
        xpEarned={xp}
        newBadgeIds={unlocked}
        onRetry={onExit}
      />
    );
  }

  return (
    <div>
      {/* Progress header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-sm text-muted">
          {t("quiz.question")} {index + 1} {t("quiz.of")} {total}
        </span>
        <Pill tone="primary">
          {xp} {t("common.xp")}
        </Pill>
      </div>
      <ProgressBar value={(index + (revealed ? 1 : 0)) / total} className="mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <Card glass className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold sm:text-xl">
              {tc(question.prompt)}
            </h2>

            {question.code && (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 text-start font-mono text-sm leading-relaxed">
                <code>{question.code}</code>
              </pre>
            )}

            <div className="mt-6 grid gap-3">
              {question.options.map((opt) => {
                const isCorrect = opt.id === question.correctOptionId;
                const isChosen = opt.id === selected;
                const state = !revealed
                  ? "idle"
                  : isCorrect
                    ? "correct"
                    : isChosen
                      ? "wrong"
                      : "idle";
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={revealed}
                    onClick={() => choose(opt.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border p-4 text-start text-sm transition-all",
                      state === "idle" &&
                        "border-line bg-surface hover:border-primary/50",
                      state === "correct" &&
                        "border-success bg-success/10 text-success",
                      state === "wrong" &&
                        "border-danger bg-danger/10 text-danger",
                    )}
                  >
                    <span>{tc(opt.text)}</span>
                    {state === "correct" && <Check className="h-4 w-4" />}
                    {state === "wrong" && <X className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answering */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="rounded-xl border border-line bg-surface-2 p-4">
                    <p
                      className={cn(
                        "mb-1 text-sm font-semibold",
                        selected === question.correctOptionId
                          ? "text-success"
                          : "text-danger",
                      )}
                    >
                      {selected === question.correctOptionId
                        ? t("quiz.correct")
                        : t("quiz.incorrect")}
                    </p>
                    <p className="text-sm text-muted">
                      <span className="font-medium text-foreground">
                        {t("quiz.explanation")}:{" "}
                      </span>
                      {tc(question.explanation)}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={next}>
                      {isLast ? t("common.finish") : t("common.next")}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
