// 게시글 도메인 타입 + API Request/Response 타입을 분리해서 관리한다 (TypeScript API Request/Response Type)

/** 서버가 내려주는 게시글 하나의 형태 */
export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

/**
 * POST /posts 요청 바디.
 * author는 보내지 않는다 — 서버가 로그인 헤더(X-User-Nickname)로 작성자를 정한다.
 */
export interface CreatePostRequest {
  title: string
  content: string
}

/** PATCH /posts/:id 요청 바디 — 일부 필드만 보내도 되므로 전부 선택적(optional). 작성자는 바꿀 수 없다 */
export interface UpdatePostRequest {
  title?: string
  content?: string
}

/** GET /posts/:id 응답 */
export type PostResponse = Post

/** GET /posts 응답 */
export type PostListResponse = Post[]

/** 작성/수정 폼에서 다루는 값 */
export type PostFormValues = CreatePostRequest
