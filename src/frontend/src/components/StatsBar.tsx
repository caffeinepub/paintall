import { Award, CheckCircle2, MapPin, Smile } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useGetStats } from "../hooks/useQueries";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    const startTime = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
}

function StatItem({
  icon: Icon,
  value,
  label,
  suffix = "+",
  delay = 0,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display =
    value >= 10000
      ? `${(count / 1000).toFixed(count >= value ? 1 : 0)}K`
      : count.toLocaleString("en-IN");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center py-8 px-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-7 h-7 text-brand-orange" />
      </div>
      <div className="font-display font-bold text-4xl md:text-5xl text-brand-navy">
        {display}
        <span className="text-brand-orange">{suffix}</span>
      </div>
      <p className="text-muted-foreground font-medium mt-1 text-sm uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsBar() {
  const { data: stats } = useGetStats();

  const projectsCompleted = stats ? Number(stats.projectsCompleted) : 15000;
  const citiesServed = stats ? Number(stats.citiesServed) : 20;
  const happyCustomers = stats ? Number(stats.happyCustomers) : 5000;
  const yearsExperience = stats ? Number(stats.yearsExperience) : 12;

  return (
    <section
      className="py-4 bg-white border-b border-border"
      data-ocid="stats.section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border divide-y md:divide-y-0">
          <StatItem
            icon={CheckCircle2}
            value={projectsCompleted}
            label="Projects Completed"
            delay={0}
          />
          <StatItem
            icon={MapPin}
            value={citiesServed}
            label="Cities Served"
            delay={0.1}
          />
          <StatItem
            icon={Smile}
            value={happyCustomers}
            label="Happy Customers"
            delay={0.2}
          />
          <StatItem
            icon={Award}
            value={yearsExperience}
            label="Years Experience"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
