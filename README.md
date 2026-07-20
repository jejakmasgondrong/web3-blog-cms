# Web3 Blog CMS

A modern, SEO-optimized blog content management system built with Next.js 14, Tailwind CSS, and Solana Web3 integration.

![Web3 Blog CMS](public/og-image.png)

## ✨ Features

- 🔍 **SEO Optimized** - Meta tags, Open Graph, JSON-LD, Article Schema
- 📝 **Markdown Editor** - Write articles with full markdown support
- 📚 **Article Management** - Create, edit, and publish articles
- 🏷️ **Categories & Tags** - Organize your content effectively
- 🔎 **Search** - Full-text search across all articles
- 🔗 **Related Posts** - Smart content recommendations
- 🦊 **Solana Integration** - Wallet connection and on-chain verification
- 🌙 **Dark Theme** - Modern dark UI design
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **TypeScript** - Type-safe and maintainable codebase

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **Tailwind CSS** | Utility-first CSS framework |
| **TypeScript** | Static type checking |
| **Marked** | Markdown parsing |
| **Gray-Matter** | Frontmatter parsing |
| **Solana Web3** | Blockchain integration |
| **Solana Wallet Adapter** | Wallet connection |

## 📁 Project Structure
web3-blog-cms/
├── app/ # Next.js App Router
│ ├── layout.tsx # Root layout with metadata
│ ├── page.tsx # Homepage
│ ├── article/[slug]/ # Dynamic article routes
│ ├── admin/ # Admin dashboard
│ │ ├── page.tsx # Admin homepage
│ │ ├── create/ # Create article
│ │ └── actions.ts # Server actions
│ ├── category/[slug]/ # Category pages
│ ├── tag/[slug]/ # Tag pages
│ └── search/ # Search results
├── components/ # React components
│ ├── layout/ # Layout components
│ │ ├── Header.tsx # Navigation with search
│ │ └── Footer.tsx # Page footer
│ ├── articles/ # Article components
│ │ ├── ArticleCard.tsx
│ │ ├── ArticleList.tsx
│ │ └── RelatedPosts.tsx
│ ├── common/ # Shared/SEO components
│ │ ├── SEOHead.tsx
│ │ ├── ArticleSchema.tsx
│ │ └── BreadcrumbSchema.tsx
│ ├── editor/ # Markdown editor
│ │ ├── MarkdownEditor.tsx
│ │ └── ArticleForm.tsx
│ └── web3/ # Web3 components
│ ├── SolanaProvider.tsx
│ ├── ConnectWallet.tsx
│ └── ArticleOwnership.tsx
├── lib/ # Utilities & helpers
│ ├── db.ts # Database operations
│ ├── markdown.ts # Markdown processing
│ └── solana.ts # Solana configuration
├── utils/ # Shared utilities
├── hooks/ # Custom React hooks
├── types/ # TypeScript definitions
└── data/ # JSON data storage
└── articles.json # Article data

text

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git (for version control)
- Phantom or Solflare wallet (for Web3 features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/web3-blog-cms.git
   cd web3-blog-cms
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env.local
Edit .env.local with your configuration:

env
# Public (safe to expose)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Web3 Blog CMS
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Private (NEVER use NEXT_PUBLIC prefix!)
# DATABASE_URL=postgresql://user:password@localhost:5432/db
# JWT_SECRET=your-secret-key-here
Run development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

📝 Usage Guide
Creating an Article
Navigate to /admin page

Click "Create New Article"

Fill in the form:

Title - Article headline

Description - SEO meta description

Content - Write in Markdown

Category - Select or create new

Tags - Add relevant tags (comma separated)

Image - URL for featured image

Author - Your name

Click "Publish" to save

Managing Content
View Articles - All articles appear on homepage

Edit Articles - Click edit icon on any article

Delete Articles - Remove unwanted content

Search - Use search bar to find articles

Categories - Filter by category

Tags - Filter by tag

Web3 Features
Connect your Solana wallet (Phantom/Solflare)

Verify article ownership by signing a message

On-chain verification (coming soon)

🔧 Configuration
Environment Variables
Variable	Description	Required
NEXT_PUBLIC_SITE_URL	Your site URL	Yes
NEXT_PUBLIC_APP_NAME	Application name	Yes
NEXT_PUBLIC_SOLANA_RPC_URL	Solana RPC endpoint	For Web3
DATABASE_URL	Database URL (for production)	For production
JWT_SECRET	JWT secret key	For auth
Tailwind CSS
Customize theme in tailwind.config.ts and global styles in app/globals.css.

🚢 Deployment
Deploy to Vercel (Recommended)
Push your code to GitHub

Import the project on Vercel

Add environment variables

Deploy

Build for Production
bash
npm run build
npm start
🤝 Contributing
Contributions are welcome! Here's how:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
Built with Next.js

Styled with Tailwind CSS

Web3 powered by Solana Web3

Built with ❤️ for the Web3 community
