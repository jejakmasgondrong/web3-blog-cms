'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from './MarkdownEditor';
import { getCategories } from '@/lib/db';

interface ArticleFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    description: string;
    category: string;
    tags: string[];
    image: string;
    author: string;
  };
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  submitLabel = 'Publish Article',
}: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Web3 Development',
    tags: initialData?.tags?.join(', ') || '',
    image: initialData?.image || '',
    author: initialData?.author || 'Anonymous',
  });

  useEffect(() => {
    // Load categories - pake import langsung dari db
    import('@/lib/db').then(({ getCategories }) => {
      const cats = getCategories();
      setCategories(cats.map(c => c.name));
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      };
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter article title..."
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Brief description for SEO..."
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <>
              <option value="Web3 Development">Web3 Development</option>
              <option value="Blockchain">Blockchain</option>
              <option value="DeFi">DeFi</option>
              <option value="NFT">NFT</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="web3, blockchain, defi"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="h-32 w-auto rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium mb-1">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Author name..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content *</label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Publishing...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
