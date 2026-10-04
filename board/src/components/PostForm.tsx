import { useState } from 'react';
import type { SubmitEvent } from 'react';
import Input from './common/Input';
import Button from './common/Button';

export interface PostFormValues {
  title: string;
  content: string;
}

interface PostFormProps {
  initialValues?: PostFormValues;
  submitLabel: string;
  onSubmit: (values: PostFormValues) => Promise<void>;
}

export default function PostForm({
  initialValues = { title: '', content: '' },
  submitLabel,
  onSubmit,
}: PostFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit({ title: title.trim(), content: content.trim() });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        maxLength={50}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        rows={8}
        className="border border-gray-400 p-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting || !title.trim() || !content.trim()}
        className="self-end"
      >
        {isSubmitting ? '저장 중...' : submitLabel}
      </Button>
    </form>
  );
}