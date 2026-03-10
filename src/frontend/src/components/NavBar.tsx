import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PaintBucket, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#howitworks" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#booking" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      data-ocid="nav.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg gradient-orange flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <PaintBucket className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-brand-navy leading-none block">
                Paint<span className="text-brand-orange">All</span>
              </span>
              <span className="text-[10px] text-muted-foreground leading-none tracking-wide uppercase">
                Trusted Since 2012
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-brand-orange transition-colors rounded-lg hover:bg-brand-orange/5"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:9876543210"
              className="hidden sm:flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-orange/90 transition-all shadow-sm hover:shadow-md btn-shine"
              data-ocid="nav.primary_button"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Call: 98765 43210</span>
              <span className="md:hidden">Call Now</span>
            </a>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-ocid="nav.toggle"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
                    <PaintBucket className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-lg text-brand-navy">
                    Paint<span className="text-brand-orange">All</span>
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      type="button"
                      key={link.href}
                      onClick={() => handleNav(link.href)}
                      className="text-left px-4 py-3 text-base font-medium text-foreground hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-colors"
                      data-ocid="nav.link"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-6">
                  <a
                    href="tel:9876543210"
                    className="flex items-center justify-center gap-2 bg-brand-orange text-white px-4 py-3 rounded-xl text-base font-semibold hover:bg-brand-orange/90 transition-all"
                    data-ocid="nav.primary_button"
                  >
                    <Phone className="w-4 h-4" />📞 Call: 98765 43210
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
