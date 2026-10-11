import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === 'dark';

return (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="다크 모드 전환"
      className="relative h-8 w-14 rounded-full border-2 border-current"
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-current transition-all ${
          isDark ? 'left-7' : 'left-1'
        }`}
      />
    </button>
    <span className="text-sm">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
  </div>
);
}