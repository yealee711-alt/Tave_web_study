/**
 * Query Key 팩토리.
 * 키를 한 곳에서 만들면 오타를 막고, invalidate 할 때 범위를 쉽게 지정할 수 있다.
 *   postKeys.all            → ['posts']                      (게시글 관련 캐시 전체)
 *   postKeys.lists()        → ['posts', 'list']              (모든 목록 캐시)
 *   postKeys.list('react')  → ['posts', 'list', { search }]  (검색어별 목록)
 *   postKeys.detail('1')    → ['posts', 'detail', '1']       (게시글 하나)
 */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (search: string) => [...postKeys.lists(), { search }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
}
