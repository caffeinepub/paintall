import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/generated/hero-interior.dim_1200x600.jpg",
    title: "Stunning interiors begin with perfectly executed painting",
    subtitle:
      "Professional painters delivering durable colors and elegant finishes",
    badge: "Interior Painting",
  },
  {
    image: "/assets/generated/hero-villa.dim_1200x600.jpg",
    title: "High-End Painting Services for Villas",
    subtitle: "Enhance your villa with elegant, durable finishes",
    badge: "Villa & Bungalow",
  },
  {
    image: "/assets/generated/hero-apartment.dim_1200x600.jpg",
    title: "Reliable professional painters available near you",
    subtitle:
      "Specialized painting solutions for high-rise apartments with a seamless finish",
    badge: "Apartment Painting",
  },
  {
    image: "/assets/generated/hero-commercial.dim_1200x600.jpg",
    title: "India's most dependable painting service provider",
    subtitle: "Elevate your commercial spaces with premium-quality finishes",
    badge: "Commercial Spaces",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      className="relative w-full h-[85vh] min-h-[520px] max-h-[780px] overflow-hidden bg-brand-navy"
      data-ocid="hero.section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 gradient-hero" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block bg-brand-orange/90 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                {slides[current].badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight mb-4"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl mb-8"
            >
              {slides[current].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                type="button"
                onClick={scrollToBooking}
                className="bg-brand-orange text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-brand-orange/90 transition-all shadow-lg hover:shadow-brand-orange/30 hover:shadow-xl btn-shine"
                data-ocid="hero.primary_button"
              >
                Get Free Estimate
              </button>
              <a
                href="tel:9876543210"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 transition-all"
                data-ocid="hero.secondary_button"
              >
                📞 Call Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"
        aria-label="Previous slide"
        data-ocid="hero.secondary_button"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"
        aria-label="Next slide"
        data-ocid="hero.secondary_button"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, i) => (
          <button
            type="button"
            key={slide.badge}
            onClick={() => goTo(i)}
            className={`transition-all rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-brand-orange"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
