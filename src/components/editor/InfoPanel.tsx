"use client";

import { useRef, useEffect } from "react";
import { useInvoiceStore } from "@/store";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import InvoiceItemEditor from "./InvoiceItemEditor";
import { Plus } from "lucide-react";
import { InvoiceItemsBlock } from "@/types/invoice";

const InfoPanel = () => {
  const { invoice, setInvoice, setIssuer, setClient, addItem, blocks, focusTarget, clearFocusTarget } =
    useInvoiceStore();

  // Refs pour le scroll
  const invoiceInfoRef = useRef<HTMLElement>(null);
  const issuerRef = useRef<HTMLElement>(null);
  const clientRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Effet pour gérer le scroll et le focus quand focusTarget change
  useEffect(() => {
    if (!focusTarget) return;

    let targetRef: React.RefObject<HTMLElement | null> | null = null;

    switch (focusTarget.type) {
      case 'invoice-info':
        targetRef = invoiceInfoRef;
        break;
      case 'issuer':
        targetRef = issuerRef;
        break;
      case 'client':
        targetRef = clientRef;
        break;
      case 'items-table':
      case 'item':
        targetRef = itemsRef;
        break;
      default:
        return;
    }

    if (targetRef?.current) {
      // Scroll vers l'élément
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Ajouter une animation de mise en évidence
      targetRef.current.classList.add('ring-2', 'ring-blue-400', 'ring-offset-2', 'bg-blue-50/50');
      
      // Retirer l'animation après un délai
      const timer = setTimeout(() => {
        targetRef?.current?.classList.remove('ring-2', 'ring-blue-400', 'ring-offset-2', 'bg-blue-50/50');
        clearFocusTarget();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [focusTarget, clearFocusTarget]);

  // Récupérer le bloc invoice-items pour les colonnes personnalisées
  const invoiceItemsBlock = blocks.find(
    b => b.type === "invoice-items" && b.enabled
  ) as InvoiceItemsBlock | undefined;

  // Filtrer les colonnes personnalisées (pas les colonnes standard)
  const customColumns = invoiceItemsBlock?.columns.filter(
    col => col.visible && !["description", "quantity", "unitPrice", "total"].includes(col.key)
  ) || [];

  return (
    <div ref={containerRef} className="p-6 space-y-8 overflow-y-auto h-full">
      {/* Invoice Info */}
      <section ref={invoiceInfoRef} className="animate-fade-in transition-all duration-300 rounded-lg p-2 -m-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Informations de base
        </h3>
        <div className="space-y-4">
          <Input
            label="Numero de facture"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ invoiceNumber: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ date: e.target.value })}
            />
            <Input
              label="Date d'echeance"
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ dueDate: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Taux de TVA (%)"
              type="number"
              value={invoice.taxRate}
              onChange={(e) => setInvoice({ taxRate: Number(e.target.value) })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Devise
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={invoice.currency}
                onChange={(e) => setInvoice({ currency: e.target.value })}
              >
                <option value="€">Euro (€)</option>
                <option value="$">Dollar ($)</option>
                <option value="£">Livre (£)</option>
                <option value="CHF">Franc Suisse (CHF)</option>
                <option value="XOF">Franc CFA (XOF)</option>
                <option value="MAD">Dirham (MAD)</option>
                <option value="CAD">Dollar Canadien (CAD)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Issuer Info */}
      <section ref={issuerRef} className="animate-fade-in stagger-1 transition-all duration-300 rounded-lg p-2 -m-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Emetteur (Votre entreprise)
        </h3>
        <div className="space-y-4">
          <Input
            label="Nom de la societe"
            value={invoice.issuer.name}
            onChange={(e) => setIssuer({ name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Adresse
            </label>
            <textarea
              className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              rows={2}
              value={invoice.issuer.address}
              onChange={(e) => setIssuer({ address: e.target.value })}
            />
          </div>
          <Input
            label="SIRET"
            value={invoice.issuer.siret}
            onChange={(e) => setIssuer({ siret: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={invoice.issuer.email}
              onChange={(e) => setIssuer({ email: e.target.value })}
            />
            <Input
              label="Telephone"
              value={invoice.issuer.phone}
              onChange={(e) => setIssuer({ phone: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Client Info */}
      <section ref={clientRef} className="animate-fade-in stagger-2 transition-all duration-300 rounded-lg p-2 -m-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Destinataire (Client)
        </h3>
        <div className="space-y-4">
          <Input
            label="Nom du contact"
            value={invoice.client.name}
            onChange={(e) => setClient({ name: e.target.value })}
          />
          <Input
            label="Societe"
            value={invoice.client.company}
            onChange={(e) => setClient({ company: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Adresse
            </label>
            <textarea
              className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              rows={2}
              value={invoice.client.address}
              onChange={(e) => setClient({ address: e.target.value })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            value={invoice.client.email}
            onChange={(e) => setClient({ email: e.target.value })}
          />
        </div>
      </section>

      {/* Line Items */}
      <section ref={itemsRef} className="animate-fade-in stagger-3 transition-all duration-300 rounded-lg p-2 -m-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Lignes de facturation
        </h3>
        <div className="space-y-4">
          {invoice.items.map((item, index) => (
            <InvoiceItemEditor 
              key={item.id} 
              item={item} 
              index={index}
              customColumns={customColumns}
            />
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addItem}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une ligne
          </Button>
        </div>
      </section>

      {/* Notes & Payment Terms */}
      <section className="animate-fade-in stagger-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Conditions de paiement
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Conditions
            </label>
            <textarea
              className="w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              rows={3}
              value={invoice.paymentTerms}
              onChange={(e) => setInvoice({ paymentTerms: e.target.value })}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoPanel;
