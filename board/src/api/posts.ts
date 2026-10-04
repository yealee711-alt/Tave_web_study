import { request, ApiError } from './client';
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  GetPostsParams,
} from '../types/posts';

export async function getPosts(
  { page, limit, search }: GetPostsParams,
  signal?: AbortSignal
): Promise<Post[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.set('search', search);

  try {
    return await request<Post[]>(`/posts?${params}`, { signal });
  } catch (e) {
    // 결과가 없는 페이지에서 404가 오는 경우 빈 목록으로 처리
    if (e instanceof ApiError && e.status === 404) return [];
    throw e;
  }
}

export function getPost(id: string, signal?: AbortSignal): Promise<Post> {
  return request<Post>(`/posts/${id}`, { signal });
}

export function createPost(body: CreatePostRequest): Promise<Post> {
  return request<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updatePost(id: string, body: UpdatePostRequest): Promise<Post> {
  return request<Post>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function deletePost(id: string): Promise<void> {
  return request<void>(`/posts/${id}`, { method: 'DELETE' });
}