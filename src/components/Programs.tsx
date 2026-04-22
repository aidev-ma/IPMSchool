import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Stethoscope, HeartPulse, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import classroomImage from "@/assets/classroom.jpg";
import practiceImage from "@/assets/practice.jpg";

const programs = [
  {
    icon: Stethoscope,
    slug: "infirmier-polyvalent",
    title: "Infirmier(ère) Polyvalent(e)",
    duration: "3 ans",
    admission: "Bac toutes disciplines",
    description:
      "Cursus complet préparant à la prise en charge globale du patient : évaluation des besoins, planification des soins, application des prescriptions médicales et participation aux programmes de santé publique.",
  },
  {
    icon: HeartPulse,
    slug: "infirmier-auxiliaire",
    title: "Infirmier(ère) Auxiliaire",
    duration: "2 ans",
    admission: "Niveau Bac toutes disciplines",
    description:
      "Formation orientée vers les soins de base en milieu hospitalier et ambulatoire, l'hygiène et le confort des patients dépendants, ainsi que l'éducation sanitaire de la population.",
  },
  {
    icon: UserCheck,
    slug: "aide-soignant",
    title: "Aide-Soignant(e)",
    duration: "12 mois",
    admission: "Niveau 3ème année collège",
    description:
      "Programme de 1567 heures alternant théorie, pratique et stages pour maîtriser l'hygiène, le confort du malade et accompagner les équipes médicales dans tous les services hospitaliers.",
  },
];

const Programs = () => {
  return (
    <section id="programmes" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Nos Programmes de Formation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des formations de qualité adaptées aux besoins du secteur de la santé
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    Durée: {program.duration}
                  </CardDescription>
                  <CardDescription className="text-muted-foreground">
                    Admission: {program.admission}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <Link to={`/programmes/${program.slug}`} className="mt-auto">
                    <Button variant="outline" className="w-full border-2 group">
                      Plus de détails
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="relative overflow-hidden rounded-xl shadow-medium group">
            <img
              src={classroomImage}
              alt="Salle de classe moderne avec équipements médicaux"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Formations Théoriques
                </h3>
                <p className="text-muted-foreground">
                  Salles équipées avec technologies de pointe
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-medium group">
            <img
              src={practiceImage}
              alt="Étudiants pratiquant les soins en laboratoire"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Pratique Clinique
                </h3>
                <p className="text-muted-foreground">
                  Simulations réalistes et stages en milieu professionnel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
