import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-nursing.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Étudiants infirmiers dans une salle de formation moderne"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24 flex lg:justify-end w-full">
        <div className="max-w-xl lg:translate-y-8 rounded-2xl bg-background/70 backdrop-blur-md ring-1 ring-border/40 shadow-strong p-6 sm:p-8 lg:p-10">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.18em] uppercase">
            IPMSchool · Rabat
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
            Votre Avenir en{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Soins de Santé
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
            Rejoignez une formation d'excellence qui vous prépare aux défis du
            monde médical moderne. Devenez l'infirmier(ère) que vous aspirez à être.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/programmes")}
              className="bg-gradient-hero shadow-medium text-lg group"
            >
              Découvrir nos Programmes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
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
