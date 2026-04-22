import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import schoolLogo from "@/assets/ipm-school-logo.png";
import { Button } from "./ui/button";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/programmes", label: "Programmes" },
  { to: "/a-propos", label: "À Propos" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" onClick={close} className="flex h-full items-center cursor-pointer">
            <img src={schoolLogo} alt="Logo IPMSchool" className="h-14 sm:h-[3.75rem] w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Button
              onClick={() => navigate("/contact")}
              className="bg-gradient-hero shadow-soft"
            >
              Contact
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={close}
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                close();
                navigate("/contact");
              }}
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
