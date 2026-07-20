```bash
> DEBUGGING.md <
# Debugging Guide

A comprehensive guide for troubleshooting common issues in Web3 Blog CMS.

## 📋 Table of Contents

- [Installation Issues](#installation-issues)
- [Development Server Issues](#development-server-issues)
- [Tailwind CSS Issues](#tailwind-css-issues)
- [TypeScript Issues](#typescript-issues)
- [Build Issues](#build-issues)
- [Web3 & Wallet Issues](#web3--wallet-issues)
- [Database Issues](#database-issues)
- [Performance Issues](#performance-issues)
- [Quick Fixes](#quick-fixes)
- [Getting Help](#getting-help)

---

## 🔧 Installation Issues

### Error: Permission Denied

Error Message:
```
Permission denied (publickey)
```

Solution:
```bash
# Check SSH keys
ls -la ~/.ssh

# Generate new SSH key if needed
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add key to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Add key to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy output and add to GitHub Settings > SSH Keys
```

### Error: Cannot find module

Error Message:
```
Cannot find module 'some-package'
```

Solution:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check package.json for correct dependencies
npm list --depth=0
```

### Error: Node version mismatch

Error Message:
```
Node.js version 14.x.x is not supported
```

Solution:
```bash
# Check current version
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18

# Or use nvmrc
echo "18" > .nvmrc
nvm use
```

---

## 🚀 Development Server Issues

### Error: Port 3000 already in use

Error Message:
```
Error: listen EADDRINUSE: address already in use :::3000
```

Solution:
```bash
# Find process using port 3000
sudo lsof -i :3000
# or
npx kill-port 3000

# Use different port
npm run dev -- -p 3001
```

### Error: Next.js version mismatch

Error Message:
```
Warning: You are using a version of Next.js that is not compatible
```

Solution:
```bash
# Check versions
npm list next

# Update Next.js
npm install next@latest

# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Error: Turbopack issues

Error Message:
```
Turbopack: Failed to compile
```

Solution:
```bash
# Disable Turbopack
npm run dev -- --no-turbo

# Clear .next cache
rm -rf .next
npm run dev
```

---

## 🎨 Tailwind CSS Issues

### Error: Cannot apply unknown utility class

Error Message:
```
Cannot apply unknown utility class `bg-black`
```

Solution:
```bash
# Check if tailwind.config.ts exists
ls -la tailwind.config.ts

# Ensure content paths are correct
# In tailwind.config.ts:
content: [
  './app//*.{js,ts,jsx,tsx,mdx}',
  './components//*.{js,ts,jsx,tsx,mdx}',
]

# Clear cache
rm -rf .next
npm run dev
```

### Error: Tailwind styles not applying

Error Message:
```
Styles not rendering / CSS not compiling
```

Solution:
```bash
# Check globals.css has correct imports
cat app/globals.css

# For Tailwind v3:
@tailwind base;
@tailwind components;
@tailwind utilities;

# For Tailwind v4:
@import "tailwindcss";

# Check postcss.config.js
cat postcss.config.js
```

### Error: @tailwindcss/postcss not found

Error Message:
```
Cannot find module '@tailwindcss/postcss'
```

Solution:
```bash
# Install missing packages
npm install -D @tailwindcss/postcss autoprefixer postcss

# Update postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## 📝 TypeScript Issues

### Error: Cannot find module or type declarations

Error Message:
```
Cannot find module 'some-module' or its corresponding type declarations
```

Solution:
```bash
# Install type declarations
npm install -D @types/some-module

# Or create custom declaration
echo "declare module 'some-module';" > src/types/global.d.ts
```

### Error: Type mismatch

Error Message:
```
Type 'xxx' is not assignable to type 'yyy'
```

Solution:
```bash
# Check your types/index.ts
# Ensure proper type definitions
# Use type assertion if needed
const data = something as MyType
```

### Error: Cannot find module '@/components'

Error Message:
```
Cannot find module '@/components/something'
```

Solution:
```bash
# Check tsconfig.json paths
"paths": {
  "@/*": ["./*"]
}

# Ensure file exists
ls -la components/something.tsx

# Restart TypeScript server in VSCode
# Cmd+Shift+P -> "TypeScript: Restart TS server"
```

---

## 🏗️ Build Issues

### Error: Build failing with "Can't resolve"

Error Message:
```
Module not found: Can't resolve 'some-module'
```

Solution:
```bash
# Install missing module
npm install some-module

# Check import path
# Wrong: import from 'components/Header'
# Right: import from '@/components/Header'
```

### Error: Build failing with "ReferenceError"

Error Message:
```
ReferenceError: something is not defined
```

Solution:
```bash
# Check for client-side code in server components
# Add 'use client' directive if needed
'use client'

import { useState } from 'react'
```

### Error: Build taking too long

Solution:
```bash
# Optimize build
npm run build -- --debug

# Check for unused imports
# Use ESLint to find issues
npm run lint

# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## 🦊 Web3 & Wallet Issues

### Error: Wallet not connecting

Error Message:
```
No Ethereum wallet found
```

Solution:
```bash
# Check if wallet extension is installed
# Install MetaMask or other wallet
# Check network connection

# Verify wallet is unlocked
# Try connecting manually:
# In browser console
window.ethereum.request({ method: 'eth_requestAccounts' })
```

### Error: Chain ID mismatch

Error Message:
```
Chain ID mismatch
```

Solution:
```javascript
// Check your wagmi config
// Ensure correct chain ID
const config = {
  chains: [mainnet, sepolia],
  // ...
}

// Switch network in wallet
// Or manually add network
```

### Error: Transaction failed

Error Message:
```
Transaction failed / User rejected
```

Solution:
```bash
# Check gas price
# Check user has enough funds
# Check if user confirmed transaction
# Check contract address is correct
```

---

## 💾 Database Issues

### Error: Cannot read articles.json

Error Message:
```
Cannot read property 'xxx' of undefined
```

Solution:
```bash
# Check if data/articles.json exists
ls -la data/articles.json

# Validate JSON format
cat data/articles.json | jq .

# Create with valid format
echo '[]' > data/articles.json
```

### Error: Article not found

Error Message:
```
Article with slug 'xxx' not found
```

Solution:
```javascript
// Check slug generation
import { slugify } from '@/utils/slugify'

// Ensure slugs are unique
// Check for special characters
const slug = slugify(title)
```

---

## ⚡ Performance Issues

### Error: Slow page loads

Solutions:
```bash
# Use Next.js Image optimization
import Image from 'next/image'

# Implement lazy loading
const Component = dynamic(() => import('./Component'))

# Check bundle size
npm run build -- --analyze
```

### Error: Memory usage high

Solutions:
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Check for memory leaks
# Use Chrome DevTools Memory tab
# Implement proper cleanup in useEffect
```

---

## 🔄 Quick Fixes

### Reset everything
```bash
# Complete reset
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Clear all caches
```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Clear Turbo cache (if using)
rm -rf .turbo
```

### Check TypeScript
```bash
npx tsc --noEmit
```

### Fix linting issues
```bash
npm run lint -- --fix
```

### Check unused dependencies
```bash
npm prune
```

### Update all packages
```bash
npm update --save
```

---

## 🆘 Getting Help

### Check These First
1. Browser Console - F12 → Console tab
2. Terminal Output - Full error messages
3. Network Tab - API call issues
4. Application Tab - Storage/State issues

### Error Reporting Template
When reporting issues, include:

```markdown
Description:
[What happened]

Error Message:
[Full error message]

Steps to Reproduce:
1. Step one
2. Step two
3. Step three

Environment:
- Node version: 
- Package version: 
- OS: 

Screenshots:
[If applicable]
```

### Useful Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Wagmi Docs](https://wagmi.sh/react/getting-started)
- [Stack Overflow](https://stackoverflow.com)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

---

### 📝 Common Error Codes

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 500 | Internal Server Error | Check server logs, restart server |
| 404 | Not Found | Check file paths, routes |
| 403 | Forbidden | Check permissions, authentication |
| 400 | Bad Request | Check request payload |
| 429 | Too Many Requests | Implement rate limiting |

---

*Last Updated: 2026-07-20*