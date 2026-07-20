import { getArticlesByCategory, getCategories } from '@/lib/db';
import ArticleList from '@/components/articles/ArticleList';
import SEOHead from '@/components/common/SEOHead';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Get all categories for validation
  const categories = getCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  // Get articles in this category
  const articles = getArticlesByCategory(category.name);

  return (
    <>
      <SEOHead
        title={`${category.name} Articles`}
        description={`Read all articles about ${category.name} on Web3 Blog`}
        type="website"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white">{category.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Articles in <span className="text-blue-400">{category.name}</span>
          </h1>
          <p className="text-gray-400">
            Found {articles.length} article{articles.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {/* Articles */}
        <ArticleList articles={articles} />
      </div>
    </>
  );
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
