import { useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore'

/**
 * 스토어의 theme 값을 <html data-theme="..."> 에 반영한다.
 * 'system'이면 속성을 지워서 CSS의 prefers-color-scheme 미디어쿼리를 따르게 한다.
 */
export function useApplyTheme() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      delete root.dataset.theme
    } else {
      root.dataset.theme = theme
    }
  }, [theme])
}
