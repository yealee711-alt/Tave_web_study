const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function messageByStatus(status: number): string {
  switch (status) {
    case 400:
      return '요청 형식이 올바르지 않습니다.';
    case 401:
      return '로그인이 필요합니다.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 데이터를 찾을 수 없습니다.';
    case 500:
      return '서버에 문제가 발생했습니다.';
    default:
      return `요청에 실패했습니다. (${status})`;
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new ApiError(res.status, messageByStatus(res.status));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}