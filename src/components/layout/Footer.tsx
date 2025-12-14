import Link from "next/link";
import { FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produit: [
      { label: "Fonctionnalites", href: "/#features" },
      { label: "Templates", href: "/#templates" },
      { label: "Tarifs", href: "/pricing" },
    ],
    ressources: [
      { label: "Documentation", href: "#" },
      { label: "Guide de demarrage", href: "#" },
      { label: "FAQ", href: "/pricing#faq" },
    ],
    legal: [
      { label: "Mentions legales", href: "#" },
      { label: "Politique de confidentialite", href: "#" },
      { label: "CGV", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Invoice<span className="text-blue-400">Design</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Creez des factures professionnelles en quelques clics. Simple,
              rapide et elegant.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Produit
            </h3>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {currentYear} InvoiceDesign. Tous droits reserves.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:contact@invoicedesign.com"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                contact@invoicedesign.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
