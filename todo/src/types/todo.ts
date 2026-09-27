export const TODO_CATEGORIES = ['공부', '일정', '생활', '기타'] as const;

export type TodoCategory = (typeof TODO_CATEGORIES)[number];

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: TodoCategory;
}