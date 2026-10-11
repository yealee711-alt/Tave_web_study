import { useUserStore } from '../store/useUserStore'
import type { ApiErrorResponse } from '../types/api'

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
 *  - 401 Unauthorized            → 로그인하지 않음
 *  - 403 Forbidden               → 로그인은 했지만 권한 없음 (남의 글 수정/삭제)
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

/**
 * 로그인한 사용자를 서버에 알려주는 헤더.
 * 컴포넌트 밖이라 훅 대신 useUserStore.getState()로 Zustand 상태를 직접 읽는다.
 * HTTP 헤더에는 한글을 넣을 수 없어서 encodeURIComponent로 인코딩한다 (서버에서 decode).
 */
function authHeader(): Record<string, string> {
  const user = useUserStore.getState().user
  return user ? { 'X-User-Nickname': encodeURIComponent(user.nickname) } : {}
}

/**
 * 모든 API 호출이 거쳐가는 공통 fetch 래퍼.
 * body가 있으면 JSON으로 직렬화하고 Content-Type 헤더를 붙인다.
 */
export async function request<T>(
  path: string,
  { body, headers, ...init }: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...authHeader(),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    // 서버가 꺼져 있거나 네트워크가 끊긴 경우 fetch 자체가 reject 된다
    throw new ApiError(0, '서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.')
  }
  return handleResponse<T>(res)
}

/** 에러 객체에서 화면에 보여줄 메시지를 꺼낸다 */
export function getErrorMessage(error: unknown, fallback = '알 수 없는 오류가 발생했습니다.') {
  return error instanceof ApiError ? error.message : fallback
}
