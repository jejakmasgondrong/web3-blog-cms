'use client';

import Head from 'next/head';
import SEOHead from '@/components/common/SEOHead';
import ArticleSchema from '@/components/common/ArticleSchema';
import BreadcrumbSchema from '@/components/common/BreadcrumbSchema';

export default function TestSEOPage() {
  const testArticle = {
    title: 'Test SEO Components',
    description: 'This is a test page to verify SEO components are working correctly',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200',
    publishedTime: '2026-07-20T10:00:00.000Z',
    modifiedTime: '2026-07-20T10:00:00.000Z',
    author: 'Test Author',
    category: 'Testing',
    tags: ['seo', 'testing', 'web3'],
    url: 'http://localhost:3000/test-seo'
  };

  const breadcrumbItems = [
    { name: 'Home', url: 'http://localhost:3000' },
    { name: 'Test', url: 'http://localhost:3000/test-seo' },
  ];

  return (
    <>
      <Head>
        <SEOHead
          title={testArticle.title}
          description={testArticle.description}
          image={testArticle.image}
          article={true}
          publishedTime={testArticle.publishedTime}
          modifiedTime={testArticle.modifiedTime}
          author={testArticle.author}
          tags={testArticle.tags}
        />
      </Head>
      
      <ArticleSchema
        title={testArticle.title}
        description={testArticle.description}
        image={testArticle.image}
        url={testArticle.url}
        publishedTime={testArticle.publishedTime}
        modifiedTime={testArticle.modifiedTime}
        author={testArticle.author}
        category={testArticle.category}
        tags={testArticle.tags}
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">SEO Components Test</h1>
        <p className="text-gray-400 mb-4">Check the page source to verify SEO tags are working!</p>
        
        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Test Data</h2>
          <pre className="bg-black p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
            {JSON.stringify(testArticle, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Right click and select &quot;View Page Source&quot;</li>
            <li>Look for meta tags in the head section</li>
            <li>Look for JSON-LD script tags</li>
            <li>Check Open Graph meta tags (og:*)</li>
            <li>Check Twitter Card meta tags (twitter:*)</li>
          </ul>
        </div>
      </div>
    </>
  );
}
