import {
  ClipboardList,
  FileCheck2,
  PaintBucket,
  Palette,
  PartyPopper,
  SearchCheck,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Book Site Inspection",
    desc: "Schedule a free visit at your convenience",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Accept Quotation",
    desc: "Review and approve our transparent estimate",
  },
  {
    number: "03",
    icon: Palette,
    title: "Colour Consultation",
    desc: "Choose from 1500+ colours with expert guidance",
  },
  {
    number: "04",
    icon: PaintBucket,
    title: "Painting Begins",
    desc: "Skilled painters begin work on schedule",
  },
  {
    number: "05",
    icon: SearchCheck,
    title: "Quality Inspection",
    desc: "Rigorous 20-point quality check conducted",
  },
  {
    number: "06",
    icon: PartyPopper,
    title: "Handover",
    desc: "Spotless cleanup & final walkthrough with you",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="py-16 md:py-20 bg-white"
      data-ocid="howitworks.section"
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
            Our Process
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-2">
            From booking to beautiful — our 6-step hassle-free process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-8 left-[8.33%] right-[8.33%] h-px bg-gradient-to-r from-brand-orange/20 via-brand-orange to-brand-orange/20" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
              >
                {/* Step node */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/25 relative z-10">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-brand-navy text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  {/* Vertical line for mobile */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-full h-8 w-px bg-brand-orange/30 mt-1" />
                  )}
                </div>

                <div className="md:mt-4">
                  <h3 className="font-heading font-bold text-brand-navy text-sm md:text-base">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-brand-orange text-white px-8 py-3.5 rounded-full font-semibold hover:bg-brand-orange/90 transition-all shadow-lg shadow-brand-orange/25 btn-shine"
            data-ocid="howitworks.primary_button"
          >
            Start the Process — Book Free Visit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
