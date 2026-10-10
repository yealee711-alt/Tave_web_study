import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../api/posts';

// 게시글 삭제 (DELETE)
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
