import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api/posts';
import type { PostInput } from '../types/post';

// 게시글 수정 (PATCH)
// mutate()에는 값을 하나만 넘길 수 있어서 id와 input을 객체로 묶어요
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: PostInput }) => updatePost(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // 목록 + 상세 둘 다 갱신
    },
  });
}
