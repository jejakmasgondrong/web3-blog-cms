/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to convert to slug
 * @returns URL-friendly slug string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word characters
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

/**
 * Generate a unique slug by appending a random string if needed
 * @param text - The text to convert to slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug string
 */
export function generateUniqueSlug(text: string, existingSlugs: string[] = []): string {
  let slug = slugify(text);
  
  if (existingSlugs.includes(slug)) {
    const randomStr = Math.random().toString(36).substring(2, 8);
    slug = `${slug}-${randomStr}`;
  }
  
  return slug;
}
