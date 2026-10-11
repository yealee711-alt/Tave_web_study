import { useThemeStore } from '../../store/useThemeStore'
import type { Theme } from '../../types/store'

const LABELS: Record<Theme, { icon: string; text: string }> = {
  light: { icon: '☀️', text: '라이트' },
  dark: { icon: '🌙', text: '다크' },
  system: { icon: '💻', text: '시스템' },
}

/** 클릭할 때마다 라이트 → 다크 → 시스템 순으로 테마를 바꾼다 */
function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const cycleTheme = useThemeStore((state) => state.cycleTheme)
  const { icon, text } = LABELS[theme]

  return (
    <button type="button" className="chip" onClick={cycleTheme} title="테마 변경">
      <span aria-hidden="true">{icon}</span> {text}
    </button>
  )
}

export default ThemeToggle
