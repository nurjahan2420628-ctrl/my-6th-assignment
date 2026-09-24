import Image from "next/image";
import Link from "next/link";

import {
  Clock3,
  Flame,
  Star,
  ChevronRight,
} from "lucide-react";

import type { Workout } from "@/types/workout";

export function WorkoutCard({
  w,
}: {
  w: Workout;
}) {
  return (
    <Link
      href={`/workouts/${w.id}`}
      className=" group block rounded-2xl border border-white/10 bg-[#111312] p-2 transition hover:-translate-y-1 hover:border-lime-300/30"
    >
      <div className="relative aspect-[1.25] overflow-hidden rounded-xl bg-black">

        <Image
          src={w.image}
          alt={w.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {w.muscleGroups.slice(0, 2).map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black text-black"
            >
              {group.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="px-2 pb-2 pt-4">

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-none">
            {w.name.toUpperCase()}
          </h3>

          <ChevronRight
            className="shrink-0 text-white/30 transition group-hover:text-[#ccff00]"
            size={18}
          />
        </div>

        <p className="mt-2 truncate text-xs text-white/45">
          {w.equipment}
        </p>

        <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold text-white/55">

          <span>
            <Clock3 size={13} className="mr-1 inline" />
            {w.duration} min
          </span>

          <span>
            <Flame size={13} className="mr-1 inline" />
            {w.caloriesBurned} kcal
          </span>

          <span>
            <Star size={13} className="mr-1 inline" />
            {w.rating}
          </span>

        </div>
      </div>
    </Link>
  );
}