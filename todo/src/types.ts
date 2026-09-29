export type Category = "Study" | "Personal" | "Work";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: Category;
}