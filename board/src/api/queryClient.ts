import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './client'

/**
 * 앱 전체에서 하나만 쓰는 QueryClient.
 *  - staleTime: 30초 동안은 캐시를 "신선한" 데이터로 보고 다시 요청하지 않는다
 *  - retry: 4xx(잘못된 요청, 없는 게시글)는 다시 시도해도 결과가 같으므로 재시도하지 않는다
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
    },
  },
})
