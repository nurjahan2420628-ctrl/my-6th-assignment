"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import {
  Check,
  Clock3,
  ExternalLink,
  Flame,
  Search,
  Star,
  Trash2,
} from "lucide-react";

import { useFitLog } from "@/components/fitlog-provider";
import { Toast } from "@/components/toast";

import type { Workout } from "@/types/workout";

export default function MyPlan() {
  const {
    plan,
    saved,
    done,
    removeFromPlan,
    removeSaved,
    markDone,
    undoDone,
  } = useFitLog();

  const [tab, setTab] =
    useState<"plan" | "saved">("plan");

  const [query, setQuery] =
    useState("");

  const [toast, setToast] =
    useState("");

  const items = (
    tab === "plan"
      ? plan
      : saved
  ).filter((workout) =>
    `
      ${workout.name}
      ${workout.muscleGroups.join(" ")}
      ${workout.equipment}
    `
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  function showToast(message: string) {
    setToast(message);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-xs font-black tracking-[.25em] text-[#ccff00]">
            YOUR WORKOUT LOG
          </p>

          <h1 className="mt-2 font-display text-6xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Cap of five lifts for today.
            Finish them, then load more.
          </p>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-3">
          <Search
            size={16}
            className="text-white/40"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search your list"
            className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/25"
          />
        </label>
      </div>

     
      <div className="mt-8 grid gap-3 sm:grid-cols-3">

        <SummaryCard
          title="Exercises"
          value={plan.length}
        />

        <SummaryCard
          title="Minutes"
          value={totalMinutes}
        />

        <SummaryCard
          title="Calories"
          value={totalCalories}
        />

      </div>

     
      <div className="mt-10 flex border-b border-white/10">

        <button
          onClick={() => setTab("plan")}
          className={`px-5 py-3 text-xs font-black ${
            tab === "plan"
              ? "border-b-2 border-[#ccff00] text-white"
              : "text-white/35"
          }`}
        >
          TODAY'S PLAN
          <span className="ml-1 text-white/25">
            {plan.length}
          </span>
        </button>

        <button
          onClick={() => setTab("saved")}
          className={`px-5 py-3 text-xs font-black ${
            tab === "saved"
              ? "border-b-2 border-[#ccff00] text-white"
              : "text-white/35"
          }`}
        >
          SAVED
          <span className="ml-1 text-white/25">
            {saved.length}
          </span>
        </button>

      </div>

      
      {items.length > 0 ? (
        <div className="mt-6 space-y-3">

          {items.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              isSaved={tab === "saved"}
              completed={done.includes(
                workout.id
              )}
              onDone={() => {
                if (done.includes(workout.id)) {
                  undoDone(workout.id);

                  showToast(
                    "Workout marked as undone"
                  );
                } else {
                  markDone(workout.id);

                  showToast(
                    "Workout marked as done"
                  );
                }
              }}
              onRemove={() => {
                if (tab === "saved") {
                  removeSaved(workout.id);
                } else {
                  removeFromPlan(workout.id);
                }

                showToast(
                  "Workout removed"
                );
              }}
            />
          ))}

        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 py-20 text-center">

          <div className="mx-auto max-w-sm">

            <p className="font-display text-4xl">
              NOTHING HERE YET
            </p>

            <p className="mt-3 text-sm text-white/40">
              Browse the library and add a
              lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-xs font-black text-black"
            >
              GO TO WORKOUTS
            </Link>

          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}

    </section>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111312] p-5">

      <p className="text-xs font-bold uppercase tracking-widest text-white/35">
        {title}
      </p>

      <p className="mt-2 font-display text-4xl">
        {value}
      </p>

    </div>
  );
}

function PlanCard({
  workout,
  isSaved,
  completed,
  onDone,
  onRemove,
}: {
  workout: Workout;
  isSaved: boolean;
  completed: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-[#111312] p-3 sm:flex-row sm:items-center ${
        completed
          ? "border-[#ccff00]/40 opacity-70"
          : "border-white/10"
      }`}
    >

      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:w-40">

        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="160px"
        />

      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="font-display text-2xl">
              {workout.name.toUpperCase()}
            </h3>

            <p className="mt-1 text-xs text-white/40">
              {workout.equipment}
            </p>
          </div>

          {completed && (
            <span className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black text-black">
              DONE
            </span>
          )}

        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-white/45">

          <span>
            <Clock3
              size={13}
              className="mr-1 inline"
            />
            {workout.duration} min
          </span>

          <span>
            <Flame
              size={13}
              className="mr-1 inline"
            />
            {workout.caloriesBurned} kcal
          </span>

          <span>
            <Star
              size={13}
              className="mr-1 inline"
            />
            {workout.rating}
          </span>

        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">

        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/70 hover:text-white"
        >
          VIEW
          <ExternalLink size={13} />
        </Link>

        {!isSaved && (
          <button
            onClick={onDone}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-black ${
              completed
                ? "border border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00]"
                : "bg-white text-black"
            }`}
          >
            <Check size={13} />

            {completed
              ? "UNDO DONE"
              : "DONE"}
          </button>
        )}

        <button
          onClick={onRemove}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/40 hover:border-red-400/30 hover:text-red-300"
        >
          <Trash2 size={15} />
        </button>

      </div>
    </article>
  );
}