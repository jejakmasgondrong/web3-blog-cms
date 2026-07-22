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
  image?: string  // Tambahin image
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

// ... rest of the functions (sama kayak sebelumnya)
