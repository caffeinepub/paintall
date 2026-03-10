import { Clock, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  {
    icon: Shield,
    title: "Perfect Finish, Assured!",
    desc: "We take pride in every brushstroke we deliver",
  },
  {
    icon: Clock,
    title: "Timely Project Completion, Assured!",
    desc: "We value your time and finish every job as committed",
  },
  {
    icon: Sparkles,
    title: "Complete Cleanup After Painting!",
    desc: "We ensure your space is neat and spotless once the work is done",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-brand-navy py-5" data-ocid="trust.section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 bg-brand-navy px-6 py-4 sm:py-5"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-snug">
                  {badge.title}
                </p>
                <p className="text-white/60 text-xs mt-0.5">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
