'use client';

import ArticleForm from '@/components/editor/ArticleForm';
import { createArticleAction } from '../actions';
import { useRouter } from 'next/navigation';
import SEOHead from '@/components/common/SEOHead';

export default function CreateArticlePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const article = await createArticleAction(data);
    router.push('/admin');
    return article;
  };

  return (
    <>
      <SEOHead
        title="Create Article"
        description="Create a new article for Web3 Blog"
        noIndex={true}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
        <ArticleForm onSubmit={handleSubmit} submitLabel="Publish Article" />
      </div>
    </>
  );
}
