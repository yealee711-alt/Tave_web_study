// 전역 상태(Zustand store)에서 쓰는 타입

/** 'system'은 OS 설정(prefers-color-scheme)을 따른다 */
export type Theme = 'light' | 'dark' | 'system'

export interface User {
  nickname: string
}
