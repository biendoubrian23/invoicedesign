"use client";

import { MousePointer, Edit, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const steps = [
    {
      number: "01",
      icon: MousePointer,
      title: t("howItWorks.step1Title"),
      description: t("howItWorks.step1Desc"),
    },
    {
      number: "02",
      icon: Edit,
      title: t("howItWorks.step2Title"),
      description: t("howItWorks.step2Desc"),
    },
    {
      number: "03",
      icon: Send,
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
    },
  ];

  // Auto-cycle through steps
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2500);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section
      className="py-20 bg-gray-50 overflow-hidden"
      onMouseEnter={() => setIsAnimating(false)}
      onMouseLeave={() => setIsAnimating(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps with animated glow */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Animated connector line with traveling glow */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-1">
            {/* Base line */}
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

            {/* Animated green glow traveling along the line */}
            <div
              className="absolute top-0 h-full w-1/3 transition-all duration-1000 ease-in-out"
              style={{
                left: `${activeStep * 50}%`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full blur-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
            </div>

            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${activeStep * 50}%` }}
            ></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative group cursor-pointer transition-all duration-500 ${activeStep === index ? 'scale-105' : 'scale-100 opacity-70'
                }`}
              onClick={() => setActiveStep(index)}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-center">
                {/* Step Number & Icon with glow effect */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Outer glow ring - appears when active */}
                  <div
                    className={`absolute inset-0 w-28 h-28 -m-2 rounded-full transition-all duration-700 ${activeStep === index
                      ? 'bg-emerald-400/20 animate-ping'
                      : 'bg-transparent'
                      }`}
                    style={{ animationDuration: '2s' }}
                  ></div>

                  {/* Secondary glow */}
                  <div
                    className={`absolute inset-0 w-28 h-28 -m-2 rounded-full transition-all duration-500 ${activeStep === index
                      ? 'bg-gradient-to-r from-emerald-400/30 to-green-400/30 blur-xl'
                      : 'bg-transparent'
                      }`}
                  ></div>

                  {/* Main icon container */}
                  <div
                    className={`relative w-24 h-24 bg-white border-2 flex items-center justify-center transition-all duration-500 ${activeStep === index
                      ? 'border-emerald-500 shadow-lg shadow-emerald-200'
                      : 'border-gray-200 group-hover:border-emerald-300'
                      }`}
                  >
                    {/* Inner glow effect */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-0'
                        }`}
                      style={{
                        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
                      }}
                    ></div>

                    <step.icon
                      className={`relative w-10 h-10 transition-all duration-500 ${activeStep === index
                        ? 'text-emerald-600 scale-110'
                        : 'text-gray-500 group-hover:text-emerald-500'
                        }`}
                    />

                    {/* Sparkle effect when active */}
                    {activeStep === index && (
                      <>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                      </>
                    )}
                  </div>

                  {/* Step number badge with bounce when active */}
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 text-white text-sm font-bold flex items-center justify-center transition-all duration-500 ${activeStep === index
                      ? 'bg-emerald-500 scale-110 animate-bounce'
                      : 'bg-blue-600'
                      }`}
                    style={{ animationDuration: '1s' }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content with slide up effect */}
                <h3
                  className={`text-xl font-semibold mb-3 transition-all duration-500 ${activeStep === index ? 'text-emerald-700' : 'text-gray-900'
                    }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`leading-relaxed max-w-xs mx-auto transition-all duration-500 ${activeStep === index ? 'text-gray-700' : 'text-gray-500'
                    }`}
                >
                  {step.description}
                </p>

                {/* Bottom indicator dot */}
                <div
                  className={`mt-4 mx-auto w-2 h-2 rounded-full transition-all duration-500 ${activeStep === index
                    ? 'bg-emerald-500 scale-150'
                    : 'bg-gray-300'
                    }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Step indicator dots for mobile */}
        <div className="flex justify-center gap-3 mt-8 md:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStep === index
                ? 'bg-emerald-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Étape ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
