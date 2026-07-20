import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/db';
import { parseMarkdown } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDate, getRelativeTime } from '@/utils/date';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  // Parse markdown content
  const parsedContent = parseMarkdown(article.content);
  const readingTime = Math.ceil(article.content.split(/\s+/).length / 200);

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <time dateTime={article.createdAt}>
                {formatDate(article.createdAt)}
              </time>
              <span>•</span>
              <span>{getRelativeTime(article.createdAt)}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {article.author?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{article.author || 'Anonymous'}</div>
                  <div className="text-sm text-gray-400">Writer</div>
                </div>
              </div>
            </div>

            {article.image && (
              <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            )}

            {/* Category & Tags */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm hover:bg-blue-600/30 transition-colors"
              >
                {article.category}
              </Link>
              {article.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
