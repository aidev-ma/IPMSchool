import { CheckCircle2 } from "lucide-react";

const features = [
  "Institut accrédité par l'État pour ses formations paramédicales",
  "Sous tutelle du Secrétariat d'État chargé de la Formation Professionnelle",
  "Programmes conformes aux standards nationaux du secteur de la santé",
  "Stages encadrés dans des structures hospitalières publiques et privées",
  "Pédagogie en alternance théorie, pratique et terrain",
  "Équipe pédagogique composée de professionnels de santé en exercice",
  "Accompagnement personnalisé vers l'insertion professionnelle",
];

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Un Institut Accrédité au Service de la Santé
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Notre institut est dédié à la formation des futurs professionnels paramédicaux.
              Nous proposons des cursus accrédités qui allient rigueur académique, pratique
              clinique et stages hospitaliers, afin de préparer chaque étudiant à exercer
              avec compétence et humanité dans un système de santé en constante évolution.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-accent rounded-2xl blur-3xl opacity-20" />
            <Card className="relative bg-card border-2 p-8">
              <div className="space-y-8">
                <Stat number="2005" label="Année de Création" />
                <Stat number="100%" label="Diplômes Accrédités" />
                <Stat number="3" label="Filières Paramédicales" />
                <Stat number="20+" label="Années d'Expérience" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="border-l-4 border-primary pl-6">
    <div className="font-display text-4xl font-bold text-primary mb-1">{number}</div>
    <div className="text-muted-foreground">{label}</div>
  </div>
);

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

export default About;
