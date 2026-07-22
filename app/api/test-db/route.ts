import { NextResponse } from 'next/server';
import { 
  getAllArticles, 
  getArticleBySlug, 
  getArticlesByCategory,
  getArticlesByTag,
  getCategories,
  getTags,
  searchArticles,
  getRelatedArticles
} from '@/lib/db';

export async function GET() {
  try {
    const articles = getAllArticles();
    const categories = getCategories();
    const tags = getTags();
    const article = getArticleBySlug('getting-started-with-solana');
    const related = article ? getRelatedArticles(article.slug, 3) : [];
    const searchResults = searchArticles('blockchain');

    return NextResponse.json({
      success: true,
      data: {
        totalArticles: articles.length,
        categories,
        tags,
        article,
        relatedArticles: related,
        searchResults,
      },
    });
  } catch (error) {
    console.error('Test DB error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
