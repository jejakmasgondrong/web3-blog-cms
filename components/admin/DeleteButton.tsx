'use client';

import { useTransition } from 'react';
import { deleteArticleAction } from '@/app/admin/actions';

interface DeleteButtonProps {
  slug: string;
}

export default function DeleteButton({ slug }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    startTransition(async () => {
      await deleteArticleAction(slug);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
