
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../api/posts'

import type {
  CreatePostRequest,
  UpdatePostRequest,
} from '../types/post'

// 전체 게시글 조회
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
}

// 게시글 상세 조회
export function usePost(id?: string) {
  const postId = Number(id)

  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPost(postId),
    enabled: !!id && Number.isInteger(postId) && postId > 0,
  })
}

// 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}

// 게시글 수정
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: UpdatePostRequest
    }) => updatePost(id, data),

    onSuccess: (post) => {
      queryClient.setQueryData(['posts', post.id], post)

      return queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}

// 게시글 삭제
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),

    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: ['posts', id],
        exact: true,
      })

      return queryClient.invalidateQueries({
        queryKey: ['posts'],
      })
    },
  })
}
