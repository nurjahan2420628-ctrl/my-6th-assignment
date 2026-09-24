import Link from "next/link";
import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0d0f0e]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between md:px-6">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ccff00] text-black">
            <Dumbbell size={16} />
          </span>

          <span className="font-display tracking-wider">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-white/40">
          © 2026 FitLog — Workout Library.
          Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}