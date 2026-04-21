import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Contactez l'IPMS
            </h1>
            <p className="text-xl text-muted-foreground">
              Une question sur nos programmes, l'admission ou la vie à l'institut ?
              Notre équipe est à votre écoute.
            </p>
          </div>
        </div>

        <Contact />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p className="text-sm text-muted-foreground">Imm. D, Résidence REDA, rue Melilya, Hassan, Rabat</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Téléphone</h3>
                <p className="text-sm text-muted-foreground">+212 537 763 280</p>
                <p className="text-sm text-muted-foreground">+212 537 263 839</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-muted-foreground break-all">ecole.ipms.rabat@gmail.com</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Horaires</h3>
                <p className="text-sm text-muted-foreground">Lun - Ven : 8h30 - 17h30</p>
                <p className="text-sm text-muted-foreground">Sam : 9h00 - 13h00</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <iframe
                title="Localisation IPMS - Hassan, Rabat"
                src="https://www.google.com/maps?q=Rue+Melilya,+Hassan,+Rabat&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
