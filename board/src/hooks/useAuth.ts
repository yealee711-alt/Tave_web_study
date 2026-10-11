import { useUserStore } from '../store/useUserStore'
import type { Post } from '../types/post'

/**
 * 화면에서 권한을 판단할 때 쓰는 훅.
 * (화면 제어용일 뿐이고, 실제 권한 검사는 서버가 401/403으로 한 번 더 한다)
 */
export function useAuth() {
  const user = useUserStore((state) => state.user)

  return {
    user,
    isLoggedIn: user !== null,
    /** 이 글의 작성자인지 (수정/삭제 가능 여부) */
    isAuthor: (post: Pick<Post, 'author'>) => user !== null && user.nickname === post.author,
  }
}
