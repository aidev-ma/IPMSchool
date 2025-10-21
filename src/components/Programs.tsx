import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BookOpen, Stethoscope, HeartPulse, UserCheck } from "lucide-react";
import classroomImage from "@/assets/classroom.jpg";
import practiceImage from "@/assets/practice.jpg";

const programs = [
  {
    icon: BookOpen,
    title: "Formation Initiale",
    duration: "3 ans",
    description: "Programme complet pour devenir infirmier(ère) diplômé(e) d'État avec stages pratiques en milieu hospitalier.",
  },
  {
    icon: Stethoscope,
    title: "Spécialisation Soins Intensifs",
    duration: "1 an",
    description: "Perfectionnement en soins critiques et urgences pour les infirmiers expérimentés.",
  },
  {
    icon: HeartPulse,
    title: "Soins Gériatriques",
    duration: "1 an",
    description: "Expertise dans l'accompagnement des personnes âgées et gestion des pathologies liées au vieillissement.",
  },
  {
    icon: UserCheck,
    title: "Formation Continue",
    duration: "Flexible",
    description: "Modules courts pour actualiser vos compétences et découvrir les nouvelles pratiques médicales.",
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
            Des formations reconnues et adaptées aux besoins du secteur de la santé
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    Durée: {program.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{program.description}</p>
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
