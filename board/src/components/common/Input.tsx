import type { InputHTMLAttributes, Ref } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input className={`h-9 px-2 border border-gray-400 ${className}`} {...props} />
  );
}