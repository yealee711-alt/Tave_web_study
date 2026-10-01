import type {
  ApiErrorResponse,
  CreatePostRequest,
  PostListResponse,
  PostResponse,
  UpdatePostRequest,
} from '../types/post'

// 환경변수(.env의 VITE_API_BASE_URL)를 import.meta.env로 읽는다.
// 코드에 API 주소를 직접 적지 않기 위함 (배포 환경마다 .env만 바꾸면 됨)
const BASE_URL = import.meta.env.VITE_API_BASE_URL

/** API가 에러 상태코드를 내려줬을 때 던지는 에러. status를 들고 있어서 호출부에서 분기할 수 있다 */
export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

/**
 * fetch 응답을 공통으로 처리한다.
 * HTTP Status Code 기준:
 *  - 200 OK / 201 Created        → 정상, 본문을 JSON으로 파싱해서 반환
 *  - 204 No Content (DELETE)     → 본문 없음
 *  - 400 Bad Request             → 요청 형식/값이 잘못됨 (validation 실패 등)
 *  - 401 Unauthorized / 403 Forbidden → 인증/권한 문제 (이 과제에선 발생시키진 않지만 분기는 해둠)
 *  - 404 Not Found               → 존재하지 않는 게시글
 *  - 500 Internal Server Error   → 서버 내부 오류
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 204) {
    return undefined as T
  }

  if (!res.ok) {
    let message = `요청이 실패했습니다. (status: ${res.status})`
    try {
      const body = (await res.json()) as ApiErrorResponse
      if (body.message) message = body.message
    } catch {
      // 에러 응답 본문이 JSON이 아닌 경우는 기본 메시지를 그대로 사용
    }
    throw new ApiError(res.status, message)
  }

  return (await res.json()) as T
}

/** GET /posts?search=keyword — Query Parameter로 검색어를 전달 */
export async function fetchPosts(search?: string): Promise<PostListResponse> {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const res = await fetch(`${BASE_URL}/posts${query}`)
  return handleResponse<PostListResponse>(res)
}

/** GET /posts/:id — Path Parameter(id)로 게시글 하나를 조회 */
export async function fetchPost(id: string): Promise<PostResponse> {
  const res = await fetch(`${BASE_URL}/posts/${id}`)
  return handleResponse<PostResponse>(res)
}

/** POST /posts — Request Body에 새 게시글 데이터를 담아 전송 */
export async function createPost(data: CreatePostRequest): Promise<PostResponse> {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<PostResponse>(res)
}

/** PATCH /posts/:id — 바뀐 필드만 Request Body로 보내서 부분 수정 */
export async function updatePost(id: string, data: UpdatePostRequest): Promise<PostResponse> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<PostResponse>(res)
}

/** DELETE /posts/:id */
export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
  await handleResponse<void>(res)
}
