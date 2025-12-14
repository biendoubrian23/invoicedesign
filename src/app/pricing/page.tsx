"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0",
    period: "/mois",
    description: "Ideal pour demarrer et tester",
    features: [
      { name: "5 factures par mois", included: true },
      { name: "2 templates de base", included: true },
      { name: "Export PDF", included: true },
      { name: "Filigrane FactureDesign", included: true },
      { name: "Tous les templates", included: false },
      { name: "Logo personnalise", included: false },
      { name: "Factures dynamiques", included: false },
      { name: "Support prioritaire", included: false },
    ],
    cta: "Essayer gratuitement",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: "9",
    period: "/mois",
    description: "Pour les independants et PME",
    features: [
      { name: "Factures illimitees", included: true },
      { name: "Tous les templates", included: true },
      { name: "Export PDF", included: true },
      { name: "Sans filigrane", included: true },
      { name: "Logo personnalise", included: true },
      { name: "Support email", included: true },
      { name: "Factures dynamiques", included: false },
      { name: "Support prioritaire", included: false },
    ],
    cta: "Choisir Standard",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "19",
    period: "/mois",
    description: "Pour les entreprises exigeantes",
    features: [
      { name: "Tout de Standard", included: true },
      { name: "Factures dynamiques", included: true },
      { name: "Support prioritaire", included: true },
      { name: "Acces API", included: true },
      { name: "Multi-utilisateurs", included: true },
      { name: "Statistiques avancees", included: true },
      { name: "Export multi-formats", included: true },
      { name: "Factures recurrentes", included: true },
    ],
    cta: "Choisir Premium",
    popular: false,
  },
];

const faqs = [
  {
    question: "Puis-je changer de plan a tout moment ?",
    answer:
      "Oui, vous pouvez passer a un plan superieur ou inferieur a tout moment. Le changement prend effet immediatement et le prorata est calcule automatiquement.",
  },
  {
    question: "Y a-t-il une periode d'essai ?",
    answer:
      "Le plan Gratuit vous permet de tester toutes les fonctionnalites de base sans limite de temps. Pour les plans payants, vous beneficiez d'une garantie satisfait ou rembourse de 14 jours.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle. Vous serez debite le meme jour chaque mois. Vous pouvez annuler a tout moment depuis votre espace client.",
  },
  {
    question: "Qu'est-ce qu'une facture dynamique ?",
    answer:
      "Une facture dynamique permet a votre client de choisir les options souhaitees directement depuis un lien. Le total se recalcule en temps reel selon ses choix.",
  },
  {
    question: "Mes donnees sont-elles securisees ?",
    answer:
      "Absolument. Nous utilisons un chiffrement SSL/TLS pour toutes les communications et vos donnees sont stockees de maniere securisee sur des serveurs certifies.",
  },
  {
    question: "Puis-je exporter mes factures ?",
    answer:
      "Oui, toutes vos factures peuvent etre exportees en PDF. Le plan Premium offre egalement l'export en Excel, CSV et via API.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Des tarifs simples et transparents
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Choisissez le plan qui correspond a vos besoins. Changez ou annulez
              a tout moment.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={plan.id}
                  className={`relative opacity-0 animate-fade-in-up ${
                    plan.popular
                      ? "border-2 border-blue-500 shadow-xl scale-105 z-10"
                      : "border border-gray-200"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                  padding="none"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-600 text-white text-sm font-semibold">
                      Le plus populaire
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-xl text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included ? "text-gray-700" : "text-gray-400"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Questions frequentes
              </h2>
              <p className="text-gray-600">
                Vous avez des questions ? Nous avons les reponses.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 overflow-hidden transition-shadow duration-200 hover:shadow-md"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center border border-gray-300 transition-transform duration-200 ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      <span className="text-gray-600">+</span>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pret a simplifier votre facturation ?
            </h2>
            <p className="text-blue-100 mb-8">
              Commencez gratuitement, sans carte bancaire requise.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Commencer gratuitement
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
