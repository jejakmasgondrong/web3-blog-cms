import { NextResponse } from 'next/server';
import {
  parseMarkdown,
  extractPlainText,
  generateTOC,
  extractFirstImage,
  getReadingTime,
  generateExcerpt
} from '@/lib/markdown';

const testMarkdown = `
# Getting Started with Web3

Web3 is the **future** of the internet.

## What is Web3?

Web3 represents the next generation of the internet.

### Key Components

1. Blockchain
2. Smart Contracts
3. Cryptocurrency

![Web3 Image](https://example.com/web3.jpg)

> Web3 is the future.

## Getting Started

To get started with Web3, you need to learn:

- Solidity
- Rust
- JavaScript
`;

export async function GET() {
  try {
    const html = parseMarkdown(testMarkdown);
    const plainText = extractPlainText(testMarkdown);
    const toc = generateTOC(testMarkdown);
    const firstImage = extractFirstImage(testMarkdown);
    const readingTime = getReadingTime(testMarkdown);
    const excerpt = generateExcerpt(testMarkdown, 100);

    return NextResponse.json({
      success: true,
      data: {
        html,
        plainText,
        toc,
        firstImage,
        readingTime: `${readingTime} min read`,
        excerpt,
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
