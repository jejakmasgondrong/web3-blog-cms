import Link from 'next/link';
import { formatDate } from '@/utils/date';

interface RelatedPostsProps {
  articles: any[];
  currentSlug: string;
}

export default function RelatedPosts({ articles, currentSlug }: RelatedPostsProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`}>
            <div className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900 transition-colors">
              {article.image && (
                <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="font-semibold hover:text-blue-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <span>{formatDate(article.createdAt)}</span>
                <span>•</span>
                <span>{article.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
