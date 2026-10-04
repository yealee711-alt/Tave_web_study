import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/todo';

// 초기 상태
const initialState: Todo[] = [
  { id: crypto.randomUUID(), text: '리덕스 툴킷 공부하기', completed: false },
  { id: crypto.randomUUID(), text: 'React Router 연결하기', completed: false },
];

// 슬라이스 (상태 변경 로직)
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // ✨ 새로 추가: 상세 페이지에서 내용 수정
    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
