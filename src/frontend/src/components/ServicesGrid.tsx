import {
  Briefcase,
  Building2,
  Droplets,
  Home,
  Layers,
  Palette,
  TreePine,
  Wallpaper,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    desc: "Living rooms, bedrooms, and kitchens with smooth, high-quality interior finishes",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Building2,
    title: "Villas & Bungalows",
    desc: "High-end painting solutions for spacious residential homes",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Layers,
    title: "Multi-Story Apartments",
    desc: "Reliable and efficient painting for tall residential buildings",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Briefcase,
    title: "Commercial Properties",
    desc: "Ideal for offices, showrooms, and professional workspaces",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Wallpaper,
    title: "Wallpaper Installation",
    desc: "Professional wallpaper installation and careful removal",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Palette,
    title: "Decorative Textures & Designs",
    desc: "Tailor-made textures, stencil work, and decorative wall patterns",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: TreePine,
    title: "Wood Surface Finishing",
    desc: "Expert polishing, staining, and lacquer finishing for wooden surfaces",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
  },
  {
    icon: Droplets,
    title: "Protective Waterproofing",
    desc: "Safeguard your property from dampness and water seepage",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export default function ServicesGrid() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="py-16 md:py-20 bg-brand-warm-gray"
      data-ocid="services.section"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Our Solutions
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
            Schedule Our Services
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Expert painting services tailored for every space and budget
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.button
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToBooking}
              className="group bg-white rounded-2xl p-5 md:p-6 text-left shadow-sm hover:shadow-lg transition-all border border-border hover:border-brand-orange/30 cursor-pointer"
              data-ocid="services.button"
            >
              <div
                className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-sm md:text-base leading-snug mb-1">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {service.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
