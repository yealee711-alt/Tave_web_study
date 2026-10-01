/// <reference types="vite/client" />

// .env에 정의한 환경변수를 import.meta.env에서 타입 안전하게 쓰기 위한 선언
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
