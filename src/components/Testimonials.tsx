import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Infirmière en Cardiologie",
    content: "La formation était exceptionnelle. Les stages pratiques m'ont vraiment préparée aux défis du métier. Je me sens confiante et compétente dans mon travail quotidien.",
    rating: 5,
  },
  {
    name: "Thomas Martin",
    role: "Infirmier aux Urgences",
    content: "L'équipe pédagogique est incroyable. Leur expérience terrain apporte une vraie valeur ajoutée à l'enseignement. Je recommande vivement cette école.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Infirmière en Gériatrie",
    content: "Grâce à la spécialisation en soins gériatriques, j'ai pu développer une expertise qui fait toute la différence dans ma pratique professionnelle.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="temoignages" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Témoignages de nos Diplômés
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les expériences de ceux qui ont franchi nos portes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:shadow-medium transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
