# 📝 Web3 Blog CMS

A modern, SEO-optimized blog content management system built with **Next.js 14**, Tailwind CSS, and Solana Web3 integration.

**Live demo:** https://web3-blog-cms.vercel.app

## Features

- 🔍 **SEO optimized** — meta tags, Open Graph, JSON-LD (Article + Breadcrumb schema)
- 📝 **Markdown editor** — write articles with full Markdown support
- 📚 **Article management** — create, edit, publish, delete
- 🏷️ **Categories & tags** — organize content effectively
- 🔎 **Search** — full-text search across all articles
- 🔗 **Related posts** — smart content recommendations
- 🦊 **Solana integration** — wallet connect & on-chain article verification
- 🌙 **Dark theme** — modern dark UI
- 📱 **Responsive** — all devices

## Tech Stack

| Technology | Use |
|------------|-----|
| Next.js 14 (App Router) | React framework |
| Tailwind CSS | Utility-first styling |
| TypeScript | Type safety |
| Marked | Markdown parsing |
| Gray-matter | Frontmatter parsing |
| Solana Web3 / Wallet Adapter | Blockchain integration |

## Project Structure

```text
app/
├── layout.tsx          # Root layout with metadata + SEO
├── page.tsx            # Homepage (article list)
├── article/[slug]/     # Dynamic article routes
├── admin/              # Admin dashboard (list, create, edit)
│   ├── actions.ts      # Server actions
│   └── create / edit/  # Article forms
├── category/[slug]/    # Category pages
├── tag/[slug]/         # Tag pages
├── search/             # Search results
└── api/                # API routes
components/
├── layout/             # Header, Footer
├── articles/           # ArticleCard, ArticleList, RelatedPosts
├── common/             # SEOHead, ArticleSchema, BreadcrumbSchema
├── editor/             # MarkdownEditor, ArticleForm
├── admin/              # Admin UI components
└── web3/               # SolanaProvider, ConnectWallet, ArticleOwnership
lib/
├── db.ts               # Data helpers (reads/writes articles.json)
├── markdown.ts         # Markdown processing
├── seo.ts              # SEO helpers (schema generation)
└── solana.ts           # Solana configuration
data/
└── articles.json       # Article data store
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom / Solflare) for Web3 features

### Installation

```bash
git clone https://github.com/jejakmasgondrong/web3-blog-cms.git
cd web3-blog-cms
npm install
```

### Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Web3 Blog CMS
```

All variables are public-safe (no `NEXT_PUBLIC_` secrets — this project stores data in `data/articles.json`, not a remote DB).

### Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Usage

- **Create an article** — go to `/admin`, click Create, fill in title, description, Markdown content, category, tags, image URL, and author, then **Publish**
- **Edit / delete** — use the edit icons on any article
- **Search** — use the search bar in the header
- **Categories / tags** — filter articles by category or tag
- **Web3** — connect a Solana wallet to verify article ownership by signing a message

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | ESLint check |

## Deployment

**Recommended: Vercel**

1. Push the repo to GitHub
2. Import in Vercel
3. Add optional env vars
4. Deploy

## Notes

- Articles are stored in `data/articles.json` (simple, portable — no external database required)
- Troubleshooting regular issues can be found in `DEBUGGING.md`

## License

MIT — free for learning or portfolio purposes.

## Author

Gondrong — [jejakmasgondrong](https://github.com/jejakmasgondrong)