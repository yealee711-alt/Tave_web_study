import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../api/posts';
import type { GetPostsParams, UpdatePostRequest } from '../types/posts';

export const postKeys = {
  all: ['posts'] as const,
  list: (params: GetPostsParams) => [...postKeys.all, 'list', params] as const,
  detail: (id: string) => [...postKeys.all, 'detail', id] as const,
};

export function usePosts(params: GetPostsParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ signal }) => getPosts(params, signal),
  });
}

export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: postKeys.detail(id!),
    queryFn: ({ signal }) => getPost(id!, signal),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useUpdatePost(id: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdatePostRequest) => updatePost(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useDeletePost(id: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}