import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

// 게시글 목록 조회 (Server State)
// 검색어가 다르면 다른 데이터라서 queryKey에 search를 같이 넣어요
export function usePosts(search = '') {
  return useQuery({
    queryKey: ['posts', { search }],
    queryFn: () => getPosts(search),
  });
}
