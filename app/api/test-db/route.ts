import { NextResponse } from 'next/server';
import {
  getAllArticles,
  getArticleBySlug,
  getCategories,
  getTags,
  getRelatedArticles,
  searchArticles,
} from '@/lib/db';

export async function GET() {
  try {
    const articles = getAllArticles();
    const categories = getCategories();
    const tags = getTags();
    const article = getArticleBySlug('getting-started-with-web3-development');
    const related = article ? getRelatedArticles(article, 3) : [];
    const searchResults = searchArticles('blockchain');

    return NextResponse.json({
      success: true,
      data: {
        totalArticles: articles.length,
        articles: articles.map(a => ({ 
          id: a.id, 
          title: a.title, 
          category: a.category,
          tags: a.tags 
        })),
        categories,
        tags,
        sampleArticle: article ? {
          title: article.title,
          author: article.author,
          category: article.category,
        } : null,
        relatedArticles: related.map(r => r.title),
        searchResults: searchResults.map(r => r.title),
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
