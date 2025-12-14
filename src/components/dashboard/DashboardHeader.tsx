"use client";

import Link from "next/link";
import { FileText, Home, Settings } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader = ({ title = "Dashboard" }: DashboardHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-blue-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">
          Invoice<span className="text-blue-600">Design</span>
        </span>
      </Link>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 hidden md:block">
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Accueil"
        >
          <Home className="w-5 h-5" />
        </Link>
        <button
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Parametres"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-gray-200 flex items-center justify-center ml-2">
          <span className="text-sm font-medium text-gray-600">U</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
