import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "+212 537 763 280 / +212 537 263 839",
  },
  {
    icon: Mail,
    title: "Email",
    content: "ecole.ifpp.rabat@gmail.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "Imm. D, Résidence REDA, rue Melilya, Hassan, Rabat",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun-Ven: 8h30-17h30",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à commencer votre parcours ? Notre équipe est là pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="border-2 bg-gradient-hero p-1">
              <div className="bg-card rounded-lg p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Envoyez-nous un message
                </h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-foreground mb-2">
                      Programme d'intérêt
                    </label>
                    <select
                      id="program"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option>Formation Initiale</option>
                      <option>Spécialisation Soins Intensifs</option>
                      <option>Soins Gériatriques</option>
                      <option>Formation Continue</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre message..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-hero shadow-medium" size="lg">
                    Envoyer le message
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-medium transition-all duration-300">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="border-2 bg-secondary/50">
              <CardContent className="p-6">
                <h4 className="font-display text-xl font-bold text-foreground mb-4">
                  Portes Ouvertes
                </h4>
                <p className="text-muted-foreground mb-4">
                  Rejoignez-nous lors de notre prochaine journée portes ouvertes pour découvrir nos installations et rencontrer notre équipe.
                </p>
                <Button variant="outline" className="w-full border-2">
                  S'inscrire aux Portes Ouvertes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
