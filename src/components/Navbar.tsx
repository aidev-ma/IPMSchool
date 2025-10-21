import { useState } from "react";
import { Menu, X } from "lucide-react";
import ipmsLogo from "@/assets/ipms-logo.jpg";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <img src={ipmsLogo} alt="IPMS Logo" className="h-12 w-auto object-contain" />
            <span className="font-display font-bold text-xl text-foreground">
              IPMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("programmes")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Programmes
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="text-foreground hover:text-primary transition-colors"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection("temoignages")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Témoignages
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-hero shadow-soft"
            >
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("accueil")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("programmes")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Programmes
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection("temoignages")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Témoignages
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-gradient-hero"
            >
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
