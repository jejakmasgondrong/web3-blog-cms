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
  image?: string
  author?: string
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
    image: '/images/web3.jpg',
    coverImage: '/images/web3.jpg',
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
    image: '/images/solana.jpg',
    coverImage: '/images/solana.jpg',
  },
]

// ============= CORE FUNCTIONS =============

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

// Get all categories
export function getCategories(): string[] {
  const categories = new Set<string>()
  articles.forEach(article => {
    if (article.category) {
      categories.add(article.category)
    }
  })
  return Array.from(categories)
}

// Get all tags
export function getTags(): string[] {
  const tags = new Set<string>()
  articles.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
}

// Search articles
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase()
  return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.excerpt?.toLowerCase().includes(lowerQuery)
  )
}

// Get related articles
export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const article = getArticleBySlug(slug)
  if (!article) return []

  const related = articles.filter(a =>
    a.slug !== slug &&
    (a.category === article.category ||
     a.tags?.some(tag => article.tags?.includes(tag)))
  )

  return related.slice(0, limit)
}

// ============= MUTATIONS =============

// Create article
export function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Article {
  const newArticle: Article = {
    ...article,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: article.author || 'Admin',
  }
  articles = [newArticle, ...articles]
  return newArticle
}

// Delete article
export function deleteArticle(id: string): boolean {
  const initialLength = articles.length
  articles = articles.filter(article => article.id !== id)
  return articles.length < initialLength
}

// Update article
export function updateArticle(id: string, data: Partial<Article>): Article | undefined {
  const index = articles.findIndex(article => article.id === id)
  if (index === -1) return undefined

  articles[index] = {
    ...articles[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  return articles[index]
}
