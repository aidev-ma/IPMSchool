import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import classroomImage from "@/assets/classroom.jpg";
import practiceImage from "@/assets/practice.jpg";

const values = [
  { icon: Heart, title: "Humanité", text: "Placer le patient au cœur de chaque geste, avec respect et empathie." },
  { icon: Award, title: "Excellence", text: "Exiger la rigueur académique et la qualité dans la pratique clinique." },
  { icon: Users, title: "Engagement", text: "Former des professionnels responsables, au service de la communauté." },
  { icon: BookOpen, title: "Apprentissage", text: "Cultiver la curiosité et l'amélioration continue tout au long de la carrière." },
];

const features = [
  "Institut accrédité par l'État pour ses formations paramédicales",
  "Programmes conformes aux standards nationaux du secteur de la santé",
  "Stages encadrés en milieu hospitalier public et privé",
  "Pédagogie en alternance théorie, pratique et terrain",
  "Équipe pédagogique composée de professionnels de santé en exercice",
  "Accompagnement personnalisé vers l'insertion professionnelle",
];

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              À Propos de l'IPMS
            </h1>
            <p className="text-xl text-muted-foreground">
              Un institut dédié à la formation des futurs professionnels paramédicaux,
              alliant rigueur académique et pratique clinique.
            </p>
          </div>

          <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Notre Institut</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                L'IPMS est un institut spécialisé dans la formation des professionnels de la
                santé. Nos cursus accrédités préparent les futurs infirmier(ère)s et
                aides-soignant(e)s à répondre aux besoins du système de santé moderne.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous combinons enseignement théorique solide, ateliers pratiques et stages
                hospitaliers afin que chaque diplômé sorte prêt à exercer avec compétence,
                responsabilité et humanité.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-medium">
              <img src={classroomImage} alt="Salle de classe IPMS" className="w-full h-80 object-cover" />
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6 mb-20">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Notre Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Former des professionnels paramédicaux compétents, responsables et humains,
                  capables de s'intégrer immédiatement dans les structures de santé publiques
                  et privées.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Notre Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Devenir une référence de la formation paramédicale, reconnue pour la qualité
                  de ses diplômés et son engagement envers l'amélioration des soins.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-20">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <Card key={v.title} className="border-2 hover:shadow-medium transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 mx-auto">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                      <p className="text-sm text-muted-foreground">{v.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative overflow-hidden rounded-xl shadow-medium order-2 lg:order-1">
              <img src={practiceImage} alt="Pratique clinique" className="w-full h-80 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Pourquoi nous choisir</h2>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="text-center bg-secondary/40 rounded-2xl p-12">
            <h2 className="font-display text-3xl font-bold mb-4">Rejoignez l'IPMS</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Découvrez nos programmes ou contactez-nous pour échanger avec notre équipe sur votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programmes">
                <Button size="lg" className="bg-gradient-hero shadow-medium">Voir nos programmes</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2">Nous contacter</Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
