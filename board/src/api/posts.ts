import type { CreatePostInput, Post } from '../types/post';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET /posts — 목록 조회 (search가 있으면 제목 검색)
export async function getPosts(search = ''): Promise<Post[]> {
  const params = new URLSearchParams();
  // json-server 문법: 제목(title)에 search가 "포함(contains)"된 글만
  if (search) params.set('title:contains', search);

  const response = await fetch(`${API_BASE_URL}/posts?${params}`);
  if (!response.ok) throw new Error(`게시글 목록 조회 실패 (${response.status})`);
  return response.json();
}

// GET /posts/:id — 상세 조회 (없는 글이면 null)
export async function getPost(id: string): Promise<Post | null> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`게시글 조회 실패 (${response.status})`);
  return response.json();
}

// POST /posts — 작성
export async function createPost(input: CreatePostInput): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`게시글 작성 실패 (${response.status})`);
  return response.json();
}

// PATCH /posts/:id — 일부 수정
export async function updatePost(id: string, input: Partial<CreatePostInput>): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`게시글 수정 실패 (${response.status})`);
  return response.json();
}

// DELETE /posts/:id — 삭제 (응답 본문은 쓰지 않음)
export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`게시글 삭제 실패 (${response.status})`);
}
