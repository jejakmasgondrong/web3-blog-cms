import {
  getAllArticles,
  getArticleBySlug,
  getCategories,
  getTags,
  getRelatedArticles,
  searchArticles,
  createArticle
} from './lib/db';

// Test function
async function testDB() {
  console.log('📚 Testing Database Layer...\n');

  // 1. Get all articles
  console.log('1️⃣ All Articles:');
  const articles = getAllArticles();
  console.log(`Found ${articles.length} articles\n`);

  // 2. Get article by slug
  console.log('2️⃣ Get Article by Slug:');
  const article = getArticleBySlug('getting-started-with-web3-development');
  if (article) {
    console.log(`Found: ${article.title} by ${article.author}\n`);
  }

  // 3. Get categories
  console.log('3️⃣ Categories:');
  const categories = getCategories();
  categories.forEach(cat => {
    console.log(`- ${cat.name}: ${cat.count} articles`);
  });
  console.log('');

  // 4. Get tags
  console.log('4️⃣ Tags:');
  const tags = getTags();
  tags.forEach(tag => {
    console.log(`- #${tag.name}: ${tag.count} articles`);
  });
  console.log('');

  // 5. Get related articles
  if (article) {
    console.log('5️⃣ Related Articles:');
    const related = getRelatedArticles(article, 3);
    related.forEach(rel => {
      console.log(`- ${rel.title}`);
    });
    console.log('');
  }

  // 6. Search articles
  console.log('6️⃣ Search "blockchain":');
  const results = searchArticles('blockchain');
  results.forEach(res => {
    console.log(`- ${res.title}`);
  });
  console.log('');

  // 7. Create new article (test)
  console.log('7️⃣ Creating new article...');
  const newArticle = createArticle({
    title: 'Test Article from DB Layer',
    content: 'This is a test article created by the database layer test.',
    description: 'Test article for database layer',
    category: 'Web3 Development',
    tags: ['test', 'database'],
    author: 'Test User'
  });
  console.log(`✅ Created article: ${newArticle.title} (ID: ${newArticle.id})\n`);

  console.log('✅ All database tests completed!');
}

testDB().catch(console.error);
