import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, IndianRupee } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PAINT_TYPES = [
  { label: "Distemper — ₹10/sq ft", value: "distemper", rate: 10 },
  { label: "Emulsion — ₹20/sq ft", value: "emulsion", rate: 20 },
  { label: "Luxury Emulsion — ₹40/sq ft", value: "luxury", rate: 40 },
  { label: "Texture Paint — ₹80/sq ft", value: "texture", rate: 80 },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CostCalculator() {
  const [area, setArea] = useState("");
  const [paintType, setPaintType] = useState("");
  const [coats, setCoats] = useState("2");

  const selectedPaint = PAINT_TYPES.find((p) => p.value === paintType);
  const areaNum = Number.parseFloat(area) || 0;
  const coatsNum = Number.parseInt(coats) || 1;

  const baseEstimate = areaNum * (selectedPaint?.rate ?? 0) * coatsNum;
  const minEstimate = Math.floor(baseEstimate * 0.85);
  const maxEstimate = Math.ceil(baseEstimate * 1.15);

  const hasEstimate = baseEstimate > 0;

  return (
    <section
      id="calculator"
      className="py-16 md:py-20 bg-white"
      data-ocid="calculator.section"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Cost Estimator
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy mb-4">
              Estimate Your Painting Cost
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Get an instant estimate for your painting project. Our calculator
              gives you a realistic cost range in seconds.
            </p>

            <div className="space-y-3">
              {[
                "✅ Transparent, no-surprise pricing",
                "✅ Includes labour, material & primer",
                "✅ On-site quote may vary slightly",
                "✅ Get detailed quote after site visit",
              ].map((item) => (
                <p key={item} className="text-brand-navy font-medium text-sm">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right calculator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-brand-warm-gray rounded-3xl p-7 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy">
                  Paint Cost Calculator
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-brand-navy font-medium text-sm mb-1.5 block">
                    Room Area (in sq ft)
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 500"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    min="0"
                    className="bg-white border-border"
                    data-ocid="calculator.input"
                  />
                </div>

                <div>
                  <Label className="text-brand-navy font-medium text-sm mb-1.5 block">
                    Paint Type
                  </Label>
                  <Select value={paintType} onValueChange={setPaintType}>
                    <SelectTrigger
                      className="bg-white border-border"
                      data-ocid="calculator.select"
                    >
                      <SelectValue placeholder="Select paint type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAINT_TYPES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-navy font-medium text-sm mb-1.5 block">
                    Number of Coats
                  </Label>
                  <Select value={coats} onValueChange={setCoats}>
                    <SelectTrigger
                      className="bg-white border-border"
                      data-ocid="calculator.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Coat</SelectItem>
                      <SelectItem value="2">2 Coats (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result */}
                {hasEstimate ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-brand-navy rounded-2xl p-5 text-white"
                  >
                    <p className="text-white/70 text-sm mb-1">
                      Estimated Cost Range
                    </p>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-brand-orange" />
                      <span className="font-display font-bold text-2xl">
                        {formatINR(minEstimate)} – {formatINR(maxEstimate)}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-2">
                      Based on {area} sq ft × {selectedPaint?.rate}₹/sqft ×{" "}
                      {coats} coat(s) ± 15%
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("booking")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="mt-4 w-full bg-brand-orange text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-orange/90 transition-all btn-shine"
                      data-ocid="calculator.primary_button"
                    >
                      Book Free Site Visit for Exact Quote
                    </button>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 border border-dashed border-border text-center">
                    <Calculator className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">
                      Enter area and select paint type to see your estimate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
