import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';

// 게시글 하나 조회
// queryKey에 id를 꼭 넣어야 글마다 따로 저장돼요 (['post']만 쓰면 모든 글이 같은 캐시를 공유)
export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id!),
    enabled: !!id, // id가 있을 때만 요청
  });
}
