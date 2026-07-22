'use client';

import { useState, useEffect } from 'react';
import { getReadingTime, generateExcerpt } from '@/lib/markdown';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  coverImage?: string;
  image?: string;
  author?: string;
}

export default function ArticleDetail({ article }: { article: Article }) {
  const [readingTime, setReadingTime] = useState<number>(0);
  const [excerpt, setExcerpt] = useState<string>('');

  useEffect(() => {
    async function loadDetails() {
      if (article?.content) {
        const time = await getReadingTime(article.content);
        setReadingTime(time);
        
        const excerptText = await generateExcerpt(article.content, 150);
        setExcerpt(excerptText);
      }
    }
    loadDetails();
  }, [article]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <span>{article.author || 'Admin'}</span>
        <span>•</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        {readingTime > 0 && (
          <>
            <span>•</span>
            <span>{readingTime} min read</span>
          </>
        )}
        {article.category && (
          <>
            <span>•</span>
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="text-blue-600 hover:underline"
            >
              {article.category}
            </Link>
          </>
        )}
      </div>

      {article.image && (
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
