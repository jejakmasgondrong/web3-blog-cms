'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';

// Dynamic import untuk menghindari SSR issues
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-gray-500">Loading editor...</span>
    </div>
  ),
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your article content in Markdown...',
  height = '500px',
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    onChange(text);
  };

  return (
    <div className="markdown-editor-wrapper">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm rounded ${
              !isPreview
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            } transition-colors`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm rounded ${
              isPreview
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            } transition-colors`}
          >
            Preview
          </button>
        </div>
        <span className="text-xs text-gray-500">Markdown supported</span>
      </div>

      {isPreview ? (
        <div
          className="prose prose-invert prose-lg max-w-none p-6 bg-gray-900 rounded-lg min-h-[300px] overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: value || '<em className="text-gray-500">Nothing to preview...</em>',
          }}
        />
      ) : (
        <MdEditor
          value={value}
          style={{ height }}
          onChange={handleEditorChange}
          placeholder={placeholder}
          renderHTML={(text: string) => text}
        />
      )}
    </div>
  );
}
