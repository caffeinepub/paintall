import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle2, Loader2, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "../hooks/useQueries";

const CITIES = [
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Noida",
  "Gurgaon",
  "Other",
];

const SERVICE_TYPES = [
  "Interior Spaces",
  "Villas / Bungalows",
  "High-Rise Apartments",
  "Commercial Spaces",
  "Wallpapers",
  "Textures & Designs",
  "Wood Finishes",
  "Waterproofing",
];

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitBooking, isPending } = useSubmitBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city || !serviceType) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await submitBooking({
        name: name.trim(),
        phone: phone.trim(),
        city,
        serviceType,
        message: message.trim() || null,
      });
      setSubmitted(true);
      toast.success("Booking submitted! We'll call you soon.");
    } catch {
      toast.error("Failed to submit. Please try again or call us directly.");
    }
  };

  return (
    <section
      id="booking"
      className="py-16 md:py-20 bg-brand-navy relative overflow-hidden"
      data-ocid="booking.section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-orange" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Complimentary Site Visit
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-4">
              Schedule a Free Site Inspection
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Our specialist will visit your property, evaluate the work
              required, and offer a clear, no-obligation quote.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Calendar,
                  title: "Fast Appointment Booking",
                  desc: "On-site visit arranged within 24–48 hours",
                },
                {
                  icon: Phone,
                  title: "Professional Consultation",
                  desc: "Expert advice on colours and material selection",
                },
                {
                  icon: MapPin,
                  title: "Serving 20+ Cities",
                  desc: "Service availability across India",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-7 shadow-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                  data-ocid="booking.success_state"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-navy mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you! Our team will call you within 2 hours to schedule
                    your free site visit.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                  >
                    Book Another Visit
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-1">
                      Schedule Your Free Visit
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Fill in your details and we'll get in touch
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label
                        htmlFor="name"
                        className="text-brand-navy font-medium text-sm mb-1.5 block"
                      >
                        Full Name <span className="text-brand-orange">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-border focus:border-brand-orange focus:ring-brand-orange/20"
                        data-ocid="booking.input"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label
                        htmlFor="phone"
                        className="text-brand-navy font-medium text-sm mb-1.5 block"
                      >
                        Phone Number{" "}
                        <span className="text-brand-orange">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        type="tel"
                        className="border-border focus:border-brand-orange"
                        data-ocid="booking.input"
                      />
                    </div>

                    <div>
                      <Label className="text-brand-navy font-medium text-sm mb-1.5 block">
                        City <span className="text-brand-orange">*</span>
                      </Label>
                      <Select value={city} onValueChange={setCity} required>
                        <SelectTrigger
                          className="border-border"
                          data-ocid="booking.select"
                        >
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-brand-navy font-medium text-sm mb-1.5 block">
                        Service Type{" "}
                        <span className="text-brand-orange">*</span>
                      </Label>
                      <Select
                        value={serviceType}
                        onValueChange={setServiceType}
                        required
                      >
                        <SelectTrigger
                          className="border-border"
                          data-ocid="booking.select"
                        >
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_TYPES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label
                        htmlFor="message"
                        className="text-brand-navy font-medium text-sm mb-1.5 block"
                      >
                        Additional Notes{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your requirements, area size, etc."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="border-border focus:border-brand-orange resize-none"
                        data-ocid="booking.textarea"
                      />
                    </div>
                  </div>

                  {isPending ? (
                    <div
                      className="flex items-center justify-center gap-2 py-3 text-muted-foreground"
                      data-ocid="booking.loading_state"
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                      <span>Submitting your booking…</span>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 rounded-xl text-base btn-shine"
                      data-ocid="booking.submit_button"
                    >
                      Book Site Visit — It's Free!
                    </Button>
                  )}

                  <p className="text-center text-xs text-muted-foreground">
                    No spam. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
