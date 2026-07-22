// import fs from 'fs';
import path from 'path';
import { Article, ArticleInput, ArticleFilters, Category, Tag } from '@/types';
import { slugify } from '@/utils/slugify';
import { getCurrentISODate } from '@/utils/date';

const DATA_PATH = path.join(process.cwd(), 'data', 'articles.json');

/**
 * Read all articles from the JSON file
 * @returns Array of articles
 */
export function readArticles(): Article[] {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

/**
 * Write articles to the JSON file
 * @param articles - Array of articles to write
 */
export function writeArticles(articles: Article[]): void {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing articles:', error);
    throw new Error('Failed to save articles');
  }
}

/**
 * Get all articles with optional filtering
 * @param filters - Optional filters for articles
 * @returns Filtered array of articles
 */
export function getAllArticles(filters?: ArticleFilters): Article[] {
  let articles = readArticles();

  // Apply filters
  if (filters) {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      articles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (filters.category) {
      articles = articles.filter(
        (article) => article.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Tag filter
    if (filters.tag) {
      articles = articles.filter((article) =>
        article.tags.some((tag) => tag.toLowerCase() === filters.tag!.toLowerCase())
      );
    }

    // Author filter
    if (filters.author) {
      articles = articles.filter((article) =>
        article.author.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }

    // Sorting
    if (filters.sortBy) {
      const sortBy = filters.sortBy;
      const sortOrder = filters.sortOrder || 'desc';
      articles.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else {
          comparison = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    // Limit and offset
    if (filters.limit) {
      const offset = filters.offset || 0;
      articles = articles.slice(offset, offset + filters.limit);
    }
  }

  return articles;
}

/**
 * Get a single article by slug
 * @param slug - The article slug
 * @returns Article or null if not found
 */
export function getArticleBySlug(slug: string): Article | null {
  const articles = readArticles();
  return articles.find((article) => article.slug === slug) || null;
}

/**
 * Get articles by category
 * @param category - Category name
 * @param limit - Maximum number of articles to return
 * @returns Array of articles in the category
 */
export function getArticlesByCategory(category: string, limit?: number): Article[] {
  const articles = readArticles();
  const filtered = articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Get articles by tag
 * @param tag - Tag name
 * @param limit - Maximum number of articles to return
 * @returns Array of articles with the tag
 */
export function getArticlesByTag(tag: string, limit?: number): Article[] {
  const articles = readArticles();
  const filtered = articles.filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Get related articles for a given article
 * @param article - The source article
 * @param limit - Maximum number of related articles to return
 * @returns Array of related articles
 */
export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  const articles = readArticles();
  
  return articles
    .filter((a) => a.id !== article.id) // Exclude the current article
    .filter((a) => {
      // Related by category
      const sameCategory = a.category === article.category;
      // Related by tags (at least one shared tag)
      const sameTags = a.tags.some((tag) => article.tags.includes(tag));
      return sameCategory || sameTags;
    })
    .sort((a, b) => {
      // Prioritize articles with more shared tags
      const aScore = a.tags.filter((tag) => article.tags.includes(tag)).length;
      const bScore = b.tags.filter((tag) => article.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Create a new article
 * @param input - Article input data
 * @param author - Author name (optional)
 * @returns Created article
 */
export function createArticle(input: ArticleInput, author?: string): Article {
  const articles = readArticles();
  
  // Generate unique slug
  const existingSlugs = articles.map((a) => a.slug);
  let slug = slugify(input.title);
  if (existingSlugs.includes(slug)) {
    const randomStr = Math.random().toString(36).substring(2, 8);
    slug = `${slug}-${randomStr}`;
  }

  const newArticle: Article = {
    id: Date.now().toString(),
    title: input.title,
    slug,
    content: input.content,
    description: input.description || input.title,
    category: input.category,
    tags: input.tags || [],
    image: input.image || '',
    author: author || input.author || 'Anonymous',
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
  };

  articles.unshift(newArticle); // Add to beginning
  writeArticles(articles);
  return newArticle;
}

/**
 * Update an existing article
 * @param slug - Article slug
 * @param input - Updated article data
 * @returns Updated article or null if not found
 */
export function updateArticle(slug: string, input: Partial<ArticleInput>): Article | null {
  const articles = readArticles();
  const index = articles.findIndex((article) => article.slug === slug);
  
  if (index === -1) {
    return null;
  }

  const updatedArticle: Article = {
    ...articles[index],
    ...(input.title && { title: input.title }),
    ...(input.content && { content: input.content }),
    ...(input.description && { description: input.description }),
    ...(input.category && { category: input.category }),
    ...(input.tags && { tags: input.tags }),
    ...(input.image && { image: input.image }),
    ...(input.author && { author: input.author }),
    updatedAt: getCurrentISODate(),
  };

  // If title changed, update slug
  if (input.title && input.title !== articles[index].title) {
    const existingSlugs = articles.map((a) => a.slug).filter((s) => s !== slug);
    let newSlug = slugify(input.title);
    if (existingSlugs.includes(newSlug)) {
      const randomStr = Math.random().toString(36).substring(2, 8);
      newSlug = `${newSlug}-${randomStr}`;
    }
    updatedArticle.slug = newSlug;
  }

  articles[index] = updatedArticle;
  writeArticles(articles);
  return updatedArticle;
}

/**
 * Delete an article by slug
 * @param slug - Article slug
 * @returns Boolean indicating success
 */
export function deleteArticle(slug: string): boolean {
  const articles = readArticles();
  const filtered = articles.filter((article) => article.slug !== slug);
  
  if (filtered.length === articles.length) {
    return false; // Article not found
  }
  
  writeArticles(filtered);
  return true;
}

/**
 * Get all categories with article counts
 * @returns Array of categories with counts
 */
export function getCategories(): Category[] {
  const articles = readArticles();
  const categoryMap = new Map<string, number>();
  
  articles.forEach((article) => {
    const count = categoryMap.get(article.category) || 0;
    categoryMap.set(article.category, count + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all tags with article counts
 * @returns Array of tags with counts
 */
export function getTags(): Tag[] {
  const articles = readArticles();
  const tagMap = new Map<string, number>();
  
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Search articles by query string
 * @param query - Search query
 * @returns Array of matching articles
 */
export function searchArticles(query: string): Article[] {
  if (!query || query.trim() === '') {
    return readArticles();
  }
  
  return getAllArticles({ search: query });
}
