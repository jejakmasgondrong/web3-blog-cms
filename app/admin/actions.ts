'use server';

import { getAllArticles, deleteArticle, createArticle } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getArticles() {
  return getAllArticles();
}

export async function deleteArticleAction(slug: string) {
  // Find article by slug and delete
  const articles = getAllArticles();
  const article = articles.find(a => a.slug === slug);
  if (article) {
    deleteArticle(article.id);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  }
  return { success: false, error: 'Article not found' };
}

export async function createArticleAction(data: any) {
  const newArticle = {
    title: data.title,
    content: data.content,
    slug: data.slug || data.title.toLowerCase().replace(/ /g, '-'),
    category: data.category,
    tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
    excerpt: data.excerpt || data.content.slice(0, 150),
    coverImage: data.coverImage || '',
  };
  
  createArticle(newArticle);
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}
