"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Access key publique Web3Forms (côté client)
const WEB3FORMS_ACCESS_KEY = "113ca8b9-40c7-474c-a092-2f21fd1bf5bb";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Map subject to readable text
    const subjectMap: Record<string, string> = {
      general: "Question générale",
      support: "Support technique",
      billing: "Facturation",
      partnership: "Partenariat",
      other: "Autre",
    };
    const subjectText = subjectMap[formData.subject] || formData.subject;

    try {
      // Envoi direct à Web3Forms depuis le navigateur (évite le blocage Cloudflare)
      const form = new FormData();
      form.append("access_key", WEB3FORMS_ACCESS_KEY);
      form.append("subject", `[InvoiceDesign] ${subjectText} - ${formData.name}`);
      form.append("from_name", "InvoiceDesign Contact");
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || t("contact.errorMessage"));
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("contact.errorMessage"));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              {t("contact.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t("contact.emailTitle")}</h3>
                <p className="text-gray-600 text-sm mb-3">{t("contact.emailDesc")}</p>
                <a href="mailto:contact@invoicedesign.com" className="text-blue-600 font-medium hover:underline">
                  contact@invoicedesign.com
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t("contact.responseTitle")}</h3>
                <p className="text-gray-600 text-sm">{t("contact.responseDesc")}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                {status === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t("contact.successMessage")}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {t("contact.sendAnother")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {status === "error" && (
                      <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-xl">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.nameLabel")} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder={t("contact.namePlaceholder")}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.emailLabel")} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder={t("contact.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.subjectLabel")} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                      >
                        <option value="">{t("contact.subjectPlaceholder")}</option>
                        <option value="general">{t("contact.subjectGeneral")}</option>
                        <option value="support">{t("contact.subjectSupport")}</option>
                        <option value="billing">{t("contact.subjectBilling")}</option>
                        <option value="partnership">{t("contact.subjectPartnership")}</option>
                        <option value="other">{t("contact.subjectOther")}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.messageLabel")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                        placeholder={t("contact.messagePlaceholder")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t("contact.sendButton")}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
