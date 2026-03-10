import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllProjects } from "../hooks/useQueries";

const fallbackProjects = [
  {
    title: "Modern Living Room Makeover",
    category: "Interior",
    description: "Warm terracotta accent wall with premium emulsion paint",
    image: "/assets/generated/project-living.dim_600x400.jpg",
  },
  {
    title: "Master Bedroom Transformation",
    category: "Bedroom",
    description: "Sage green accent wall with luxury emulsion finish",
    image: "/assets/generated/project-bedroom.dim_600x400.jpg",
  },
  {
    title: "Kids Bedroom — Fun & Safe",
    category: "Kids Room",
    description: "Cheerful cloud mural with child-safe zero-VOC paints",
    image: "/assets/generated/project-kids.dim_600x400.jpg",
  },
  {
    title: "Villa Exterior Repaint",
    category: "Exterior",
    description: "Weather-proof exterior coating for long-lasting protection",
    image: "/assets/generated/project-exterior.dim_600x400.jpg",
  },
  {
    title: "Luxury Penthouse Interior",
    category: "Premium",
    description: "Custom texture walls with metallic accents",
    image: "/assets/generated/project-living.dim_600x400.jpg",
  },
  {
    title: "Corporate Office Repaint",
    category: "Commercial",
    description: "Brand-aligned colour scheme for modern workspace",
    image: "/assets/generated/project-exterior.dim_600x400.jpg",
  },
];

const categoryColors: Record<string, string> = {
  Interior: "bg-orange-500",
  Bedroom: "bg-purple-500",
  "Kids Room": "bg-pink-500",
  Exterior: "bg-green-600",
  Premium: "bg-amber-600",
  Commercial: "bg-blue-600",
};

export default function ProjectsGallery() {
  const { data: projectsData } = useGetAllProjects();

  const projects =
    projectsData && projectsData.length > 0
      ? projectsData.slice(0, 6).map((p, i) => ({
          title: p.title,
          category: p.category,
          description: p.description,
          image: fallbackProjects[i % fallbackProjects.length].image,
        }))
      : fallbackProjects;

  return (
    <section
      id="projects"
      className="py-16 md:py-20 bg-brand-warm-gray"
      data-ocid="projects.section"
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
            Portfolio
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
            Our Recent Projects
          </h2>
          <p className="text-muted-foreground mt-2">
            Real transformations. Real customer homes.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="break-inside-avoid"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
                <div
                  className={`relative ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"} overflow-hidden`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`${categoryColors[project.category] || "bg-brand-orange"} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-heading font-bold text-brand-navy text-sm md:text-base leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 border-2 border-brand-navy text-brand-navy px-8 py-3 rounded-full font-semibold hover:bg-brand-navy hover:text-white transition-all"
            data-ocid="projects.button"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
