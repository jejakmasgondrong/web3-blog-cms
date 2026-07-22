import { marked } from 'marked';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Parse markdown to HTML
export async function parseMarkdown(content: string): Promise<string> {
  return await marked.parse(content);
}

// Alias for parseMarkdown
export const renderMarkdown = parseMarkdown;

// Extract plain text from markdown
export async function extractPlainText(markdown: string): Promise<string> {
  const html = await parseMarkdown(markdown);
  // Remove HTML tags
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Generate Table of Contents from markdown
export function generateTOC(markdown: string): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const lines = markdown.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ id, text, level });
    }
  });
  
  return headings;
}

// Extract first image URL from markdown
export function extractFirstImage(markdown: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = markdown.match(imageRegex);
  return match ? match[1] : null;
}

// Calculate reading time (approx 200 words per minute)
export async function getReadingTime(markdown: string): Promise<number> {
  const plainText = await extractPlainText(markdown);
  const words = plainText.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Generate excerpt from markdown (first 150 characters)
export async function generateExcerpt(markdown: string, maxLength: number = 150): Promise<string> {
  const plainText = await extractPlainText(markdown);
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...' 
    : plainText;
}
