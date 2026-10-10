import { create } from 'zustand';

// 전역 상태(Global State): 로그인한 사용자 정보
// Header(BoardLayout)와 글쓰기 페이지(작성자 기본값)에서 같이 써요
type User = {
  name: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// TypeScript에서는 create<타입>()(...) 처럼 괄호가 두 번 들어가요
export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
