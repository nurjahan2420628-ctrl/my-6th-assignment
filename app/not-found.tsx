import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">

      <div>

        <p className="text-xs font-black tracking-[.25em] text-[#ccff00]">
          404 / OFF THE GRID
        </p>

        <h1 className="mt-3 font-display text-7xl">
          PAGE NOT FOUND
        </h1>

        <p className="mt-4 text-white/40">
          The route you requested does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black"
        >
          RETURN HOME
        </Link>

      </div>
    </div>
  );
}