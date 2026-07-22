import { NextResponse } from 'next/server';
import {
  parseMarkdown,
  extractPlainText,
  generateTOC,
  extractFirstImage,
  getReadingTime,
  generateExcerpt,
} from '@/lib/markdown';

export async function GET() {
  const testMarkdown = `
# Hello World

This is a test markdown content.

## Section 1

Some content here.

![Image](https://example.com/image.jpg)

## Section 2

More content.
  `;

  try {
    const html = await parseMarkdown(testMarkdown);
    const plainText = await extractPlainText(testMarkdown);
    const toc = generateTOC(testMarkdown);
    const image = extractFirstImage(testMarkdown);
    const readingTime = await getReadingTime(testMarkdown);
    const excerpt = await generateExcerpt(testMarkdown, 100);

    return NextResponse.json({
      success: true,
      data: {
        html,
        plainText,
        toc,
        image,
        readingTime,
        excerpt,
      },
    });
  } catch (error) {
    console.error('Markdown test error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to parse markdown' },
      { status: 500 }
    );
  }
}
