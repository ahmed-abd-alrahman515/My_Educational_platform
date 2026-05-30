"use client";

import { motion } from "framer-motion";
import type { RoadmapNode } from "@/lib/roadmap";
import { LevelNode } from "./LevelNode";
import { cn } from "@/lib/utils";

interface LevelRoadmapProps {
  nodes: RoadmapNode[];
  onPlay: (node: RoadmapNode) => void;
}

/**
 * Game-style roadmap: a vertical spine connects the level nodes, which
 * alternate left/right on desktop and stack on mobile. The spine fills with a
 * glowing gradient up to the player's progress.
 */
export function LevelRoadmap({ nodes, onPlay }: LevelRoadmapProps) {
  const completedCount = nodes.filter((n) => n.state === "completed").length;
  // Fill the spine through completed nodes plus a little into the active one.
  const fillRatio =
    nodes.length > 1
      ? Math.min(
          (completedCount + 0.5) / nodes.length,
          completedCount === nodes.length ? 1 : 0.999,
        )
      : completedCount;

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Spine (desktop: centered; mobile: start-aligned) */}
      <div
        aria-hidden
        className="absolute bottom-0 top-0 w-0.5 -translate-x-1/2 rounded-full bg-line ltr:left-6 rtl:right-6 lg:left-1/2 lg:right-auto rtl:lg:right-auto"
      >
        <motion.div
          className="w-full rounded-full bg-gradient-to-b from-primary via-accent to-rose-500 shadow-[0_0_20px_rgba(129,140,248,0.5)]"
          initial={{ height: 0 }}
          whileInView={{ height: `${fillRatio * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>

      <ol className="space-y-10 lg:space-y-14">
        {nodes.map((node, i) => {
          const side = i % 2 === 0 ? "start" : "end";
          return (
            <li key={node.level.id} className="relative">
              {/* Spine node dot */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-7 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full ring-4 ring-background ltr:left-6 rtl:right-6 lg:left-1/2 lg:right-auto",
                  node.state === "completed"
                    ? "bg-success"
                    : node.state === "unlocked"
                      ? "bg-primary animate-pulse-glow"
                      : "bg-line",
                )}
              />

              {/* Node card: indented past spine on mobile; half-width on desktop */}
              <div
                className={cn(
                  "ps-16 lg:ps-0",
                  side === "start" ? "lg:pe-[calc(50%+2rem)]" : "lg:ps-[calc(50%+2rem)]",
                )}
              >
                <LevelNode node={node} side={side} onPlay={onPlay} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
