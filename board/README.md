# 3주차 과제 — 게시판 만들기

React Router와 REST API 연동을 활용한 React + TypeScript 게시판입니다.

## 주요 기능

- 게시글 목록 및 상세 조회
- 게시글 작성, 수정, 삭제
- 제목 검색 및 검색 조건 초기화
- URL Query Parameter를 통한 검색 상태 유지 (`/posts?q=React`)
- API 요청의 로딩 및 에러 상태 처리

## 기술 스택

- React, TypeScript, Vite
- React Router
- Tailwind CSS
- json-server (Mock REST API)

## 라우팅

| 경로              | 페이지          |
| ----------------- | --------------- |
| `/`               | `/posts`로 이동 |
| `/posts`          | 게시글 목록     |
| `/posts/new`      | 게시글 작성     |
| `/posts/:id`      | 게시글 상세     |
| `/posts/:id/edit` | 게시글 수정     |

`BoardLayout`과 `Outlet`으로 Nested Routing을 구성하고, `useParams`로 게시글 ID를 가져옵니다. 검색에는 `useSearchParams`, 작성·수정·삭제 후 이동에는 `useNavigate`를 사용합니다.

## API

json-server로 게시글 CRUD API를 구성했습니다. 요청 로직은 `src/api/posts.ts`에서 관리합니다.

| 메서드 | 경로         | 기능             |
| ------ | ------------ | ---------------- |
| GET    | `/posts`     | 게시글 목록 조회 |
| GET    | `/posts/:id` | 게시글 상세 조회 |
| POST   | `/posts`     | 게시글 작성      |
| PATCH  | `/posts/:id` | 게시글 수정      |
| DELETE | `/posts/:id` | 게시글 삭제      |

## 프로젝트 구조

```text
src/
├── api/
│   └── posts.ts
├── layouts/
│   └── BoardLayout.tsx
├── pages/
│   ├── PostList.tsx
│   ├── PostDetail.tsx
│   ├── PostCreate.tsx
│   └── PostEdit.tsx
├── types/
│   └── post.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 실행 방법

1. 프로젝트 루트에서 의존성을 설치합니다.

   ```bash
   npm install
   ```

2. 프로젝트 루트에 `.env` 파일을 만들고 API 주소를 설정합니다.

   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

3. Mock API 서버를 실행합니다.

   ```bash
   npm run server
   ```

4. 별도 터미널에서 React 개발 서버를 실행합니다.

   ```bash
   npm run dev
   ```

5. 터미널에 표시된 개발 서버 주소로 접속합니다. 게시판을 사용하려면 두 서버가 모두 실행 중이어야 합니다.
