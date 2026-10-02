export const CATEGORIES = ['일정', '공부', '운동', '기타'] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_STYLE: Record<Category, string> = {
  일정: 'bg-blue-100 text-blue-700',
  공부: 'bg-green-100 text-green-700',
  운동: 'bg-pink-100 text-pink-700',
  기타: 'bg-amber-100 text-amber-700'
};
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
}