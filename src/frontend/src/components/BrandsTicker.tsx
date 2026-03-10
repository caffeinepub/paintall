import { motion } from "motion/react";

const brands = [
  { name: "Asian Paints", color: "#E63A1E", bg: "#FFF1EF" },
  { name: "Nerolac", color: "#4A3FA8", bg: "#F0EFFE" },
  { name: "Dulux", color: "#C8102E", bg: "#FFF0F2" },
  { name: "Indigo Paints", color: "#1E40AF", bg: "#EFF6FF" },
  { name: "Shalimar", color: "#15803D", bg: "#F0FDF4" },
  { name: "Berger Paints", color: "#D97706", bg: "#FFFBEB" },
  { name: "Birla Opus", color: "#7C3AED", bg: "#F5F3FF" },
];

export default function BrandsTicker() {
  const doubled = [...brands, ...brands];

  return (
    <section
      className="py-12 bg-white border-y border-border overflow-hidden"
      data-ocid="brands.section"
    >
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-2">
            Partners
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-navy">
            Brands We Trust
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            We use only premium, certified paints from India's most trusted
            brands
          </p>
        </motion.div>
      </div>

      {/* Auto-scrolling ticker */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-ticker whitespace-nowrap">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border border-border shadow-sm"
              style={{ backgroundColor: brand.bg }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: brand.color }}
              />
              <span
                className="font-heading font-bold text-sm whitespace-nowrap"
                style={{ color: brand.color }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
