import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../api/posts'
import { postKeys } from './queryKeys'

/** 게시글 상세 조회 (GET /posts/:id). id가 없으면 요청하지 않는다 */
export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: postKeys.detail(id ?? ''),
    queryFn: () => fetchPost(id as string),
    enabled: Boolean(id),
  })
}
