"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell,
  Layers3,
  Bookmark,
} from "lucide-react";

import { useFitLog } from "@/components/fitlog-provider";

export function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080909]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ccff00] text-black">
            <Dumbbell size={19} />
          </span>

          <span className="font-display text-xl tracking-wide">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              pathname === "/"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              pathname === "/my-plan"
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            MY PLAN
          </Link>
        </nav>

        <Link
          href="/my-plan"
          className="flex items-center gap-2"
        >
          <span className="hidden rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black text-black sm:inline-flex">
            <Layers3 size={14} className="mr-1" />
            PLAN {plan.length}
          </span>

          <span className="rounded-full border border-white/25 px-3 py-2 text-xs font-black">
            <Bookmark size={14} className="mr-1 inline" />
            SAVED {saved.length}
          </span>
        </Link>
      </div>

      
      <div className="mx-auto flex max-w-7xl gap-2 px-4 pb-3 md:hidden">
        <Link
          href="/"
          className={`flex-1 rounded-xl py-2 text-center text-xs font-bold ${
            pathname === "/"
              ? "bg-white text-black"
              : "bg-white/5 text-white/60"
          }`}
        >
          WORKOUT
        </Link>

        <Link
          href="/my-plan"
          className={`flex-1 rounded-xl py-2 text-center text-xs font-bold ${
            pathname === "/my-plan"
              ? "bg-white text-black"
              : "bg-white/5 text-white/60"
          }`}
        >
          MY PLAN
        </Link>
      </div>
    </header>
  );
}