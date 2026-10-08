import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Union Type 적용
export type Category = 'study' | 'work' | 'etc';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: Category;
}

const initialState: Todo[] = [
  {
    id: crypto.randomUUID(),
    text: '리덕스 공부하기',
    completed: false,
    category: 'study',
  },
];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; category: Category }>,
    ) => {
      state.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // (제목 수정)
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      return state.filter((t) => !t.completed);
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
