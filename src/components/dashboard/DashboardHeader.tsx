"use client";

import Image from "next/image";
import Link from "next/link";

import { useInvoiceStore } from "@/store";

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader = ({ title = "Dashboard" }: DashboardHeaderProps) => {
  const { invoice } = useInvoiceStore();
  const clientName = invoice.client.company || invoice.client.name;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <Image
          src="/logoheader.png"
          alt="InvoiceDesign Logo"
          width={160}
          height={40}
          className="h-14 w-auto transition-transform duration-200 group-hover:scale-105"
          priority
        />
      </Link>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 hidden md:block">
        {title} {clientName ? <span className="text-gray-500 font-normal">| {clientName}</span> : null}
      </h1>

      {/* Empty space - actions moved to sidebar */}
      <div className="w-40"></div>
    </header>
  );
};

export default DashboardHeader;
