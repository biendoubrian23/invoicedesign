"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Check, Sparkles, Zap } from "lucide-react";

const plans = [
    {
        name: "Standard",
        price: "3.99",
        period: "€/mois",
        description: "Pour les indépendants et PME",
        features: [
            "Factures illimitées",
            "Tous les templates",
            "Sans filigrane",
            "Logo personnalisé",
            "Support email",
            "Export PDF haute qualité",
        ],
        cta: "Choisir Standard",
        popular: true,
        icon: Sparkles,
        stripeLink: "https://buy.stripe.com/test_xxx", // Replace with actual Stripe link
    },
    {
        name: "Premium",
        price: "6.99",
        period: "€/mois",
        description: "Pour les entreprises exigeantes",
        features: [
            "Tout de Standard",
            "Factures dynamiques",
            "Support prioritaire",
            "Accès API",
            "Multi-utilisateurs",
            "Statistiques avancées",
            "Export multi-formats",
        ],
        cta: "Choisir Premium",
        popular: false,
        icon: Zap,
        stripeLink: "https://buy.stripe.com/test_yyy", // Replace with actual Stripe link
    },
];

const PricingPanel = () => {
    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Tarifs
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Choisissez le plan qui vous convient
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="space-y-4">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative overflow-hidden ${plan.popular ? "ring-2 ring-blue-500" : ""
                            }`}
                        padding="md"
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                                Populaire
                            </div>
                        )}

                        <div className="flex items-start gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${plan.popular ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-blue-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                                <p className="text-xs text-gray-500">{plan.description}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-3xl font-bold text-gray-900">
                                {plan.price}
                            </span>
                            <span className="text-gray-500 text-sm">{plan.period}</span>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <a
                            href={plan.stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Button
                                className="w-full"
                                variant={plan.popular ? "primary" : "outline"}
                            >
                                {plan.cta}
                            </Button>
                        </a>
                    </Card>
                ))}
            </div>

            {/* Free Plan Note */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Plan Gratuit :</span> Créez jusqu'à 3 factures par mois avec filigrane.
                </p>
            </div>

            {/* FAQ Link */}
            <div className="text-center">
                <a
                    href="/pricing#faq"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Questions fréquentes →
                </a>
            </div>
        </div>
    );
};

export default PricingPanel;
