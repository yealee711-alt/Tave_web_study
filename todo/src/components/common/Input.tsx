import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: InputProps) {
  return <input className={`px-2 h-9 border ${className}`} {...props} />;
}