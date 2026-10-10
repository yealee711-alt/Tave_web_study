# 게시판 (3주차)

React Router + REST API로 만든 게시판이에요.

## 실행 방법

```bash
npm install
cp .env.example .env

# 터미널 1: API 서버 (json-server, http://localhost:3001)
npm run server

# 터미널 2: 화면 (http://localhost:5173)
npm run dev
```

## 페이지

| 주소 | 화면 |
| --- | --- |
| `/posts` | 게시글 목록 (`?search=` 검색) |
| `/posts/new` | 게시글 작성 |
| `/posts/:id` | 게시글 상세 (삭제) |
| `/posts/:id/edit` | 게시글 수정 |

## 4주차 리팩터링 구조

```
Page → Custom Hook → TanStack Query → API 함수 → Server
```

| 폴더 | 역할 |
| --- | --- |
| `api/` | 서버 요청 함수 (`getPosts`, `createPost` …) |
| `hooks/` | `usePosts`, `usePost`, `useCreatePost`, `useUpdatePost`, `useDeletePost` |
| `types/` | `Post`, `PostInput` |
| `store/` | Zustand `userStore` (로그인 사용자) |
| `components/` | `Loading`, `ErrorMessage`, `EmptyState`, `PostCard`, `PostForm`, `BoardLayout` |
| `pages/` | 화면 단위 컴포넌트 |
