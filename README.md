```bash
> README.md <
# Web3 Blog CMS

A modern, SEO-optimized blog content management system built with Next.js 14, Tailwind CSS, and Web3 integration.

## ✨ Features

- 🔍 SEO Optimized - Meta tags, Open Graph, JSON-LD, Article Schema
- 📝 Markdown Editor - Write articles with full markdown support
- 📚 Article Management - Create, edit, and publish articles
- 🏷️ Categories & Tags - Organize your content effectively
- 🔎 Search - Full-text search across all articles
- 🔗 Related Posts - Smart content recommendations
- 🦊 Web3 Integration - Wallet connection and on-chain verification
- 🌙 Dark Theme - Modern dark UI design
- 📱 Responsive - Works perfectly on all devices
- ⚡ TypeScript - Type-safe and maintainable codebase

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| Tailwind CSS | Utility-first CSS framework |
| TypeScript | Static type checking |
| Marked | Markdown parsing |
| Gray-Matter | Frontmatter parsing |
| Wagmi | React hooks for Ethereum |
| Viem | Type-safe Ethereum library |
| Ethers | Ethereum interaction |
| React Query | Server state management |

## 📁 Project Structure

```
web3-blog-cms/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── article/[slug]/     # Dynamic article routes
│   ├── admin/              # Admin dashboard
│   ├── category/[slug]/    # Category pages
│   ├── tag/[slug]/         # Tag pages
│   └── search/             # Search results
├── components/             # React components
│   ├── layout/             # Layout components
│   ├── articles/           # Article components
│   ├── common/             # Shared/SEO components
│   ├── editor/             # Markdown editor
│   └── web3/               # Web3 components
├── lib/                    # Utilities & helpers
├── utils/                  # Shared utilities
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript definitions
└── data/                   # JSON data storage
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git (for version control)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/web3-blog-cms.git
   cd web3-blog-cms
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=Web3 Blog CMS
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

4. Run development server
   ```bash
   npm run dev
   ```

5. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage Guide

### Creating an Article

1. Navigate to `/admin` page
2. Click "Create New Article"
3. Fill in the form:
   - Title - Article headline
   - Content - Write in Markdown
   - Category - Select or create new
   - Tags - Add relevant tags
4. Click "Publish" to save

### Managing Content

- View Articles - All articles appear on homepage
- Edit Articles - Click edit icon on any article
- Delete Articles - Remove unwanted content
- Search - Use search bar to find articles

### Categories & Tags

- Categories help organize content by topic
- Tags provide granular content classification
- Both are automatically created when used

### Web3 Features

- Connect your Ethereum wallet
- Verify article ownership
- On-chain metadata storage (coming soon)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | For Web3 |

### Tailwind CSS

The project uses Tailwind CSS for styling. Customize in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy:

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Web3 powered by [Wagmi](https://wagmi.sh)

## 📞 Contact

- GitHub: https://github.com/jejakmasgondrong
- Twitter: -

---

Built with ❤️ for the Web3 community
```