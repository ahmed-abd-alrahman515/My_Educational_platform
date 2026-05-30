"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Level, LevelResult, Question, Track } from "@/types";
import type { CategoryMeta } from "@/data/categories";
import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/ui/Spinner";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { QuizHud } from "./QuizHud";
import { QuestionCard } from "./QuestionCard";
import { XpPopup } from "./XpPopup";
import { LevelComplete } from "./LevelComplete";
import { AdSlot } from "@/components/monetization/AdSlot";
import { HireMeCta } from "@/components/monetization/HireMeCta";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useProgress } from "@/components/providers/ProgressProvider";
import { selectLevelQuestions } from "@/lib/question-selection";
import { answerXp, levelCompleteBonus } from "@/lib/scoring";
import { PASS_THRESHOLD } from "@/lib/constants";
import { LEVEL_ORDER } from "@/data/levels";
import { cn } from "@/lib/utils";

interface QuizEngineProps {
  track: Track;
  level: Level;
  category: CategoryMeta;
}

type Phase = "playing" | "complete";

interface FinalSummary {
  score: number;
  total: number;
  xpEarned: number;
  bestStreak: number;
  levelBonus: number;
  passed: boolean;
  newBadgeIds: string[];
}

/**
 * The main quiz engine for a single level.
 *
 * Owns the full play loop: select questions (no-repeat), present them one at a
 * time, score with the hint-aware model, track streak + live XP, reveal
 * explanations, and on finish submit a LevelResult to the progress provider
 * (XP, streak, badges, completed levels, solved-question ids → localStorage).
 */
export function QuizEngine({ track, level, category }: QuizEngineProps) {
  const { t, tc } = useLanguage();
  const { progress, hydrated, submitLevel } = useProgress();

  // Select the question set once, after hydration, so no-repeat reads stored ids.
  const questions = useMemo<Question[]>(() => {
    if (!hydrated) return [];
    return selectLevelQuestions(track.id, level.id, progress.tracks[track.id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, track.id, level.id]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [xpDelta, setXpDelta] = useState<number | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  const [phase, setPhase] = useState<Phase>("playing");
  const [summary, setSummary] = useState<FinalSummary | null>(null);

  // Ids answered correctly this session (for no-repeat persistence).
  const solvedRef = useRef<string[]>([]);

  // Loading / hydration guard.
  if (!hydrated) {
    return (
      <Container className="py-12">
        <div className="mx-auto flex max-w-2xl items-center justify-center py-24">
          <Spinner size={40} />
        </div>
      </Container>
    );
  }

  // No questions for this level yet.
  if (questions.length === 0) {
    return (
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon={PackageOpen}
            title={t("quiz.empty")}
            action={
              <Link href={`/quiz/${category.slug}/${track.id}`}>
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                  {t("complete.backToRoadmap")}
                </Button>
              </Link>
            }
          />
        </div>
      </Container>
    );
  }

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;
  const answeredCount = answered ? index + 1 : index;

  function submit() {
    if (selected === null || answered) return;
    const correct = selected === question.correctOptionId;
    const delta = answerXp(level.id, { correct, hintUsed });

    setAnswered(true);
    setXp((x) => x + delta);
    setXpDelta(delta);
    setPopupKey((k) => k + 1);

    if (correct) {
      setScore((s) => s + 1);
      solvedRef.current.push(question.id);
      setStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setHintUsed(false);
      setXpDelta(null);
      return;
    }
    finish();
  }

  function finish() {
    const passed = total > 0 && (score / total) * 100 >= PASS_THRESHOLD;
    const bonus = passed ? levelCompleteBonus(level.id) : 0;
    const totalXp = xp + bonus;

    const result: LevelResult = {
      trackId: track.id,
      level: level.id,
      score,
      total,
      xpEarned: totalXp,
      solvedQuestionIds: solvedRef.current,
      passed,
      completedAt: new Date().toISOString(),
    };

    const outcome = submitLevel(result);
    setSummary({
      score,
      total,
      xpEarned: totalXp,
      bestStreak,
      levelBonus: bonus,
      passed,
      newBadgeIds: outcome.newBadgeIds,
    });
    setPhase("complete");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setHintUsed(false);
    setScore(0);
    setXp(0);
    setStreak(0);
    setBestStreak(0);
    setXpDelta(null);
    setSummary(null);
    solvedRef.current = [];
    setPhase("playing");
  }

  if (phase === "complete" && summary) {
    const currentIdx = LEVEL_ORDER.indexOf(level.id);
    const nextLevelId =
      summary.passed && currentIdx < LEVEL_ORDER.length - 1
        ? LEVEL_ORDER[currentIdx + 1]
        : null;

    return (
      <Container className="py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          <LevelComplete
            track={track}
            level={level}
            category={category.slug}
            score={summary.score}
            total={summary.total}
            xpEarned={summary.xpEarned}
            bestStreak={summary.bestStreak}
            levelBonus={summary.levelBonus}
            passed={summary.passed}
            newBadgeIds={summary.newBadgeIds}
            nextLevelId={nextLevelId}
            onRetry={restart}
          />

          {/* Post-completion monetization: lead funnel first, ad second —
              shown only after the user finishes, never mid-quiz. */}
          <HireMeCta compact />
          <AdSlot format="leaderboard" slotId="level-complete" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl">
        {/* Top bar: exit + level chip */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href={`/quiz/${category.slug}/${track.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("engine.exit")}
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br text-white",
                track.gradient,
              )}
            >
              <Icon name={track.icon} className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium">{tc(track.title)}</span>
            <Pill tone={level.isBoss ? "accent" : "neutral"}>
              {tc(level.title)}
            </Pill>
          </div>
        </div>

        {/* HUD */}
        <QuizHud
          answered={answeredCount}
          total={total}
          score={score}
          streak={streak}
          xp={xp}
        />

        {/* Question */}
        <div className="relative mt-6">
          <XpPopup delta={xpDelta} trigger={popupKey} />
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <QuestionCard
                question={question}
                selected={selected}
                answered={answered}
                hintUsed={hintUsed}
                isLast={isLast}
                onSelect={setSelected}
                onSubmit={submit}
                onNext={next}
                onUseHint={() => setHintUsed(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
