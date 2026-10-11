import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, updatePost } from '../api/posts'
import type { CreatePostRequest, UpdatePostRequest } from '../types/post'
import { postKeys } from './queryKeys'

// 작성/수정/삭제 Mutation 훅.
// 성공했을 때 어떤 캐시를 갱신/무효화할지는 여기서 책임지고,
// "성공 후 어느 페이지로 이동할지" 같은 화면 흐름은 페이지에서 mutate의 onSuccess로 처리한다.

/** POST /posts */
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: (created) => {
      // 새 글은 상세 캐시에 바로 넣어두고(상세 페이지 진입 시 추가 요청 X), 목록은 다시 불러오게 한다
      queryClient.setQueryData(postKeys.detail(String(created.id)), created)
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

/** PATCH /posts/:id */
export function useUpdatePost(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => updatePost(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(postKeys.detail(id), updated)
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

/** DELETE /posts/:id */
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}
