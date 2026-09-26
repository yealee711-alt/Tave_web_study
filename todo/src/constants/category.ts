import type { Category } from '../types/todo';

// 카테고리별 배지/셀렉트 색상
export const CATEGORY_STYLES: Record<Category, string> = {
  업무: 'border-blue-200 bg-blue-50 text-blue-700',
  개인: 'border-violet-200 bg-violet-50 text-violet-700',
  기타: 'border-gray-200 bg-gray-100 text-gray-600',
};
