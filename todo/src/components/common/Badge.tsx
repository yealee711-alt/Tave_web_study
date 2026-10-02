import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${className}`}>
      {children}
    </span>
  );
}