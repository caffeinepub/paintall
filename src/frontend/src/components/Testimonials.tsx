import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Bangalore",
    rating: 5,
    text: "PaintAll transformed our entire 3BHK in just 5 days! The painters were professional, punctual, and the finish is absolutely stunning. The colour consultation was the best part — they helped us pick the perfect palette.",
    project: "3BHK Interior",
  },
  {
    name: "Rajesh Mehta",
    city: "Mumbai",
    rating: 5,
    text: "We had our villa repainted after 8 years and we're blown away by the quality. The waterproofing treatment they did on the exterior walls was excellent. No mess, no delays — highly recommend!",
    project: "Villa Exterior",
  },
  {
    name: "Sunita Krishnan",
    city: "Hyderabad",
    rating: 5,
    text: "The texture painting they did in our living room is absolutely gorgeous. Got so many compliments from guests. The team cleaned up everything perfectly after the work. Worth every rupee!",
    project: "Texture Design",
  },
  {
    name: "Amit Joshi",
    city: "Pune",
    rating: 5,
    text: "Used PaintAll for our office renovation. They finished the 4000 sqft space over a weekend so we had zero business disruption. Professional team, great communication throughout.",
    project: "Commercial Office",
  },
  {
    name: "Deepa Nair",
    city: "Chennai",
    rating: 5,
    text: "My kids' bedroom looks magical now! They did beautiful cloud murals and the bright colours make my daughter so happy. They used child-safe paints as promised. Absolutely fantastic service!",
    project: "Kids Bedroom",
  },
];

const STAR_POSITIONS = ["first", "second", "third", "fourth", "fifth"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_POSITIONS.slice(0, count).map((pos) => (
        <Star key={pos} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="py-16 md:py-20 bg-brand-warm-gray"
      data-ocid="reviews.section"
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
            Customer Reviews
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
            What People Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-display font-bold text-xl text-brand-navy">
              4.8/5
            </span>
            <span className="text-muted-foreground">
              · Based on 2,400+ reviews
            </span>
          </div>
        </motion.div>

        {/* Cards — horizontal scroll on mobile */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 snap-x snap-mandatory md:overflow-x-visible md:snap-none scrollbar-none">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex-shrink-0 w-72 md:w-auto snap-center md:snap-none"
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="bg-white rounded-2xl p-5 h-full shadow-sm hover:shadow-md transition-shadow border border-border relative">
                <Quote className="absolute top-4 right-4 w-6 h-6 text-brand-orange/20" />

                <StarRating count={t.rating} />

                <p className="text-foreground/80 text-sm leading-relaxed mt-3 mb-4 line-clamp-4">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{t.city}</p>
                  </div>
                  <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {t.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
