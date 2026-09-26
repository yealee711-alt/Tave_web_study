// 선택 가능한 카테고리 목록 (단일 출처)
export const CATEGORIES = ['업무', '개인', '기타'] as const;
export type Category = (typeof CATEGORIES)[number];

// 할 일 하나를 표현하는 타입
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
}
