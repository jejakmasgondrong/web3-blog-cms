// Mock database for Vercel deployment
// In production, use a real database like PostgreSQL, MongoDB, etc.

export interface Article {
  id: string
  title: string
  content: string
  slug: string
  category?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  excerpt?: string
  coverImage?: string
  author?: string  // Tambahkan author
}

// Mock data
let articles: Article[] = [
  {
    id: '1',
    title: 'Welcome to Web3 Blog',
    content: 'This is a sample article about Web3.',
    slug: 'welcome-to-web3-blog',
    category: 'Web3',
    tags: ['web3', 'blockchain'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    excerpt: 'Welcome to the world of Web3 blogging.',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'Getting Started with Solana',
    content: 'Learn how to build on Solana.',
    slug: 'getting-started-with-solana',
    category: 'Solana',
    tags: ['solana', 'blockchain'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    excerpt: 'Start your Solana journey here.',
    author: 'Admin',
  },
]

// Get all articles
export function getAllArticles(): Article[] {
  return articles
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category)
}

// Get articles by tag
export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => article.tags?.includes(tag))
}

// Get all categories// Get all categories
export function getCategories(): string[]
export function getCategories(): string[] {
  const categories = new Set( {
  const categories = new Set(articles.map(articlearticles.map(article => article.category).filter(Boolean))
 => article.category).filter(Boolean))
  return Array.from(categories) as string[]
}

  return Array.from(categories) as string[]
}

// Get// Get all tags
 all tags
export function getTags(): string[] {
  const tagsexport function getTags(): string[] {
  const tags = = new Set(articles.flatMap(article => article new Set(articles.flatMap(article => article.tags || []))
  return Array.from.tags || []))
  return Array.from(tags(tags)
}

// Search articles
export function searchArticles)
}

// Search articles
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase()
 (query: string): Article[] {
  const lowerQuery = query.toLowerCase()
  return articles.filter(article =>
    article.title.toLowerCase().includes return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
   (lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
 article.content.toLowerCase().includes(lowerQuery) ||
    article.excerpt?.toLowerCase().    article.excerpt?.toLowerCase().includes(lowerQueryincludes(lowerQuery)
  )
}

// Get related articles)
  )
}

// Get related articles (based on category (based on category or tags)
export function getRelatedArticles(s or tags)
export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
 lug: string, limit: number = 3): Article[] {
  const article = getArticleBySlug(slug const article = getArticleBySlug(slug)
  if)
  if (!article) return []

  const related = articles.filter (!article) return []

  const related = articles.filter(a =>
    a.slug !== slug(a =>
    a.slug !== slug &&
    (a.category === article.category &&
    (a.category === article.category ||
     a.tags?.some(tag => article ||
     a.tags?.some(tag => article.tags?.includes(t.tags?.includes(tag)))
  )

  return related.slice(0,ag)))
  )

  return related.slice(0, limit)
}

// Create article
export limit)
}

// Create article
export function createArticle( function createArticle(article: Omit<Article, 'article: Omit<Article, 'id' | 'id' | 'createdAt' | 'updatedAt'>): Article {
createdAt' | 'updatedAt'>): Article {
  const newArticle:  const newArticle: Article = {
    ...article,
    id: String(Date Article = {
    ...article,
    id: String(Date.now()),
    createdAt.now()),
    createdAt: new Date().toISOString(),
: new Date().toISOString(),
    updatedAt: new Date    updatedAt: new Date().toISOString(),
   ().toISOString(),
    author: article.author || author: article.author || 'Admin',
  }
  'Admin',
  }
  articles = [newArticle, ...articles]
  return new articles = [newArticle, ...articles]
  return newArticle
}

// Delete article
export function deleteArticle(id: string): booleanArticle
}

// Delete article
export function deleteArticle(id {
  const initial: string): boolean {
  const initialLength = articles.length
Length = articles.length
  articles = articles.filter(article  articles = articles.filter(article => article.id !== id)
  => article.id !== id)
  return articles.length return articles.length < initialLength
}

// Update article
 < initialLength
}

// Update article
export function updateArticleexport function updateArticle(id: string, data: Partial<Article>): Article(id: string, data: Partial<Article>): Article | | undefined {
  const index = articles undefined {
  const index = articles.findIndex(article => article.id ===.findIndex(article => article.id === id)
  if id)
  if (index === -1) return undefined

  articles[index (index === -1) return undefined

  articles[index] = {
    ...articles[index],
] = {
    ...articles[index],
    ...data,
    ...data,
    updatedAt: new Date().toISOString(),
     updatedAt: new Date().toISOString(),
  }
  return articles[index]
}
