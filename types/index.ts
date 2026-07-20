/**
 * Article type definition
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Article input type for creating/updating
 */
export interface ArticleInput {
  title: string;
  content: string;
  description?: string;
  category: string;
  tags: string[];
  image?: string;
  author?: string;
}

/**
 * Article filters for search
 */
export interface ArticleFilters {
  search?: string;
  category?: string;
  tag?: string;
  author?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Category type
 */
export interface Category {
  name: string;
  slug: string;
  count: number;
}

/**
 * Tag type
 */
export interface Tag {
  name: string;
  slug: string;
  count: number;
}
