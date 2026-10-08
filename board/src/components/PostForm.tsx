import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { CreatePostInput } from '../types/post';

interface PostFormProps {
  initialValues?: CreatePostInput; // 수정할 때만 기존 값을 넘겨받음
  submitLabel: string;
  onSubmit: (input: CreatePostInput) => Promise<void>;
  onCancel: () => void;
}

const EMPTY: CreatePostInput = { title: '', content: '', author: '' };

const inputClass =
  'w-full rounded-md border border-rose-200 px-4 py-2 text-[13px] outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200';

// 작성 페이지와 수정 페이지에서 같이 쓰는 폼
export default function PostForm({ initialValues = EMPTY, submitLabel, onSubmit, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [author, setAuthor] = useState(initialValues.author);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useRef: 페이지에 들어오면 제목 입력창에 바로 커서
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // form 제출 시 새로고침 막기

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      titleRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || '익명',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" className={inputClass} />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작성자 (비우면 익명)" className={inputClass} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        rows={8}
        className={`${inputClass} resize-y`}
      />

      <div className="flex gap-2">
        {/* 제출 중에는 버튼 잠그기 → 연타로 글이 여러 개 생기는 것 방지 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-rose-200 px-4 py-2 text-sm font-semibold text-dusty-rose hover:bg-rose-300 disabled:opacity-50"
        >
          {isSubmitting ? `${submitLabel} 중...` : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-rose-200 px-4 py-2 text-sm text-dusty-rose hover:bg-rose-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}
