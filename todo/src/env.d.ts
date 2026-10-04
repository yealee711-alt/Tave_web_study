// import.meta.env 안에 어떤 값이 있는지 TypeScript에게 알려주기 (자동완성 + 오타 검사)
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
