import type { ButtonHTMLAttributes, ReactNode } from 'react';

// 버튼 기본 props에 자식 요소(children)를 추가로 받는 타입
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

// 여러 곳에서 재사용하는 기본 버튼 컴포넌트
export default function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
