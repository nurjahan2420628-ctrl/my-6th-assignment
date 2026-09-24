"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Hero } from "@/components/hero";
import { WorkoutCard } from "@/components/workout-card";
import type { Workout } from "@/types/workout";
import { API_URL } from "@/lib/api";

type SortOption = "duration" | "calories" | "rating";

export default function Home() {
  const [data, setData] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [search, setSearch] = useState("");

  
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return response.json();
      })
      .then((result: Workout[]) => {
       
        const sortedWorkouts = [...result].sort(
          (a, b) => a.id - b.id
        );

        setData(sortedWorkouts);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  
  const filteredData = data.filter((workout) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    const workoutName = workout.name.toLowerCase();

    const muscleGroups = workout.muscleGroups
      .join(" ")
      .toLowerCase();

    const equipment = workout.equipment.toLowerCase();

    return (
      workoutName.includes(query) ||
      muscleGroups.includes(query) ||
      equipment.includes(query)
    );
  });


  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <>
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"
      >
        
        <div className="mb-8">
          <h2 className="font-display text-5xl sm:text-6xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Choose a workout and start your session.
          </p>
        </div>

        
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workouts or tags..."
              className="w-full rounded-lg border border-white/10 bg-[#111312] py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#ccff00]"
            />

           
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

           
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white/45">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                className="appearance-none rounded-lg border border-white/10 bg-[#111312] py-2.5 pl-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
              />
            </div>
          </div>
        </div>

       
        {loading ? (
          <div className="py-20 text-center text-white/40">
            Loading workouts...
          </div>
        ) : sortedData.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedData.map((workout) => (
              <WorkoutCard
                key={workout.id}
                w={workout}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#111312] py-16 text-center">
            <p className="text-white/50">
              No workouts found.
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-bold text-[#ccff00]"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}