import { getCategories, getArticlesByCategory } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Get categories
  const categories = getCategories();
  
  // Validate category exists
  if (!categories.includes(slug)) {
    notFound();
  }

  // Get articles for this category
  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold mb-2 capitalize">{slug}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {articles.length} articles in this category
      </p>

      {articles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No articles found in this category.</p>
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
              <div className="flex flex-wrap gap-2">
                {article.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
