import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, GraduationCap, Building2, Users, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-nursing.jpg";

const stats = [
  { icon: GraduationCap, number: "3", label: "Filières paramédicales" },
  { icon: Building2, number: "100%", label: "Stages hospitaliers" },
  { icon: Users, number: "1500+", label: "Heures de formation" },
  { icon: HeartHandshake, number: "100%", label: "Engagement apprenants" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="accueil" className="relative pt-16 bg-background">
      {/* HERO — Mobile / Tablette : layout empilé */}
      <div className="lg:hidden">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          <img
            src={heroImage}
            alt="Étudiants infirmiers IPMSchool en milieu hospitalier"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight tracking-tight">
            Votre Avenir en{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Soins de Santé
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground mb-6 leading-relaxed">
            Formation d'excellence pour devenir l'infirmier(ère) que vous aspirez à être.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => navigate("/programmes")}
              className="bg-gradient-hero shadow-medium text-base group w-full sm:w-auto"
            >
              Découvrir nos Programmes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/inscription")}
              className="text-base border-2 w-full sm:w-auto"
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </div>

      {/* HERO — Desktop : superposé */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Étudiants infirmiers IPMSchool en milieu hospitalier"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-xl">
            <div className="bg-white/55 backdrop-blur-md rounded-2xl p-6 sm:p-8 ring-1 ring-white/40 shadow-soft">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-5 leading-[1.05] tracking-tight">
                Votre Avenir en{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Soins de Santé
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                Rejoignez une formation d'excellence qui vous prépare aux défis du
                monde médical moderne. Devenez l'infirmier(ère) que vous aspirez à être.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
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
                onClick={() => navigate("/inscription")}
                className="text-lg border-2"
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 lg:-mt-12 relative z-20 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="border-2 shadow-medium">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="font-display text-3xl font-bold text-foreground">{s.number}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
