import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/store'

interface UserState {
  user: User | null
  login: (nickname: string) => void
  logout: () => void
}

/**
 * 사용자 전역 상태 (간단한 닉네임 로그인).
 * 헤더에서 로그인하면 글쓰기 폼의 작성자 기본값, "내 글" 표시 등 여러 화면에서 같은 값을 읽는다.
 * props로 계속 내려주지 않아도 어디서든 useUserStore로 꺼내 쓸 수 있다.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (nickname) => set({ user: { nickname: nickname.trim() } }),
      logout: () => set({ user: null }),
    }),
    { name: 'board-user' },
  ),
)
