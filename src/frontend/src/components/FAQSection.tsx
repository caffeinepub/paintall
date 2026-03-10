import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { useGetFAQs } from "../hooks/useQueries";

const FALLBACK_FAQS = [
  {
    question: "How long does interior painting typically take?",
    answer:
      "A standard 2BHK (800–1000 sq ft) typically takes 3–4 days for interior painting. Larger homes like 3BHK or villas may take 5–7 days. The timeline depends on surface preparation, number of coats, and complexity of work like textures or murals.",
  },
  {
    question: "Do I need to move my furniture before painting?",
    answer:
      "We recommend clearing the area as much as possible for efficient work. Our team will help move heavy furniture within the room and cover everything with protective drop cloths. Electronics, valuables, and delicate items should be moved to a safe area before we begin.",
  },
  {
    question: "What paints do you use? Are they safe for children?",
    answer:
      "We use premium paints from trusted brands including Asian Paints, Nerolac, Dulux, and Berger. For children's rooms and nurseries, we specifically recommend and use low-VOC or zero-VOC paints that are safe for kids and pets. All paints are ISI certified.",
  },
  {
    question: "Do you provide a warranty on your painting work?",
    answer:
      "Yes! We provide a 1-year service warranty on all interior painting work. If any issues like peeling, cracking, or blistering occur within this period due to workmanship defects, we'll fix it free of charge. Exterior painting comes with a 2-year warranty.",
  },
  {
    question: "How is the painting cost calculated?",
    answer:
      "Painting costs depend on the area to be painted (in sq ft), type of paint chosen (distemper, emulsion, texture, etc.), number of coats, surface condition, and any special work like water-proofing or texture design. Use our cost calculator for an instant estimate, and book a free site visit for an exact quote.",
  },
  {
    question: "How soon can you start after booking?",
    answer:
      "After you submit a booking, our team will call you within 2 hours to schedule a free site inspection. Following the inspection and quote acceptance, we can typically start work within 2–3 business days. For urgent requirements, express scheduling is available in select cities.",
  },
];

export default function FAQSection() {
  const { data: faqData } = useGetFAQs();
  const faqs = faqData && faqData.length > 0 ? faqData : FALLBACK_FAQS;

  return (
    <section
      id="faq"
      className="py-16 md:py-20 bg-brand-warm-gray"
      data-ocid="faq.section"
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            FAQs
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to know about our painting services
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="bg-white rounded-2xl border border-border px-5 shadow-sm overflow-hidden"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-brand-navy hover:text-brand-orange hover:no-underline py-4 text-sm md:text-base">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4 pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <p className="font-semibold text-brand-navy mb-1">
            Still have questions?
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            We're here to help. Call us or book a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:9876543210"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-orange/90 transition-all"
              data-ocid="faq.primary_button"
            >
              📞 Call: 98765 43210
            </a>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-navy text-brand-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-navy hover:text-white transition-all"
              data-ocid="faq.secondary_button"
            >
              Book Free Visit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
