import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookmarkState {
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
}

const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarkedIds: [],

      toggleBookmark: (id) => {
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.includes(id)
            ? state.bookmarkedIds.filter((savedId) => savedId !== id)
            : [...state.bookmarkedIds, id],
        }));
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.filter(
            (savedId) => savedId !== id,
          ),
        }));
      },
    }),
    {
      name: "board-bookmarks",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarkedIds: state.bookmarkedIds,
      }),
    },
  ),
);

export default useBookmarkStore;
