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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { GraduationCap, Send } from "lucide-react";

const filieres = [
  { slug: "infirmier-polyvalent", label: "Infirmier(ère) Polyvalent(e)", niveaux: ["1ère année", "2ème année"] },
  { slug: "infirmier-auxiliaire", label: "Infirmier(ère) Auxiliaire", niveaux: ["1ère année", "2ème année"] },
  { slug: "aide-soignant", label: "Aide-Soignant(e)", niveaux: ["1ère année"] },
];

const bacOptions = [
  { value: "sciences", label: "Bac Sciences" },
  { value: "lettres", label: "Bac Lettres & Sciences Humaines" },
  { value: "niveau-bac", label: "Niveau Bac (sans diplôme)" },
];

const phoneRegex = /^[+0-9\s()-]{8,20}$/;

const schema = z
  .object({
    nom: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
    telephone: z.string().trim().max(20).optional().or(z.literal("")),
    whatsapp: z.string().trim().max(20).optional().or(z.literal("")),
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
  })
  .refine((d) => !!d.telephone || !!d.whatsapp, {
    message: "Téléphone ou WhatsApp est obligatoire",
    path: ["telephone"],
  })
  .refine((d) => !d.telephone || phoneRegex.test(d.telephone), {
    message: "Numéro de téléphone invalide",
    path: ["telephone"],
  })
  .refine((d) => !d.whatsapp || phoneRegex.test(d.whatsapp), {
    message: "Numéro WhatsApp invalide",
    path: ["whatsapp"],
  });

const Inscription = () => {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    whatsapp: "",
    email: "",
    filiere: "",
    niveau: "",
    bac: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const niveaux = useMemo(
    () => filieres.find((f) => f.slug === form.filiere)?.niveaux ?? [],
    [form.filiere],
  );

  const update = (k: keyof typeof form, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const onSubmit = (e: React.FormEvent) => {
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
    const filiereLabel = filieres.find((f) => f.slug === form.filiere)?.label ?? form.filiere;
    const bacLabel = bacOptions.find((b) => b.value === form.bac)?.label ?? form.bac;

    const message = [
      "Nouvelle demande d'inscription - IPMSchool",
      "",
      `Nom : ${form.nom}`,
      form.telephone ? `Téléphone : ${form.telephone}` : null,
      form.whatsapp ? `WhatsApp : ${form.whatsapp}` : null,
      form.email ? `Email : ${form.email}` : null,
      `Filière : ${filiereLabel}`,
      `Niveau : ${form.niveau}`,
      `Baccalauréat : ${bacLabel}`,
    ]
      .filter(Boolean)
      .join("\n");

    const wa = form.whatsapp || form.telephone || "";
    const waNumber = wa.replace(/[^0-9]/g, "");
    const url = `https://wa.me/212537763280?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Demande envoyée",
      description: "Nous vous recontacterons très prochainement.",
    });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 bg-background">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 shadow-soft">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
              Inscription
            </h1>
            <p className="text-muted-foreground text-lg">
              Remplissez ce formulaire pour rejoindre IPMSchool. Notre équipe vous recontactera rapidement.
            </p>
          </div>

          <Card className="border-2 shadow-medium">
            <CardHeader>
              <CardTitle>Formulaire de candidature</CardTitle>
              <CardDescription>
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
                  />
                  {errors.nom && <p className="text-sm text-destructive">{errors.nom}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">
                      Téléphone <span className="text-muted-foreground text-xs">(téléphone ou WhatsApp requis)</span>
                    </Label>
                    <Input
                      id="telephone"
                      type="tel"
                      inputMode="tel"
                      value={form.telephone}
                      onChange={(e) => update("telephone", e.target.value)}
                      placeholder="+212 6 00 00 00 00"
                      maxLength={20}
                    />
                    {errors.telephone && <p className="text-sm text-destructive">{errors.telephone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">
                      WhatsApp <span className="text-muted-foreground text-xs">(ou téléphone)</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      inputMode="tel"
                      value={form.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      placeholder="+212 6 00 00 00 00"
                      maxLength={20}
                    />
                    {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-muted-foreground text-xs">(facultatif)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
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
                        update("niveau", "");
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
                      disabled={!form.filiere}
                    >
                      <SelectTrigger id="niveau">
                        <SelectValue
                          placeholder={form.filiere ? "Choisir un niveau" : "Sélectionnez d'abord une filière"}
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
                    {errors.niveau && <p className="text-sm text-destructive">{errors.niveau}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>
                    Type de baccalauréat <span className="text-primary">*</span>
                  </Label>
                  <RadioGroup
                    value={form.bac}
                    onValueChange={(v) => update("bac", v)}
                    className="grid sm:grid-cols-3 gap-3"
                  >
                    {bacOptions.map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={`bac-${opt.value}`}
                        className="flex items-center gap-3 rounded-lg border-2 border-input p-4 cursor-pointer hover:border-primary/50 hover:bg-secondary/40 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary/60"
                      >
                        <RadioGroupItem id={`bac-${opt.value}`} value={opt.value} />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
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
