import type { Ref } from 'react';

interface TextInputProps {
  // ⭐ React 19부터는 ref를 일반 prop처럼 받을 수 있어요 (forwardRef 필요 없음)
  ref?: Ref<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 추가 페이지와 수정 화면에서 같이 쓰는 입력창
export default function TextInput({ ref, value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
    />
  );
}
