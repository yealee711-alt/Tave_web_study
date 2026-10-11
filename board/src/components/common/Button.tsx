import type { ButtonHTMLAttributes } from 'react';

type Variant = 'outline' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_STYLE: Record<Variant, string> = {
  outline: 'border border-gray-400 dark:border-gray-600',
  ghost: 'text-gray-600 dark:text-gray-400',
  danger: 'text-red-600 dark:text-red-400',
};

export default function Button({
  className = '',
  type = 'button',
  variant = 'outline',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`h-9 px-3 disabled:opacity-40 ${VARIANT_STYLE[variant]} ${className}`}
      {...props}
    />
  );
}