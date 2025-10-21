import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-nursing.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Étudiants infirmiers dans une salle de formation moderne"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Votre Avenir en{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Soins de Santé
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Rejoignez une formation d'excellence qui vous prépare aux défis du
            monde médical moderne. Devenez l'infirmier(ère) que vous aspirez à être.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("programmes")}
              className="bg-gradient-hero shadow-medium text-lg group"
            >
              Découvrir nos Programmes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="text-lg border-2"
            >
              Nous Contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
