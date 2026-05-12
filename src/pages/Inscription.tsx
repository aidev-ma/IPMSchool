import { useMemo, useState } from "react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import inscriptionHero from "@/assets/inscription-hero.jpg";
import ipmLogo from "@/assets/ipm-school-logo.png";

const filieres = [
  {
    slug: "infirmier-polyvalent",
    label: "Infirmier(ère) Polyvalent(e)",
    niveaux: ["1ère année", "2ème année", "3ème année"],
  },
  {
    slug: "infirmier-auxiliaire",
    label: "Infirmier(ère) Auxiliaire",
    niveaux: ["1ère année", "2ème année"],
  },
  {
    slug: "aide-soignant",
    label: "Aide-Soignant(e)",
    niveaux: ["1ère année"],
  },
];

const bacOptions = [
  { value: "sciences", label: "Bac Sciences" },
  { value: "lettres", label: "Bac Lettres" },
  { value: "sciences-eco", label: "Bac Sciences Économiques" },
  { value: "niveau-bac", label: "Niveau Bac (toutes disciplines)" },
  { value: "3eme-college", label: "3ème année collège" },
];

const phoneRegex = /^[+0-9\s()-]{8,20}$/;

// Schema aligné avec une future table Supabase `inscriptions`
const schema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
  telephone: z
    .string()
    .trim()
    .min(1, "Téléphone obligatoire")
    .max(20, "Numéro trop long")
    .regex(phoneRegex, "Numéro de téléphone invalide"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("Email invalide")
    .optional()
    .or(z.literal("")),
  filiere: z.string().min(1, "Veuillez choisir une filière"),
  niveau: z.string().min(1, "Veuillez choisir un niveau"),
  bac: z.string().min(1, "Veuillez sélectionner une option"),
});

type InscriptionPayload = {
  nom: string;
  telephone: string;
  email: string | null;
  filiere: string;
  niveau: string;
  bac: string;
  website: string; // honeypot anti-spam (toujours vide côté humain)
};

const Inscription = () => {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    filiere: "",
    niveau: "",
    bac: "",
  });
  // Honeypot : champ caché, hors du state principal pour ne pas polluer la validation Zod
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedFiliere = useMemo(
    () => filieres.find((f) => f.slug === form.filiere),
    [form.filiere],
  );
  const niveaux = selectedFiliere?.niveaux ?? [];
  // Pour Aide-Soignant : une seule année => champ niveau grisé (auto-rempli)
  const niveauDisabled = !form.filiere || selectedFiliere?.slug === "aide-soignant";

  const update = (k: keyof typeof form, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
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

    const payload: InscriptionPayload = {
      nom: result.data.nom,
      telephone: result.data.telephone,
      email: result.data.email ? result.data.email : null,
      filiere: result.data.filiere,
      niveau: result.data.niveau,
      bac: result.data.bac,
    };

    const filiereLabel = filieres.find((f) => f.slug === payload.filiere)?.label ?? payload.filiere;
    const bacLabel = bacOptions.find((b) => b.value === payload.bac)?.label ?? payload.bac;

    const message = [
      "Nouvelle demande d'inscription - IPMSchool",
      "",
      `Nom : ${payload.nom}`,
      `Téléphone / WhatsApp : ${payload.telephone}`,
      payload.email ? `Email : ${payload.email}` : null,
      `Filière : ${filiereLabel}`,
      `Niveau : ${payload.niveau}`,
      `Baccalauréat : ${bacLabel}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch('/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Demande envoyée",
          description: "Votre inscription a bien été enregistrée. Nous vous recontacterons très prochainement.",
        });
        
        // Optionnel : Réinitialiser le formulaire après succès
        setForm({
          nom: "",
          telephone: "",
          email: "",
          filiere: "",
          niveau: "",
          bac: "",
        });
      } else {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer la demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 bg-background">
        {/* Hero — recadrage uniquement par le bas pour ne pas couper les visages */}
        <section className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden">
          <img
            src={inscriptionHero}
            alt="Équipe médicale IPMSchool présentant l'inscription"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </section>

        {/* Formulaire */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-10">
          <Card className="border-2 shadow-strong">
            <CardHeader className="text-center items-center">
              <img
                src={ipmLogo}
                alt="Logo IPMSchool"
                className="h-16 sm:h-20 w-auto mx-auto mb-3"
              />
              <CardTitle className="font-display text-3xl sm:text-4xl">
                Formulaire d'inscription
              </CardTitle>
              <CardDescription className="text-base">
                Rejoignez IPMSchool — notre équipe vous recontactera rapidement.
                <br />
                Les champs marqués <span className="text-primary font-semibold">*</span> sont obligatoires.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="nom">
                    Nom complet <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="nom"
                    value={form.nom}
                    onChange={(e) => update("nom", e.target.value)}
                    placeholder="Prénom et nom"
                    maxLength={100}
                    autoComplete="name"
                  />
                  {errors.nom && <p className="text-sm text-destructive">{errors.nom}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">
                    Téléphone ou WhatsApp <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.telephone}
                    onChange={(e) => update("telephone", e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    maxLength={20}
                  />
                  {errors.telephone && <p className="text-sm text-destructive">{errors.telephone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-muted-foreground text-xs">(facultatif)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="exemple@email.com"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="filiere">
                      Filière <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={form.filiere}
                      onValueChange={(v) => {
                        update("filiere", v);
                        // Auto-sélection pour Aide-Soignant (1 seule année)
                        if (v === "aide-soignant") {
                          update("niveau", "1ère année");
                        } else {
                          update("niveau", "");
                        }
                      }}
                    >
                      <SelectTrigger id="filiere">
                        <SelectValue placeholder="Choisir une filière" />
                      </SelectTrigger>
                      <SelectContent>
                        {filieres.map((f) => (
                          <SelectItem key={f.slug} value={f.slug}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.filiere && <p className="text-sm text-destructive">{errors.filiere}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niveau">
                      Niveau <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={form.niveau}
                      onValueChange={(v) => update("niveau", v)}
                      disabled={niveauDisabled}
                    >
                      <SelectTrigger id="niveau">
                        <SelectValue
                          placeholder={
                            !form.filiere
                              ? "Sélectionnez d'abord une filière"
                              : selectedFiliere?.slug === "aide-soignant"
                                ? "1ère année (unique)"
                                : "Choisir un niveau"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {niveaux.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedFiliere?.slug === "aide-soignant" && (
                      <p className="text-xs text-muted-foreground">
                        Une seule année de formation pour Aide-Soignant(e).
                      </p>
                    )}
                    {errors.niveau && <p className="text-sm text-destructive">{errors.niveau}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bac">
                    Type de baccalauréat <span className="text-primary">*</span>
                  </Label>
                  <Select value={form.bac} onValueChange={(v) => update("bac", v)}>
                    <SelectTrigger id="bac">
                      <SelectValue placeholder="Choisir votre niveau scolaire" />
                    </SelectTrigger>
                    <SelectContent>
                      {bacOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bac && <p className="text-sm text-destructive">{errors.bac}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-hero shadow-soft text-base h-12"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer ma demande d'inscription
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté(e) par IPMSchool.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
