import { marked } from 'marked';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  mangle: false,
});

export function renderMarkdown(content: string): string {
  return marked.parse(content);
}
