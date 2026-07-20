import { getAllArticles } from '@/lib/db';
import ArticleList from '@/components/articles/ArticleList';
import SEOHead from '@/components/common/SEOHead';

export default async function HomePage() {
  const articles = getAllArticles({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <>
      <SEOHead
        title="Home"
        description="Explore the world of Web3, blockchain, and cryptocurrency"
        type="website"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Web3 Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the world of Web3, blockchain, and cryptocurrency
          </p>
        </section>

        {/* Articles */}
        <ArticleList 
          articles={articles} 
          title={`Latest Articles (${articles.length})`}
        />
      </div>
    </>
  );
}
