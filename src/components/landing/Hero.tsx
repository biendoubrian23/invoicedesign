"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight, Edit3, Settings, Download, Puzzle, Move, Layers, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
              Nouveau : Templates personnalisables
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Creez des factures
              <br />
              <span className="text-blue-600">professionnelles</span> en quelques
              clics
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-up stagger-1">
              Concevez, personnalisez et exportez vos factures instantanement.
              Interface intuitive, calculs automatiques et export PDF professionnel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up stagger-2">
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="lg">
                  Decouvrir les fonctionnalites
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative animate-fade-in-up stagger-3">
            <Image
              src="/herosections2.png"
              alt="InvoiceDesign - Éditeur de factures intuitif"
              width={1200}
              height={900}
              quality={100}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Section Modularité - Blocs personnalisables */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Interactive Preview */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-lg">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-500 text-center">
                    invoicedesign.com/dashboard
                  </div>
                </div>
              </div>

              {/* Split View Preview */}
              <div className="flex flex-col md:flex-row min-h-[400px]">
                {/* Editor Side */}
                <div className="flex-1 p-6 bg-gray-50 border-r border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                      <Edit3 className="w-4 h-4" />
                      Zone d&apos;edition
                    </div>
                    
                    {/* Form Preview */}
                    <div className="space-y-3">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">Nom de l&apos;entreprise</span>
                        <span className="text-sm font-medium text-gray-900">Votre Societe</span>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">Client</span>
                        <span className="text-sm font-medium text-gray-900">Client XYZ</span>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <span className="text-xs text-gray-500 block mb-1">Montant Total</span>
                        <span className="text-lg font-bold text-blue-600">1 200,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Side */}
                <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                  <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6 transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded"></div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">FACTURE</div>
                        <div className="text-xs text-gray-500">N° 2024-001</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="font-medium text-gray-900">De :</div>
                          <div className="text-gray-600">Votre Societe</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">A :</div>
                          <div className="text-gray-600">Client XYZ</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">Service</span>
                        <span className="font-medium">1 000,00</span>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">TVA (20%)</span>
                        <span className="font-medium">200,00</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-2">
                        <span>Total TTC</span>
                        <span className="text-blue-600">1 200,00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content about Modularity */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
              <Puzzle className="w-4 h-4" />
              Blocs 100% modulables
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Construisez votre facture
              <br />
              <span className="text-blue-600">bloc par bloc</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Chaque element de votre facture est un <strong className="text-gray-900">bloc independant</strong> que vous pouvez 
              ajouter, deplacer ou personnaliser en un simple glisser-deposer. 
              Aucune competence technique requise.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Move className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Glisser-deposer intuitif</h3>
                  <p className="text-sm text-gray-600">Reorganisez vos blocs instantanement. Deplacez, reordonnez, c&apos;est aussi simple que de jouer aux LEGO.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Blocs personnalisables</h3>
                  <p className="text-sm text-gray-600">Texte libre, tableaux detailles, signatures, QR codes... Ajoutez exactement ce dont vous avez besoin.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Zero courbe d&apos;apprentissage</h3>
                  <p className="text-sm text-gray-600">Interface tellement intuitive que vous creez votre premiere facture en moins de 2 minutes.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Essayer maintenant
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
