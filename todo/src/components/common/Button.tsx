import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`px-4 py-2 border ${className}`} {...props} />;
}