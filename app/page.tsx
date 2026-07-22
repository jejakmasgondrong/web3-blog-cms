import { getAllArticles } from '@/lib/db';
import Link from 'next/link';

export default async function HomePage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome to Web3 Blog CMS</h1>
      
      {articles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="block border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {article.excerpt || article.content.substring(0, 150) + '...'}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{article.author || 'Admin'}</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
