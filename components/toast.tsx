"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({
  message,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-lime-300/30 bg-[#d7ff35] px-5 py-3 text-sm font-bold text-black shadow-2xl">
      {message}
    </div>
  );
}