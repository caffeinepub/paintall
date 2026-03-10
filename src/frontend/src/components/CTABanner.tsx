import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function CTABanner() {
  return (
    <section
      className="py-16 md:py-20 gradient-orange relative overflow-hidden"
      data-ocid="cta.section"
    >
      {/* Decorative bg elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Limited Time — Free Site Inspection
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            Get a Free Site Inspection Today
          </h2>
          <p className="text-white/85 text-lg md:text-xl max-w-xl mx-auto mb-8">
            Expert painters ready to transform your space. Book now and get a
            transparent quote within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-orange font-bold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-all shadow-lg hover:shadow-xl group"
              data-ocid="cta.primary_button"
            >
              Book Now — It's Free!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:9876543210"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full text-base hover:bg-white/10 transition-all"
              data-ocid="cta.secondary_button"
            >
              <Phone className="w-5 h-5" />
              Call: 98765 43210
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              ✅ No Advance Payment
            </span>
            <span className="flex items-center gap-1.5">
              ✅ Free Color Consultation
            </span>
            <span className="flex items-center gap-1.5">
              ✅ 1-Year Service Warranty
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
