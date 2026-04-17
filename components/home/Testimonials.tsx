"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 460 }}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {/* Full-section background photo */}
      <img
        src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto/brilliant-tutors/testimonial_background"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Overlay — let photo show through, keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(250,247,242,0)" }}
        aria-hidden="true"
      />

      {/* Embla drag surface — full section width */}
      <div ref={emblaRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <div className="flex h-full">
          {testimonials.map(({ firstName, author, date, quote }) => (
            <div
              key={author}
              className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center px-16 sm:px-24"
            >
              {/* Centered content column */}
              <div className="w-full max-w-[700px] text-center select-none py-8">
                <p
                  id="testimonials-heading"
                  className="text-primary font-semibold text-xs uppercase tracking-widest mb-4"
                >
                  Reviews
                </p>
                <p className="text-3xl font-bold text-primary mb-1">{firstName}</p>
                <p className="text-sm text-primary/50 mb-3">{date}</p>
                <div className="flex justify-center gap-1 mb-4" aria-label="5 stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-base sm:text-lg text-primary leading-8 mb-4">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <p className="text-sm text-primary/50 font-medium">{author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots — centered below content */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10"
        role="tablist"
        aria-label="Testimonial slides"
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === selected}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 h-1.5 ${
              i === selected ? "bg-accent w-5" : "bg-primary/25 w-1.5"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev arrow — far left edge */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 border border-slate-200 shadow-sm hover:bg-white hover:border-accent hover:text-accent text-slate-500 transition-colors"
        aria-label="Previous review"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next arrow — far right edge */}
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 border border-slate-200 shadow-sm hover:bg-white hover:border-accent hover:text-accent text-slate-500 transition-colors"
        aria-label="Next review"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}
