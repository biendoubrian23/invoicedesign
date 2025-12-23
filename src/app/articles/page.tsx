"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight, Search, BookOpen, FileText, Scale, Globe, TrendingUp } from "lucide-react";
import { getAllArticles, getCategoriesWithCount, getArticlesByCategory, Article } from "@/data/articles";

export default function ArticlesPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const isEn = language === 'en';
  const categoriesWithCount = getCategoriesWithCount(isEn ? 'en' : 'fr');
  const allArticles = selectedCategory === "all" 
    ? getAllArticles() 
    : getArticlesByCategory(selectedCategory);
  
  // Fonction pour obtenir le titre selon la langue
  const getTitle = (article: Article) => isEn ? article.titleEn : article.title;
  const getDescription = (article: Article) => isEn ? article.descriptionEn : article.description;
  
  const filteredArticles = allArticles.filter(article => {
    const title = getTitle(article);
    const description = getDescription(article);
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isEn ? 'en-US' : 'fr-FR', {
      day: '2-digit',
      month: isEn ? 'short' : '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section avec image de fond */}
        <section className="relative min-h-[450px] flex items-center overflow-hidden">
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')`,
              }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-purple-900/85" />
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
            <div className="text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">
                  {isEn ? 'Updated for 2026 regulations' : 'Mis à jour pour les réglementations 2026'}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {isEn ? (
                  <>Invoice Resources<br /><span className="text-blue-300">& Expert Guides</span></>
                ) : (
                  <>Ressources Facturation<br /><span className="text-blue-300">& Guides d'Expert</span></>
                )}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
                {isEn 
                  ? 'Stay informed about the latest invoice requirements, legal obligations in 2026, and best practices for your business in France, Europe, and the USA.'
                  : 'Restez informé des dernières exigences en matière de facturation, des obligations légales 2026 et des bonnes pratiques pour votre activité en France, Europe et USA.'
                }
              </p>
              
              {/* Stats avec icônes */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                  <div className="p-2 bg-transparent border border-white/30">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">2026</div>
                    <div className="text-blue-200 text-xs">{isEn ? 'New Rules' : 'Nouvelles Règles'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                  <div className="p-2 bg-transparent border border-white/30">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">{allArticles.length}</div>
                    <div className="text-blue-200 text-xs">{isEn ? 'Articles' : 'Articles'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                  <div className="p-2 bg-transparent border border-white/30">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">{isEn ? 'Global' : 'Mondial'}</div>
                    <div className="text-blue-200 text-xs">FR • EU • USA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative wave bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 100L60 91.7C120 83.3 240 66.7 360 58.3C480 50 600 50 720 54.2C840 58.3 960 66.7 1080 70.8C1200 75 1320 75 1380 75L1440 75V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="#F9FAFB"/>
            </svg>
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
                    placeholder={isEn ? "Search..." : "Rechercher..."}
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
                  {isEn ? 'CATEGORIES' : 'CATÉGORIES'}
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
                <Scale className="w-8 h-8 mb-3" />
                <h4 className="font-semibold mb-2">{isEn ? 'Need help?' : 'Besoin d\'aide ?'}</h4>
                <p className="text-sm text-blue-100 mb-4">
                  {isEn 
                    ? 'Check our complete guide to create your invoices.' 
                    : 'Consultez notre guide complet pour créer vos factures.'
                  }
                </p>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  {isEn ? 'View guide' : 'Voir le guide'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>

            {/* Articles Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' 
                    ? (isEn ? 'All articles' : 'Tous les articles')
                    : categoriesWithCount.find(c => c.id === selectedCategory)?.name}
                  <span className="text-gray-400 font-normal ml-2">({filteredArticles.length})</span>
                </h2>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">{isEn ? 'No articles found.' : 'Aucun article trouvé.'}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={getTitle(article)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay léger */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          {categoriesWithCount.find(c => c.id === article.category)?.name || article.category}
                        </span>
                        {/* 2026 Badge */}
                        <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          2026
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {getTitle(article)}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {getDescription(article)}
                        </p>

                        {/* Tags preview */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(isEn ? article.tagsEn : article.tags).slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(article.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime} min
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                            {isEn ? 'Read' : 'Lire'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
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
