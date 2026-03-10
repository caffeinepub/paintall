import { Mail, MapPin, PaintBucket, Phone } from "lucide-react";

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
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-navy text-white" data-ocid="footer.section">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-orange flex items-center justify-center">
                <PaintBucket className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Paint<span className="text-brand-orange">All</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              India's most trusted professional painting service. Transforming
              homes and commercial spaces with premium quality finishes since
              2012.
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:9876543210"
                className="flex items-center gap-2.5 text-white/80 hover:text-brand-orange transition-colors text-sm group"
                data-ocid="footer.link"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                98765 43210
              </a>
              <a
                href="mailto:hello@paintall.in"
                className="flex items-center gap-2.5 text-white/80 hover:text-brand-orange transition-colors text-sm group"
                data-ocid="footer.link"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                hello@paintall.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Services", id: "services" },
                { label: "How It Works", id: "howitworks" },
                { label: "Projects", id: "projects" },
                { label: "Reviews", id: "reviews" },
                { label: "FAQ", id: "faq" },
                { label: "Book Free Visit", id: "booking" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="text-white/70 hover:text-brand-orange transition-colors text-sm"
                    data-ocid="footer.link"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Interior Spaces",
                "Villas / Bungalows",
                "Apartments",
                "Commercial Spaces",
                "Wallpapers",
                "Textures & Designs",
                "Wood Finishes",
                "Waterproofing",
              ].map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => scrollTo("services")}
                    className="text-white/70 hover:text-brand-orange transition-colors text-sm"
                    data-ocid="footer.link"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
              Cities We Serve
            </h4>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-lg"
                >
                  <MapPin className="w-2.5 h-2.5 text-brand-orange" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-xs">
          <p>© {year} PaintAll. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:text-brand-orange/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
