import { getArticlesByTag, getTags } from '@/lib/db';
import ArticleList from '@/components/articles/ArticleList';
import SEOHead from '@/components/common/SEOHead';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  
  // Get all tags for validation
  const tags = getTags();
  const tag = tags.find(t => t.slug === slug);
  
  if (!tag) {
    notFound();
  }

  // Get articles with this tag
  const articles = getArticlesByTag(tag.name);

  return (
    <>
      <SEOHead
        title={`#${tag.name} Articles`}
        description={`Read all articles tagged with #${tag.name} on Web3 Blog`}
        type="website"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white">#{tag.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Articles tagged with <span className="text-blue-400">#{tag.name}</span>
          </h1>
          <p className="text-gray-400">
            Found {articles.length} article{articles.length !== 1 ? 's' : ''} with this tag
          </p>
        </div>

        {/* Articles */}
        <ArticleList articles={articles} />
      </div>
    </>
  );
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = getTags();
  
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}
