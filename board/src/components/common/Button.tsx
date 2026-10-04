import type { ButtonHTMLAttributes } from 'react';

type Variant = 'outline' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_STYLE: Record<Variant, string> = {
  outline: 'border border-gray-400',
  ghost: 'text-gray-600',
  danger: 'text-red-600',
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