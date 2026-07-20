'use server';

import { getAllArticles, deleteArticle, createArticle } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getArticles() {
  return getAllArticles({ sortBy: 'createdAt', sortOrder: 'desc' });
}

export async function deleteArticleAction(slug: string) {
  if (!slug) return { success: false, error: 'No slug provided' };
  
  try {
    const success = deleteArticle(slug);
    if (success) {
      revalidatePath('/admin');
      revalidatePath('/');
      return { success: true };
    }
    return { success: false, error: 'Article not found' };
  } catch (error) {
    return { success: false, error: 'Failed to delete article' };
  }
}

export async function createArticleAction(data: any) {
  try {
    const article = createArticle(data);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true, article };
  } catch (error) {
    return { success: false, error: 'Failed to create article' };
  }
}
