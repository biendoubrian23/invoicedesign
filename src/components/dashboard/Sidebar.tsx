"use client";

import { useInvoiceStore } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { EditorSection } from "@/types/invoice";
import { LayoutGrid, FileText, Palette, Image, PlusSquare, FolderOpen, Settings, LogOut, CreditCard, Users, Building2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { activeSection, setActiveSection } = useInvoiceStore();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const menuItems: { id: EditorSection; labelKey: string; icon: React.ElementType }[] = [
    { id: "templates", labelKey: "sidebar.templates", icon: LayoutGrid },
    { id: "info", labelKey: "sidebar.info", icon: FileText },
    { id: "options", labelKey: "sidebar.options", icon: Palette },
    { id: "logo", labelKey: "sidebar.logo", icon: Image },
    { id: "blocks", labelKey: "sidebar.addBlock", icon: PlusSquare },
    { id: "clients", labelKey: "sidebar.clients", icon: Users },
    { id: "stockage", labelKey: "sidebar.storage", icon: FolderOpen },
    // { id: "my-business", labelKey: "sidebar.myBusiness", icon: Building2 }, // Désactivé temporairement
  ];

  // Get user's initial from name or email
  const getUserInitial = () => {
    if (!user) return "?";
    const fullName = user.user_metadata?.full_name;
    if (fullName) {
      return fullName.charAt(0).toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || "?";
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return t("sidebar.notConnected");
    const fullName = user.user_metadata?.full_name;
    if (fullName) return fullName;
    return user.email?.split("@")[0] || t("sidebar.user");
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <aside className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeSection === item.id
                  ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {t(item.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200">
        {/* Pricing Button */}
        <button
          onClick={() => setActiveSection("pricing")}
          className={`w-full flex items-center gap-3 px-7 py-3 text-sm font-medium transition-all duration-200 ${activeSection === "pricing"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
        >
          <CreditCard className="w-5 h-5" />
          {t("sidebar.pricing")}
        </button>

        {/* Contact Button */}
        <button
          onClick={() => router.push("/contact")}
          className="w-full flex items-center gap-3 px-7 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
        >
          <Mail className="w-5 h-5" />
          {t("sidebar.contact")}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setActiveSection("settings")}
          className={`w-full flex items-center gap-3 px-7 py-3 text-sm font-medium transition-all duration-200 ${activeSection === "settings"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
        >
          <Settings className="w-5 h-5" />
          {t("sidebar.settings")}
        </button>

        {/* User Info */}
        <div className="p-4 flex items-center gap-3">
          {/* User Avatar with Initial */}
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {getUserInitial()}
            </span>
          </div>

          {/* User Name & Actions */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {getDisplayName()}
            </p>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 mt-0.5"
              >
                <LogOut className="w-3 h-3" />
                {t("sidebar.logout")}
              </button>
            ) : (
              <button
                onClick={() => router.push("/auth/login")}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                {t("sidebar.login")}
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

