"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useCallback, useEffect, useRef, useState } from "react";

const ease = "easeOut" as const;

const CDN = "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_900/brilliant-tutors";
const slides = [
  { src: `${CDN}/slideshow1`, alt: "Celebrating excellence — Brilliant Tutors Academy" },
  { src: `${CDN}/slideshow2`, alt: "Student success at Brilliant Tutors Academy" },
  { src: `${CDN}/slideshow3`, alt: "Award ceremony at Brilliant Tutors Academy" },
  { src: `${CDN}/slideshow4`, alt: "Class session at Brilliant Tutors Academy" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-primary-foreground"
      style={{ background: "linear-gradient(135deg, #1A3EBF 0%, #1535A8 60%, #122D91 100%)" }}
    >
      {/* Subtle background circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0, ease }}
              className="text-accent font-semibold text-xs uppercase tracking-widest mb-4"
            >
              Reading&apos;s trusted 11+ specialists
            </motion.p>

            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Help your child{" "}
              <em className="not-italic text-accent">thrive</em>{" "}
              and succeed
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg text-primary-foreground/80 leading-7 mb-8 max-w-lg"
            >
              Expert 11+ and GCSE preparation in Reading, Berkshire. Helping pupils
              earn places at Kendrick, Reading School and grammar schools across the
              county since 2015.
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors min-h-[48px]"
              >
                Book free assessment
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-full hover:border-accent hover:text-accent transition-colors min-h-[48px]"
              >
                View courses
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="inline-flex items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/15 rounded-full px-4 py-2 text-sm">
                <span className="text-accent font-bold">500+</span>
                <span className="text-primary-foreground/80">students placed at grammar schools</span>
              </div>
              <img
                src="https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto,w_60/brilliant-tutors/logo"
                alt="Brilliant Tutors Academy"
                width={60}
                height={60}
                className="opacity-90"
              />
            </motion.div>
          </div>

          {/* Right column — slideshow */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="hidden lg:block"
          >
            <HeroSlideshow />
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 48h1440V24C1200 0 960 48 720 48S240 0 0 24V48z" fill="white" />
        </svg>
      </div>

      <div className="h-12" aria-hidden="true" />
    </section>
  );
}

function HeroSlideshow() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade(), autoplay.current]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="select-none">
      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 relative"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover rounded-2xl"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slideshow navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: 6,
              height: 6,
              background: i === activeIndex ? "#f5a623" : "#ffffff40",
              transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
