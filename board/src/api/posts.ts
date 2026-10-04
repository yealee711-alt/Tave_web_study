import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
} from '../types/post'

const API_URL = 'http://localhost:3001'

// 게시글 전체 조회
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`)

  if (!response.ok) {
    throw new Error('게시글 목록을 불러오지 못했습니다.')
  }

  return response.json()
}

// 게시글 상세 조회
export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`)

  if (!response.ok) {
    throw new Error('게시글을 불러오지 못했습니다.')
  }

  return response.json()
}

// 게시글 작성
export async function createPost(
  data: CreatePostRequest
): Promise<Post> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('게시글 작성에 실패했습니다.')
  }

  return response.json()
}

// 게시글 수정
export async function updatePost(
  id: number,
  data: UpdatePostRequest
): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('게시글 수정에 실패했습니다.')
  }

  return response.json()
}

// 게시글 삭제
export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('게시글 삭제에 실패했습니다.')
  }
}