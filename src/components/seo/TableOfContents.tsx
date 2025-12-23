'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  maxDepth?: number;
}

export function TableOfContents({ 
  contentSelector = '.article-content',
  maxDepth = 3 
}: TableOfContentsProps) {
  const { language } = useLanguage();
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    // Extraire les headings
    const headingSelector = Array.from({ length: maxDepth }, (_, i) => `h${i + 2}`).join(', ');
    const headings = content.querySelectorAll(headingSelector);
    
    const tocItems: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) heading.id = id;
      
      tocItems.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      });
    });
    
    setItems(tocItems);

    // Observer pour le scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [contentSelector, maxDepth]);

  if (items.length < 3) return null;

  return (
    <nav className="toc-container p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
        {language === 'fr' ? 'Sommaire' : 'Table of Contents'}
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block py-1 transition-colors ${
                activeId === item.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
