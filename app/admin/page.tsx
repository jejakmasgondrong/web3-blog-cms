import Link from 'next/link';
import { getAllArticles } from '@/lib/db';
import SEOHead from '@/components/common/SEOHead';
import { formatDate } from '@/utils/date';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminPage() {
  const articles = getAllArticles({ sortBy: 'createdAt', sortOrder: 'desc' });

  return (
    <>
      <SEOHead
        title="Admin Dashboard"
        description="Manage articles on Web3 Blog"
        noIndex={true}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link
            href="/admin/create"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25 inline-block"
          >
            ✏️ Create New Article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No articles found.</p>
            <Link
              href="/admin/create"
              className="text-blue-400 hover:text-blue-300"
            >
              Create your first article →
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-800">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Title</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400 hidden md:table-cell">Category</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400 hidden lg:table-cell">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-gray-400 md:hidden">
                            {article.category} • {formatDate(article.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 hidden lg:table-cell">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <Link
                            href={`/article/${article.slug}`}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            View
                          </Link>
                          <DeleteButton slug={article.slug} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
