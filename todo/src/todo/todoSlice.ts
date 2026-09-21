import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. 데이터 타입 정의 (id는 문자열, 완료 여부는 completed)
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// 2. 초기 상태
const initialState: Todo[] = [
  { id: crypto.randomUUID(), text: '리덕스 툴킷 공부하기', completed: false },
];

// 3. 슬라이스 (상태 변경 로직)
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({
        id: crypto.randomUUID(), // 고유한 문자열 ID 생성
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
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;