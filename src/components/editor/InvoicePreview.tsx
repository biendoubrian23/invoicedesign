"use client";

import { forwardRef } from "react";
import { useInvoiceStore } from "@/store";

const InvoicePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { invoice, calculateTotals } = useInvoiceStore();
  const { subtotal, tax, total } = calculateTotals();
  const { styling } = invoice;

  // Fixed pixel sizes for consistent PDF export
  const logoSizes = {
    small: { height: 40, maxWidth: 120 },
    medium: { height: 56, maxWidth: 160 },
    large: { height: 80, maxWidth: 200 },
  };

  const logoAlignments = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const currentLogoSize = logoSizes[invoice.logoSize];

  return (
    <div className="h-full bg-gray-100 p-6 overflow-y-auto">
      <div className="max-w-[210mm] mx-auto">
        {/* A4 Paper avec dimensions exactes pour export PDF */}
        <div
          ref={ref}
          data-invoice-preview
          className="bg-white paper-shadow animate-scale-in"
          style={{ 
            fontFamily: styling.fontFamily,
            width: '210mm',
            minHeight: 'auto',
            padding: '15mm',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            {/* Logo */}
            <div className={`flex-1 flex ${logoAlignments[invoice.logoPosition]}`}>
              {invoice.logo ? (
                <img
                  src={invoice.logo}
                  alt="Logo"
                  style={{
                    height: currentLogoSize.height,
                    maxWidth: currentLogoSize.maxWidth,
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <div
                  style={{ 
                    width: 64, 
                    height: 64,
                    backgroundColor: styling.primaryColor 
                  }}
                ></div>
              )}
            </div>

            {/* Invoice Info */}
            <div className="text-right">
              <h1
                className="text-2xl font-bold mb-1"
                style={{ color: styling.primaryColor }}
              >
                FACTURE
              </h1>
              <p className="text-sm text-gray-600">N {invoice.invoiceNumber}</p>
              <p className="text-sm text-gray-600">Date : {invoice.date}</p>
              <p className="text-sm text-gray-600">
                Echeance : {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-12 gap-8 mb-10">
            {/* Issuer */}
            <div className="col-span-5">
              <h2
                className="text-sm font-semibold mb-2"
                style={{ color: styling.primaryColor }}
              >
                DE :
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">{invoice.issuer.name}</p>
                <p className="whitespace-pre-line">{invoice.issuer.address}</p>
                <p>SIRET : {invoice.issuer.siret}</p>
                <p>{invoice.issuer.email}</p>
                <p>{invoice.issuer.phone}</p>
              </div>
            </div>

            {/* Client */}
            <div className="col-span-7">
              <h2
                className="text-sm font-semibold mb-2"
                style={{ color: styling.primaryColor }}
              >
                A :
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">{invoice.client.name}</p>
                <p>{invoice.client.company}</p>
                <p className="whitespace-pre-line">{invoice.client.address}</p>
                <p>{invoice.client.email}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            {/* Header */}
            <div
              className="grid grid-cols-12 gap-4 py-3 px-4 text-sm font-semibold text-white"
              style={{ backgroundColor: styling.primaryColor }}
            >
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qte</div>
              <div className="col-span-2 text-right">Prix unit.</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Rows */}
            {invoice.items.map((item, index) => (
              <div key={item.id}>
                {/* Ligne principale */}
                <div
                  className={`grid grid-cols-12 gap-4 py-3 px-4 text-sm ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="col-span-6 text-gray-800 font-medium">
                    {item.description}
                  </div>
                  <div className="col-span-2 text-center text-gray-600">
                    {(!item.hasSubItems || item.subItemsMode === 'parent-quantity') 
                      ? item.quantity 
                      : '-'}
                  </div>
                  <div className="col-span-2 text-right text-gray-600">
                    {!item.hasSubItems 
                      ? `${item.unitPrice.toFixed(2)} EUR`
                      : item.subItemsMode === 'parent-quantity'
                      ? `${item.unitPrice.toFixed(2)} EUR`
                      : '-'}
                  </div>
                  <div className="col-span-2 text-right font-medium text-gray-800">
                    {item.total.toFixed(2)} EUR
                  </div>
                </div>

                {/* Sous-lignes */}
                {item.hasSubItems && item.subItems && item.subItems.length > 0 && (
                  <div className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className="grid grid-cols-12 gap-4 py-2 px-4 pl-12 text-xs border-l-2 border-blue-300"
                        style={{ 
                          borderLeftColor: styling.primaryColor,
                          opacity: 0.9 
                        }}
                      >
                        <div className="col-span-6 text-gray-700 flex items-center">
                          <span className="mr-2 text-gray-400">↳</span>
                          {subItem.description}
                        </div>
                        <div className="col-span-2 text-center text-gray-500">
                          {item.subItemsMode === 'individual-quantities' && subItem.hasQuantity
                            ? subItem.quantity
                            : '-'}
                        </div>
                        <div className="col-span-2 text-right text-gray-500">
                          {item.subItemsMode !== 'no-prices'
                            ? `${subItem.unitPrice.toFixed(2)} EUR`
                            : '-'}
                        </div>
                        <div className="col-span-2 text-right text-gray-700">
                          {item.subItemsMode === 'individual-quantities'
                            ? `${subItem.total.toFixed(2)} EUR`
                            : item.subItemsMode === 'parent-quantity'
                            ? `${subItem.unitPrice.toFixed(2)} EUR`
                            : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4 px-4">
              <div className="col-span-8"></div>
              <div className="col-span-4">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">Sous-total HT</span>
                  <span className="font-medium text-right">{subtotal.toFixed(2)} EUR</span>
                </div>
                <div className="flex justify-between py-2 text-sm border-b border-gray-200">
                  <span className="text-gray-600">TVA ({invoice.taxRate}%)</span>
                  <span className="font-medium text-right">{tax.toFixed(2)} EUR</span>
                </div>
                <div
                  className="flex justify-between py-3 text-lg font-bold"
                  style={{ color: styling.primaryColor }}
                >
                  <span>Total TTC</span>
                  <span className="text-right">{total.toFixed(2)} EUR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          {invoice.paymentTerms && (
            <div
              className="p-4 text-sm"
              style={{ backgroundColor: `${styling.primaryColor}10` }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: styling.primaryColor }}
              >
                Conditions de paiement
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {invoice.paymentTerms}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;
