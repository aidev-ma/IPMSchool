import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo: {
  icon: typeof Phone;
  title: string;
  content: string | string[];
}[] = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "+212 537 763 280 / +212 537 263 839",
  },
  {
    icon: Mail,
    title: "Email",
    content: [
      "Contact : Contact@ipmschool.ma",
      "Inscription : Inscription@ipmschool.ma",
    ],
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "23 Av Chellah, Hassan, Rabat",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun-Ven: 8h30-17h30",
  },
];

const programmeOptions = [
  { value: "infirmier-polyvalent", label: "Infirmier(ère) Polyvalent(e) — 3 ans" },
  { value: "infirmier-auxiliaire", label: "Infirmier(ère) Auxiliaire — 2 ans" },
  { value: "aide-soignant", label: "Aide-Soignant(e) — 12 mois" },
  { value: "autre", label: "Autre / Information générale" },
];

const allowedProgrammes = programmeOptions.map((p) => p.value);

const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Nom trop court")
    .max(100, "Nom trop long")
    .regex(/^[\p{L}\s'’\-]+$/u, "Nom invalide"),
  email: z
    .string()
    .trim()
    .min(1, "Email obligatoire")
    .max(255)
    .email("Email invalide"),
  programme: z
    .string()
    .refine((v) => v === "" || allowedProgrammes.includes(v), "Programme invalide"),
  message: z
    .string()
    .trim()
    .min(10, "Message trop court (10 caractères minimum)")
    .max(2000, "Message trop long (2000 caractères maximum)"),
  website: z.string().optional(),
});

const Contact = () => {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    programme: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0] as string;
        if (key && !fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Formulaire incomplet",
        description: "Merci de corriger les champs en erreur.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message envoyé",
          description: "Merci, nous vous recontacterons rapidement.",
        });
        setForm({ nom: "", email: "", programme: "", message: "", website: "" });
      } else {
        throw new Error(data.message || "Erreur lors de l'envoi du message.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erreur réseau.";
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
                <form className="space-y-6" onSubmit={onSubmit} noValidate>
                  {/* Honeypot anti-spam */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label htmlFor="website">Site web</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.nom}
                      onChange={(e) => update("nom", e.target.value)}
                      maxLength={100}
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                    {errors.nom && <p className="mt-1 text-sm text-destructive">{errors.nom}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      maxLength={255}
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-foreground mb-2">
                      Programme d'intérêt
                    </label>
                    <select
                      id="program"
                      value={form.programme}
                      onChange={(e) => update("programme", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Choisir un programme (facultatif)</option>
                      {programmeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.programme && <p className="mt-1 text-sm text-destructive">{errors.programme}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      maxLength={2000}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Votre message..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-hero shadow-medium"
                    size="lg"
                  >
                    {submitting ? "Envoi en cours..." : "Envoyer le message"}
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
                      {Array.isArray(info.content) ? (
                        info.content.map((line, i) => (
                          <p key={i} className="text-muted-foreground break-all">
                            {line}
                          </p>
                        ))
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
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
