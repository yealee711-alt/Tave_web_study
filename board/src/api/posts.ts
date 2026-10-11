import type {
  CreatePostRequest,
  PostListResponse,
  PostResponse,
  UpdatePostRequest,
} from '../types/post'
import { request } from './client'

// 게시글 관련 API 함수 모음. 순수하게 "요청을 보내고 응답을 돌려주는" 역할만 한다.
// 캐싱/로딩/에러 상태 관리는 hooks/ 의 React Query 훅이 담당한다.

/** GET /posts?search=keyword — Query Parameter로 검색어를 전달 */
export function fetchPosts(search?: string): Promise<PostListResponse> {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  return request<PostListResponse>(`/posts${query}`)
}

/** GET /posts/:id — Path Parameter(id)로 게시글 하나를 조회 */
export function fetchPost(id: string): Promise<PostResponse> {
  return request<PostResponse>(`/posts/${id}`)
}

/** POST /posts — Request Body에 새 게시글 데이터를 담아 전송 */
export function createPost(data: CreatePostRequest): Promise<PostResponse> {
  return request<PostResponse>('/posts', { method: 'POST', body: data })
}

/** PATCH /posts/:id — 바뀐 필드만 Request Body로 보내서 부분 수정 */
export function updatePost(id: string, data: UpdatePostRequest): Promise<PostResponse> {
  return request<PostResponse>(`/posts/${id}`, { method: 'PATCH', body: data })
}

/** DELETE /posts/:id */
export function deletePost(id: string): Promise<void> {
  return request<void>(`/posts/${id}`, { method: 'DELETE' })
}
