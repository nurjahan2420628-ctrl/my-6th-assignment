import Image from "next/image";
import Link from "next/link";


export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#080909]">
      
     
      <div className="absolute inset-0 grid-bg opacity-60" />

     
      <div className="absolute right-[-10%] top-[-20%] h-125 w-125 rounded-full bg-[#ccff00]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center px-4 py-10 md:min-h-162.5 md:grid-cols-[1fr_1fr] md:px-6 md:py-16">

       
        <div className="relative z-10">

          <p className="mb-5 text-xs font-black tracking-[0.3em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h5 className="font-display text-4xl leading-[0.95] tracking-normal sm:text-7xl lg:text-[45px]">
            TRAIN WITH INTENT. LOG <br />EVERY SET.
            
          </h5>

          <p className="mt-7 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
           FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
           into today's plan, and watch the week's work add up.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              href="#library"
              className="inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:scale-105"
            >
              BROWSE WORKOUTS
              
            </Link>

            

          </div>

         
        </div>

        
        <div className="relative mt-8 flex min-h-105 items-center justify-center md:mt-0 md:min-h-155">

          
          <div className="absolute h-80 w-[320px] rounded-full bg-[#ccff00]/10 blur-[80px] sm:h-105 sm:w-105" />

         
          <div className="absolute h-85 w-85 rounded-full border border-[#ccff00]/20 sm:h-117.5 sm:w-117.5" />

          <div className="absolute h-67.5 w-67.5 rounded-full border border-white/5 sm:h-97.5 sm:w-97.5" />

          <Image
            src="/banner.png"
            alt="Workout exercise"
            width={550}
            height={550}
            priority
            className="relative z-10 h-auto w-[85%] max-w-137.5 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />

          

          

        </div>

      </div>
    </section>
  );
}