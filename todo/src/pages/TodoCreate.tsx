import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../api/todos';
import TextInput from '../components/TextInput';

export default function TodoCreate() {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // ⭐ 입력창을 직접 가리키는 "손가락" (처음엔 아무것도 안 가리켜서 null)
  const inputRef = useRef<HTMLInputElement>(null);

  // 페이지에 들어오자마자 입력창에 커서 올리기
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 막기

    // Validation
    if (text.trim().length < 2) {
      alert('할 일은 2글자 이상 입력해주세요.');
      inputRef.current?.focus(); // 다시 입력하기 편하게 커서 돌려놓기
      return;
    }

    setIsSubmitting(true);
    try {
      await createTodo(text.trim()); // 🌐 서버에 POST
      navigate('/todos'); // 성공하면 목록으로
    } catch {
      alert('추가하지 못했어요. 서버가 켜져 있는지 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-800">새 할 일</h2>

      <TextInput ref={inputRef} value={text} onChange={setText} placeholder="새로운 할 일을 입력하세요" />

      <div className="flex gap-2">
        {/* 저장 중에는 버튼 잠그기 → 여러 번 눌러도 하나만 생겨요 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {isSubmitting ? '추가 중...' : '추가'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}
