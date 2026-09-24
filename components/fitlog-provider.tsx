"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Workout } from "@/types/workout";

type FitLogContextValue = {
  plan: Workout[];
  saved: Workout[];
  done: number[];

  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;

  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;

  markDone: (id: number) => void;
  undoDone: (id: number) => void;
};

const FitLogContext =
  createContext<FitLogContextValue | null>(null);

const STORAGE_KEY = "fitlog-state-v1";

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const data = JSON.parse(stored);

        setPlan(data.plan ?? []);
        setSaved(data.saved ?? []);
        setDone(data.done ?? []);
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data",
        error
      );
    } finally {
      setReady(true);
    }
  }, []);

  
  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        plan,
        saved,
        done,
      })
    );
  }, [plan, saved, done, ready]);

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,

      
      addToPlan: (workout: Workout) => {
        if (
          plan.some(
            (item) => item.id === workout.id
          )
        ) {
          return false;
        }

        
        if (plan.length >= 5) {
          return false;
        }

        setPlan((current) => [
          ...current,
          workout,
        ]);

        return true;
      },

      saveForLater: (workout: Workout) => {
        if (
          saved.some(
            (item) => item.id === workout.id
          )
        ) {
          return false;
        }

        setSaved((current) => [
          ...current,
          workout,
        ]);

        return true;
      },

      
      removeFromPlan: (id: number) => {
        setPlan((current) =>
          current.filter(
            (item) => item.id !== id
          )
        );
      },

      removeSaved: (id: number) => {
        setSaved((current) =>
          current.filter(
            (item) => item.id !== id
          )
        );
      },

    
      markDone: (id: number) => {
        setDone((current) =>
          current.includes(id)
            ? current
            : [...current, id]
        );
      },

      
      undoDone: (id: number) => {
        setDone((current) =>
          current.filter(
            (workoutId) => workoutId !== id
          )
        );
      },
    }),
    [plan, saved, done]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}