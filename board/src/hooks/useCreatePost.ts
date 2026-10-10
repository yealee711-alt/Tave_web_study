import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

// 게시글 작성 (POST)
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 'posts'로 시작하는 캐시(목록·상세)를 전부 "옛날 데이터"로 표시 → 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
