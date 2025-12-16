"use client";

import { useRef, useEffect } from "react";
import { useInvoiceStore } from "@/store";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import InvoiceItemEditor from "./InvoiceItemEditor";
import ClientCombobox from "./ClientCombobox";
import { FieldWithVisibility, CustomFieldsEditor } from "./FieldWithVisibility";
import { Plus } from "lucide-react";
import { InvoiceItemsBlock, CustomField } from "@/types/invoice";

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
          <FieldWithVisibility
            label="Adresse"
            value={invoice.issuer.address}
            onChange={(value) => setIssuer({ address: value })}
            visible={invoice.issuer.visibility?.address ?? true}
            onToggleVisibility={() => setIssuer({
              visibility: {
                ...invoice.issuer.visibility,
                address: !(invoice.issuer.visibility?.address ?? true)
              }
            })}
            type="textarea"
            rows={2}
          />
          <FieldWithVisibility
            label="SIRET"
            value={invoice.issuer.siret}
            onChange={(value) => setIssuer({ siret: value })}
            visible={invoice.issuer.visibility?.siret ?? true}
            onToggleVisibility={() => setIssuer({
              visibility: {
                ...invoice.issuer.visibility,
                siret: !(invoice.issuer.visibility?.siret ?? true)
              }
            })}
          />
          <div className="grid grid-cols-2 gap-4">
            <FieldWithVisibility
              label="Email"
              value={invoice.issuer.email}
              onChange={(value) => setIssuer({ email: value })}
              visible={invoice.issuer.visibility?.email ?? true}
              onToggleVisibility={() => setIssuer({
                visibility: {
                  ...invoice.issuer.visibility,
                  email: !(invoice.issuer.visibility?.email ?? true)
                }
              })}
              type="email"
            />
            <FieldWithVisibility
              label="Telephone"
              value={invoice.issuer.phone}
              onChange={(value) => setIssuer({ phone: value })}
              visible={invoice.issuer.visibility?.phone ?? true}
              onToggleVisibility={() => setIssuer({
                visibility: {
                  ...invoice.issuer.visibility,
                  phone: !(invoice.issuer.visibility?.phone ?? true)
                }
              })}
            />
          </div>
          <CustomFieldsEditor
            fields={invoice.issuer.customFields || []}
            onAdd={() => setIssuer({
              customFields: [
                ...(invoice.issuer.customFields || []),
                { id: crypto.randomUUID(), label: '', value: '' }
              ]
            })}
            onUpdate={(id, updates) => setIssuer({
              customFields: (invoice.issuer.customFields || []).map(f =>
                f.id === id ? { ...f, ...updates } : f
              )
            })}
            onRemove={(id) => setIssuer({
              customFields: (invoice.issuer.customFields || []).filter(f => f.id !== id)
            })}
          />
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
          <ClientCombobox
            value={invoice.client.company}
            onChange={(value) => setClient({ company: value })}
          />
          <FieldWithVisibility
            label="Adresse"
            value={invoice.client.address}
            onChange={(value) => setClient({ address: value })}
            visible={invoice.client.visibility?.address ?? true}
            onToggleVisibility={() => setClient({
              visibility: {
                ...invoice.client.visibility,
                address: !(invoice.client.visibility?.address ?? true)
              }
            })}
            type="textarea"
            rows={2}
          />
          <FieldWithVisibility
            label="Email"
            value={invoice.client.email}
            onChange={(value) => setClient({ email: value })}
            visible={invoice.client.visibility?.email ?? true}
            onToggleVisibility={() => setClient({
              visibility: {
                ...invoice.client.visibility,
                email: !(invoice.client.visibility?.email ?? true)
              }
            })}
            type="email"
          />
          <CustomFieldsEditor
            fields={invoice.client.customFields || []}
            onAdd={() => setClient({
              customFields: [
                ...(invoice.client.customFields || []),
                { id: crypto.randomUUID(), label: '', value: '' }
              ]
            })}
            onUpdate={(id, updates) => setClient({
              customFields: (invoice.client.customFields || []).map(f =>
                f.id === id ? { ...f, ...updates } : f
              )
            })}
            onRemove={(id) => setClient({
              customFields: (invoice.client.customFields || []).filter(f => f.id !== id)
            })}
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
