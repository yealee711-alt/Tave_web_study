import type { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = '', ...props }: SelectProps) {
  return (
    <select className={`px-2 h-9 border border-gray-400 ${className}`} {...props} />
  );
}