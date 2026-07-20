import { marked } from 'marked';
import { slugify } from '@/utils/slugify';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

// Custom renderer
const renderer = new marked.Renderer();

// Fix: Override heading renderer
renderer.heading = function({ tokens, depth }: { tokens: any[]; depth: number }): string {
  const text = this.parser.parseInline(tokens);
  const id = slugify(text);
  return `
    <h${depth} id="${id}" class="group relative">
      ${text}
      <a href="#${id}" class="absolute -ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
        #
      </a>
    </h${depth}>
  `;
};

// Fix: Override image renderer
renderer.image = function({ href, title, text }: { href: string; title: string; text: string }): string {
  return `
    <img 
      src="${href}" 
      alt="${text || ''}" 
      title="${title || ''}"
      loading="lazy"
      class="rounded-lg my-4 max-w-full"
    />
  `;
};

// Fix: Override link renderer
renderer.link = function({ href, title, tokens }: { href: string; title: string; tokens: any[] }): string {
  const text = this.parser.parseInline(tokens);
  const isExternal = href.startsWith('http') || href.startsWith('https');
  return `
    <a 
      href="${href}" 
      title="${title || ''}"
      ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
      class="text-blue-400 hover:text-blue-300 underline"
    >
      ${text}
    </a>
  `;
};

// Fix: Override code renderer
renderer.code = function({ text, lang }: { text: string; lang?: string }): string {
  const language = lang || 'plaintext';
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return `
    <pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">
      <code class="language-${language}">${escaped}</code>
    </pre>
  `;
};

// Fix: Override blockquote renderer
renderer.blockquote = function({ tokens }: { tokens: any[] }): string {
  const text = this.parser.parse(tokens);
  return `
    <blockquote class="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-gray-900/50">
      ${text}
    </blockquote>
  `;
};

// Use the custom renderer
marked.use({ renderer });

/**
 * Parse markdown content to HTML
 */
export function parseMarkdown(content: string): string {
  if (!content) return '';
  return marked.parse(content) as string;
}

/**
 * Extract plain text from markdown
 */
export function extractPlainText(content: string): string {
  if (!content) return '';
  let text = content
    .replace(/[#*`_~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

/**
 * Generate Table of Contents from markdown
 */
export function generateTOC(content: string): { id: string; text: string; level: number }[] {
  if (!content) return [];
  
  const headings: { id: string; text: string; level: number }[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
    }
  }
  
  return headings;
}

/**
 * Extract first image URL from markdown content
 */
export function extractFirstImage(content: string): string | null {
  if (!content) return null;
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const match = content.match(imageRegex);
  if (match) {
    return match[2];
  }
  return null;
}

/**
 * Calculate reading time in minutes
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  if (!content) return 0;
  const plainText = extractPlainText(content);
  const wordCount = plainText.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(minutes, 1);
}

/**
 * Generate excerpt from markdown content
 */
export function generateExcerpt(content: string, length: number = 160): string {
  if (!content) return '';
  const plainText = extractPlainText(content);
  if (plainText.length <= length) {
    return plainText;
  }
  const truncated = plainText.substring(0, length);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}
