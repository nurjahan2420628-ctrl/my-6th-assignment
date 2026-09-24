"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bookmark,
  ListChecks,
  Plus,
} from "lucide-react";

import { useParams } from "next/navigation";

import { API_URL } from "@/lib/api";
import type { Workout } from "@/types/workout";

import { useFitLog } from "@/components/fitlog-provider";
import { Toast } from "@/components/toast";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();

  const [workout, setWorkout] =
    useState<Workout | null>(null);

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useFitLog();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const response = await fetch(
          `${API_URL}/${id}`
        );

        if (response.ok) {
          const result: Workout =
            await response.json();

          setWorkout(result);
          return;
        }

        const allResponse = await fetch(API_URL);

        const all: Workout[] =
          await allResponse.json();

        const found = all.find(
          (item) => item.id === Number(id)
        );

        setWorkout(found ?? null);
      } catch {
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#ccff00]" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-5xl">
          WORKOUT NOT FOUND
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black text-black"
        >
          BACK TO LIBRARY
        </Link>
      </div>
    );
  }

  /*
   * After the check above, workout cannot be null.
   * This gives TypeScript a definite Workout type.
   */
  const currentWorkout: Workout = workout;

  const inPlan = plan.some(
    (item) => item.id === currentWorkout.id
  );

  const isSaved = saved.some(
    (item) => item.id === currentWorkout.id
  );

  function handleAdd() {
  if (!workout) return;

  const success = addToPlan(workout);

  if (success) {
    setToast("Added to today's plan");
  } else if (plan.length >= 5) {
    setToast("Your plan is full");
  } else {
    setToast("Already in your plan");
  }
}

function handleSave() {
  if (!workout) return;

  const success = saveForLater(workout);

  setToast(
    success
      ? "Saved for later"
      : "Already saved"
  );
}

 

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-14">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-white/45 hover:text-white"
      >
        <ArrowLeft size={16} />
        BACK TO LIBRARY
      </Link>

      <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#0f1110] md:grid-cols-[.95fr_1.05fr]">
        <div className="relative min-h-[420px] bg-black md:min-h-[680px]">
          <Image
            src={currentWorkout.image}
            alt={currentWorkout.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {currentWorkout.muscleGroups.map(
              (group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black text-black"
                >
                  {group.toUpperCase()}
                </span>
              )
            )}
          </div>
        </div>

        <div className="p-6 md:p-10">
          <p className="text-xs font-black tracking-[.25em] text-[#ccff00]">
            WORKOUT DETAIL / #
            {String(currentWorkout.id).padStart(
              2,
              "0"
            )}
          </p>

          <h1 className="mt-3 font-display text-5xl leading-[.9] sm:text-7xl">
            {currentWorkout.name.toUpperCase()}
          </h1>

          <p className="mt-6 max-w-2xl leading-7 text-white/50">
            {currentWorkout.description}
          </p>

          <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
            <Stat
              title="EQUIPMENT"
              value={currentWorkout.equipment}
            />

            <Stat
              title="DIFFICULTY"
              value={currentWorkout.difficulty}
            />

            <Stat
              title="SETS"
              value={String(currentWorkout.sets)}
            />

            <Stat
              title="REPS"
              value={currentWorkout.reps}
            />

            <Stat
              title="DURATION"
              value={`${currentWorkout.duration} min`}
            />

            <Stat
              title="CALORIES"
              value={`${currentWorkout.caloriesBurned} kcal`}
            />

            <Stat
              title="RATING"
              value={String(currentWorkout.rating)}
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <ListChecks
                size={18}
                className="text-[#ccff00]"
              />

              <h2 className="font-display text-2xl">
                INSTRUCTIONS
              </h2>
            </div>

            <ol className="mt-4 space-y-3">
              {currentWorkout.instructions.map(
                (instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-3 rounded-xl border border-white/5 bg-white/[.02] p-3 text-sm text-white/60"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black text-white">
                      {index + 1}
                    </span>

                    {instruction}
                  </li>
                )
              )}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              disabled={
                inPlan || plan.length >= 5
              }
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={18} />

              {inPlan
                ? "IN TODAY'S PLAN"
                : plan.length >= 5
                ? "PLAN FULL"
                : "ADD TO TODAY'S PLAN"}
            </button>

            <button
              onClick={handleSave}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-black ${
                isSaved
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-white/15 text-white"
              }`}
            >
              <Bookmark size={18} />

              {isSaved
                ? "SAVED"
                : "SAVE FOR LATER"}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}
    </section>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border-b border-r border-white/10 p-4">
      <p className="text-[9px] font-black tracking-widest text-white/35">
        {title}
      </p>

      <p className="mt-2 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}