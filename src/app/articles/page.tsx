"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import { getAllArticles, getCategoriesWithCount, getArticlesByCategory } from "@/data/articles";

export default function ArticlesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categoriesWithCount = getCategoriesWithCount();
  const allArticles = selectedCategory === "all" 
    ? getAllArticles() 
    : getArticlesByCategory(selectedCategory);
  
  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/articles/hero-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Actualités & Conseils
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Restez informé des dernières actualités sur la facturation, 
                les obligations légales et les bonnes pratiques pour votre activité.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-12 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">2025</div>
                  <div className="text-blue-200 text-sm">Actualités</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{allArticles.length}</div>
                  <div className="text-blue-200 text-sm">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">Gratuit</div>
                  <div className="text-blue-200 text-sm">Accès libre</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              {/* Search */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                  CATÉGORIES
                </h3>
                <ul className="space-y-1">
                  {categoriesWithCount.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 mt-6 text-white">
                <BookOpen className="w-8 h-8 mb-3" />
                <h4 className="font-semibold mb-2">Besoin d'aide ?</h4>
                <p className="text-sm text-blue-100 mb-4">
                  Consultez notre guide complet pour créer vos factures.
                </p>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Voir le guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>

            {/* Articles Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Tous les articles' : 
                    categoriesWithCount.find(c => c.id === selectedCategory)?.name}
                  <span className="text-gray-400 font-normal ml-2">({filteredArticles.length})</span>
                </h2>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">Aucun article trouvé.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <article
                      key={article.slug}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-blue-300" />
                        </div>
                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {categoriesWithCount.find(c => c.id === article.category)?.name || article.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {article.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime} min
                            </span>
                          </div>
                          <Link
                            href={`/articles/${article.slug}`}
                            className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                          >
                            Lire
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
