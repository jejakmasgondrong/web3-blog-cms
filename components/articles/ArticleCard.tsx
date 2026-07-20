import Link from 'next/link';
import { formatDate, getRelativeTime } from '@/utils/date';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    tags: string[];
    image?: string;
    author: string;
    createdAt: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`}>
      <article className="group bg-gray-900/50 rounded-xl overflow-hidden hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
        {article.image && (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <time dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
            <span>•</span>
            <span>{getRelativeTime(article.createdAt)}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h2>
          
          <p className="text-gray-400 mb-4 line-clamp-2 flex-1">
            {article.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              By {article.author}
            </span>
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
              {article.category}
            </span>
          </div>
          
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
