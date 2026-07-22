import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/lib/db';
import { parseMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(params.slug, 3);
  const parsedContent = await parseMarkdown(article.content);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>

      {/* Article Header */}
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <span>{article.author || 'Admin'}</span>
        <span>•</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
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

      {/* Cover Image */}
      {article.image && (
        <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />

      {/* Tags */}
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/article/${related.slug}`}
                className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2">{related.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {related.excerpt || 'Read more...'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
