import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutStudents from "@/assets/about-students.jpg";
import classroomImage from "@/assets/classroom.jpg";
import practiceImage from "@/assets/practice.jpg";

const values = [
  { icon: Heart, title: "Humanité", text: "Placer le patient au cœur de chaque geste, avec respect et empathie." },
  { icon: Award, title: "Excellence", text: "Exiger la rigueur académique et la qualité dans la pratique clinique." },
  { icon: Users, title: "Engagement", text: "Former des professionnels responsables, au service de la communauté." },
  { icon: BookOpen, title: "Apprentissage", text: "Cultiver la curiosité et l'amélioration continue tout au long de la carrière." },
];

const features = [
  "Formations paramédicales conçues avec exigence et sens du terrain",
  "Programmes structurés pour développer des compétences solides en santé",
  "Stages encadrés en milieu hospitalier public et privé",
  "Pédagogie en alternance théorie, pratique et terrain",
  "Équipe pédagogique composée de professionnels de santé en exercice",
  "Accompagnement personnalisé vers l'insertion professionnelle",
];

const stats = [
  { icon: GraduationCap, number: "3", label: "Filières paramédicales" },
  { icon: Building2, number: "100%", label: "Stages hospitaliers" },
  { icon: Users, number: "1500+", label: "Heures de formation" },
  { icon: Sparkles, number: "100%", label: "Engagement apprenants" },
];

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 bg-background">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={aboutStudents}
              alt="Étudiants d'IPMSchool en formation à Rabat"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" /> À propos d'IPMSchool
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Former la nouvelle génération{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  des soignants au Maroc
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                À Rabat, IPMSchool forme des infirmier(ère)s et aides-soignant(e)s engagés,
                rigoureusement préparés à exercer dans les structures publiques et privées
                du Royaume.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
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
        </section>

        {/* NOTRE INSTITUT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Notre institut
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
                Un établissement à taille humaine, ancré dans le système de santé marocain
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                IPMSchool est un institut spécialisé dans la formation des professionnels de la
                santé, basé à Hassan, au cœur de Rabat. Nos cursus de qualité préparent les
                futurs infirmier(ère)s et aides-soignant(e)s à répondre aux besoins du
                système de santé marocain et international.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous combinons un enseignement théorique solide, des ateliers pratiques et
                des stages dans les hôpitaux partenaires afin que chaque diplômé sorte prêt
                à exercer avec compétence, responsabilité et humanité.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-medium aspect-[3/4]">
                <img src={classroomImage} alt="Salle de classe IPMSchool" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-medium aspect-[3/4] mt-8">
                <img src={practiceImage} alt="Pratique clinique" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="bg-secondary/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 bg-card relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-hero opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                <CardContent className="p-10 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Notre Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Former des professionnels paramédicaux compétents, responsables et
                    humains, capables de s'intégrer immédiatement dans les structures de
                    santé publiques et privées du Maroc.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 bg-card relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-hero opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                <CardContent className="p-10 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Notre Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Devenir une référence de la formation paramédicale au Maroc, portée
                    par la qualité de ses diplômés et son engagement envers l'amélioration
                    continue des soins.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* VALEURS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Ce qui nous guide
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Nos Valeurs
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="border-2 hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 mx-auto">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* POURQUOI NOUS CHOISIR */}
        <section className="bg-secondary/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Pourquoi nous choisir
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
                Un cadre exigeant, un accompagnement bienveillant
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-5 rounded-xl bg-card border-2">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 sm:p-16 text-center shadow-medium">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Rejoignez IPMSchool
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
                Découvrez nos programmes ou contactez-nous pour échanger avec notre équipe sur votre projet professionnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/programmes">
                  <Button size="lg" variant="secondary" className="shadow-medium">
                    Voir nos programmes
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
