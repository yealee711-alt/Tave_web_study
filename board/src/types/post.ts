// 게시글 도메인 타입 + API Request/Response 타입을 분리해서 관리한다 (TypeScript API Request/Response Type)

/** 서버가 내려주는 게시글 하나의 형태 */
export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

/** POST /posts 요청 바디 */
export interface CreatePostRequest {
  title: string
  content: string
  author: string
}

/** PATCH /posts/:id 요청 바디 — 일부 필드만 보내도 되므로 전부 선택적(optional) */
export interface UpdatePostRequest {
  title?: string
  content?: string
  author?: string
}

/** GET /posts/:id 응답 */
export type PostResponse = Post

/** GET /posts 응답 */
export type PostListResponse = Post[]

/** 에러 응답(4xx, 5xx)에서 공통으로 내려주는 형태 */
export interface ApiErrorResponse {
  message: string
}
