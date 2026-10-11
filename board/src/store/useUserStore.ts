
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  authorName: string
  setAuthorName: (name: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      authorName: '',

      setAuthorName: (name) =>
        set({ authorName: name }),
    }),
    {
      name: 'board-user-storage',
    }
  )
)
