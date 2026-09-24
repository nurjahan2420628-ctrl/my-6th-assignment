import Image from "next/image";
import Link from "next/link";


export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#080909]">
      
     
      <div className="absolute inset-0 grid-bg opacity-60" />

     
      <div className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#ccff00]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center px-4 py-10 md:min-h-[650px] md:grid-cols-[1fr_1fr] md:px-6 md:py-16">

       
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

        
        <div className="relative mt-8 flex min-h-[420px] items-center justify-center md:mt-0 md:min-h-[620px]">

          
          <div className="absolute h-[320px] w-[320px] rounded-full bg-[#ccff00]/10 blur-[80px] sm:h-[420px] sm:w-[420px]" />

         
          <div className="absolute h-[340px] w-[340px] rounded-full border border-[#ccff00]/20 sm:h-[470px] sm:w-[470px]" />

          <div className="absolute h-[270px] w-[270px] rounded-full border border-white/5 sm:h-[390px] sm:w-[390px]" />

          <Image
            src="/banner.png"
            alt="Workout exercise"
            width={550}
            height={550}
            priority
            className="relative z-10 h-auto w-[85%] max-w-[550px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />

          

          

        </div>

      </div>
    </section>
  );
}