import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '../types/store'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  /** light → dark → system → light 순서로 돌린다 */
  cycleTheme: () => void
}

const NEXT_THEME: Record<Theme, Theme> = { light: 'dark', dark: 'system', system: 'light' }

/**
 * 테마 전역 상태. persist 미들웨어로 localStorage에 저장해서 새로고침해도 유지된다.
 * 실제 화면 적용은 hooks/useApplyTheme이 <html data-theme="..."> 속성으로 한다.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      cycleTheme: () => set((state) => ({ theme: NEXT_THEME[state.theme] })),
    }),
    { name: 'board-theme' },
  ),
)
