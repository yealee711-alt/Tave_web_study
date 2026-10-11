import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../api/posts'
import { postKeys } from './queryKeys'

/**
 * 게시글 목록 조회 (GET /posts?search=keyword)
 * 검색어가 바뀌는 동안 이전 목록을 그대로 보여주도록 keepPreviousData를 사용한다.
 * → 새 검색 결과가 오기 전까지 화면이 깜빡이지 않는다 (isFetching으로 진행 중 표시)
 */
export function usePosts(search: string) {
  return useQuery({
    queryKey: postKeys.list(search),
    queryFn: () => fetchPosts(search || undefined),
    placeholderData: keepPreviousData,
  })
}
