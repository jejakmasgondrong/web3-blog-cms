import { getAllArticles } from '@/lib/db';

export default async function AdminPage() {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Articles</h2>
        {articles.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No articles yet.</p>
        ) : (
          <ul className="space-y-2">
            {articles.map((article) => (
              <li key={article.id} className="border-b border-gray-200 dark:border-gray-700 py-2">
                <a href={`/admin/edit/${article.slug}`} className="text-blue-600 hover:underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
