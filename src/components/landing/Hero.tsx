"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Edit3, Settings, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
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
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-1">
            Concevez, personnalisez et exportez vos factures instantanement.
            Interface intuitive, calculs automatiques et export PDF professionnel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
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

        {/* Preview Section */}
        <div className="relative max-w-5xl mx-auto animate-fade-in-up stagger-3">
          <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-gray-300"></div>
                <div className="w-3 h-3 bg-gray-300"></div>
                <div className="w-3 h-3 bg-gray-300"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-white border border-gray-200 text-sm text-gray-500 w-72 text-center">
                  facturedesign.com/dashboard
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
                    <div className="bg-white border border-gray-200 p-3">
                      <span className="text-xs text-gray-500 block mb-1">Nom de l&apos;entreprise</span>
                      <span className="text-sm font-medium text-gray-900">Votre Societe</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                      <span className="text-xs text-gray-500 block mb-1">Client</span>
                      <span className="text-sm font-medium text-gray-900">Client XYZ</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                      <span className="text-xs text-gray-500 block mb-1">Montant Total</span>
                      <span className="text-lg font-bold text-blue-600">1 200,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Side */}
              <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-xs bg-white shadow-lg p-6 transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-600"></div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">FACTURE</div>
                      <div className="text-xs text-gray-500">N 2024-001</div>
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

          {/* Floating Elements */}
          <div className="absolute -left-4 top-1/4 bg-white border border-gray-200 shadow-lg p-3 hidden lg:flex items-center gap-2 animate-slide-in-left stagger-4">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Personnalisation</span>
          </div>
          <div className="absolute -right-4 top-1/3 bg-white border border-gray-200 shadow-lg p-3 hidden lg:flex items-center gap-2 animate-slide-in-right stagger-5">
            <Download className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">Export PDF</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
