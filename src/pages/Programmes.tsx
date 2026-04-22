import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, HeartPulse, UserCheck, Clock, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import polyvalentImage from "@/assets/program-polyvalent.jpg";
import auxiliaireImage from "@/assets/program-auxiliaire.jpg";
import aideSoignantImage from "@/assets/program-aide-soignant.jpg";

export const programsData = [
  {
    slug: "infirmier-polyvalent",
    icon: Stethoscope,
    image: polyvalentImage,
    title: "Infirmier(ère) Polyvalent(e)",
    duration: "3 ans",
    admission: "Baccalauréat toutes disciplines",
    short:
      "Cursus complet préparant à la prise en charge globale du patient en milieu hospitalier et ambulatoire.",
    missions: [
      "Évaluer les besoins en soins des patients, des familles et de la communauté",
      "Planifier, exécuter et évaluer les soins infirmiers adaptés à chaque situation",
      "Appliquer les prescriptions médicales (prévention, diagnostic, traitement, réhabilitation)",
      "Promouvoir l'information, l'éducation et la communication en santé",
      "Participer à la gestion des unités de soins et à la formation du personnel auxiliaire",
      "Contribuer à la recherche en soins infirmiers",
    ],
    structure: [
      {
        year: "1ère année",
        text: "Enseignement fondamental : sciences humaines, sciences biologiques, introduction aux pathologies, soins infirmiers de base et éthique professionnelle.",
      },
      {
        year: "2ème année",
        text: "Prise en charge des malades, planification des soins infirmiers et approfondissement des pratiques cliniques.",
      },
      {
        year: "3ème année",
        text: "Développement de l'esprit d'initiative, de la responsabilité et de la prise de décision professionnelle.",
      },
    ],
    debouches: [
      "Hôpitaux publics et cliniques privées",
      "Centres de santé et dispensaires",
      "Établissements de soins à domicile",
      "Structures de prévention et de santé publique",
    ],
  },
  {
    slug: "infirmier-auxiliaire",
    icon: HeartPulse,
    image: auxiliaireImage,
    title: "Infirmier(ère) Auxiliaire",
    duration: "2 ans",
    admission: "Niveau Baccalauréat toutes disciplines",
    short:
      "Formation orientée vers les soins de base et l'accompagnement des patients dépendants.",
    missions: [
      "Assurer les soins de base en milieu hospitalier et ambulatoire",
      "Participer à l'exécution des activités des programmes sanitaires",
      "Dispenser des soins d'hygiène et de confort aux malades dépendants",
      "Participer à l'application des prescriptions médicales",
      "Contribuer à la gestion des unités de soins",
      "Informer et éduquer la population en matière de santé",
    ],
    structure: [
      {
        year: "1ère année",
        text: "Environnement professionnel, éléments de psychosociologie et communication, sciences de base, soins de base.",
      },
      {
        year: "2ème année",
        text: "Principales affections médico-chirurgicales, maladies transmissibles et prophylaxie, infrastructure et programmes sanitaires.",
      },
    ],
    debouches: [
      "Services hospitaliers publics et privés",
      "Cliniques et centres de soins",
      "Maisons de retraite et structures gériatriques",
      "Soins à domicile",
    ],
  },
  {
    slug: "aide-soignant",
    icon: UserCheck,
    image: aideSoignantImage,
    title: "Aide-Soignant(e)",
    duration: "12 mois",
    admission: "Niveau 3ème année du collège",
    short:
      "Formation intensive de 1567 heures alternant théorie, pratique et stages hospitaliers.",
    missions: [
      "Assurer l'hygiène et le confort du malade au quotidien",
      "Acquérir les éléments de sciences biologiques et de pharmacologie",
      "Maîtriser l'hygiène individuelle, collective et hospitalière",
      "Connaître le système national de santé et les programmes sanitaires",
      "Surveiller l'état du patient dans tous les services médico-chirurgicaux",
      "Travailler en collaboration avec les équipes soignantes",
    ],
    structure: [
      {
        year: "Programme",
        text: "16 unités de formation pour une masse horaire globale de 1567 heures, en alternance entre cours théoriques, pratiques et stages.",
      },
    ],
    debouches: [
      "Hôpitaux et cliniques",
      "EHPAD et structures gériatriques",
      "Centres de rééducation",
      "Services de soins à domicile",
    ],
  },
];

const ProgramCard = ({ program }: { program: (typeof programsData)[number] }) => {
  const Icon = program.icon;
  return (
    <Card className="border-2 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          width={1024}
          height={640}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3 w-11 h-11 rounded-lg bg-gradient-hero flex items-center justify-center shadow-medium">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{program.title}</CardTitle>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {program.duration}</span>
          <span className="inline-flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {program.admission}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-6">{program.short}</p>
        <Link to={`/programmes/${program.slug}`} className="mt-auto">
          <Button className="w-full bg-gradient-hero shadow-soft group">
            Voir le détail
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const ProgramDetail = ({ program }: { program: (typeof programsData)[number] }) => {
  const Icon = program.icon;
  return (
    <article className="max-w-5xl mx-auto">
      <Link to="/programmes" className="text-primary hover:underline text-sm mb-6 inline-block">
        ← Retour aux programmes
      </Link>

      <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-medium mb-8">
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0 shadow-medium">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                {program.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mt-3">
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Durée : {program.duration}</span>
                <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> Admission : {program.admission}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{program.short}</p>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Missions et responsabilités</h2>
        <ul className="space-y-3">
          {program.missions.map((m, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Structure de la formation</h2>
        <div className="space-y-4">
          {program.structure.map((s, i) => (
            <Card key={i} className="border-2">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-2">{s.year}</h3>
                <p className="text-muted-foreground">{s.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Débouchés professionnels</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {program.debouches.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/40">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        <Link to="/contact" className="flex-1">
          <Button size="lg" className="w-full bg-gradient-hero shadow-medium">
            Demander des informations
          </Button>
        </Link>
        <Link to="/programmes" className="flex-1">
          <Button size="lg" variant="outline" className="w-full border-2">
            Voir les autres programmes
          </Button>
        </Link>
      </div>
    </article>
  );
};

const Programmes = () => {
  const { slug } = useParams();
  const program = slug ? programsData.find((p) => p.slug === slug) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {program ? (
            <ProgramDetail program={program} />
          ) : (
            <>
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Nos Programmes de Formation
                </h1>
                <p className="text-xl text-muted-foreground">
                  Trois cursus de qualité pour former les professionnels paramédicaux de demain.
                  Choisissez celui qui correspond à votre projet.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programsData.map((p) => (
                  <ProgramCard key={p.slug} program={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Programmes;
