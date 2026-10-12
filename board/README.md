# TAVE 스터디 — 게시판 리팩토링 및 업데이트

기존 React 게시판을 리팩토링하고 북마크 기능과 반응형 디자인을 추가한 5주차 과제입니다.

## 주요 기능

- 게시글 목록·상세 조회 및 작성·수정·삭제
- 제목 검색과 북마크 필터: URL로 조건을 유지하며 함께 사용 가능
- 목록·상세 화면에서 북마크 추가·해제, 새로고침 후에도 유지
- 입력값 검증, 요청 중 버튼 비활성화, 로딩·오류·빈 결과 안내
- 사이드바와 파스텔 카드 중심의 디자인, 모바일 반응형 배치

## 리팩토링 내용

- **TypeScript:** 게시글 ID를 실제 데이터에 맞춰 문자열로 통일
- **공통 컴포넌트:** `PostForm`으로 작성·수정 UI, `BookmarkButton`으로 북마크 UI 재사용
- **커스텀 훅:** `usePostForm`으로 입력 상태·검증, `usePost`로 상세·수정 조회 분리
- **React Query:** `useQuery`로 조회, `useMutation`으로 변경 요청 관리. 변경 후 목록 갱신, 수정 후 상세 캐시 반영, 삭제 후 상세 캐시 제거
- **Zustand:** 북마크 ID를 공유하고 `persist`로 브라우저의 localStorage에 저장
- **Tailwind CSS:** `BoardLayout`과 공통 스타일로 레이아웃·버튼·입력창·상태 안내 통일

게시글 데이터는 React Query, 북마크는 Zustand, 입력값은 폼 훅, 검색·필터 조건은 URL에서 관리합니다. 북마크는 해당 브라우저에 저장되며 기기 간 동기화는 지원하지 않습니다.

## 기술 스택

React · TypeScript · Vite · React Router · TanStack Query · Zustand · Tailwind CSS · json-server

## 실행 방법

```bash
npm install
```

프로젝트 루트의 `.env`에 API 주소를 설정합니다.

```env
VITE_API_BASE_URL=http://localhost:3001
```

아래 명령을 각각 별도 터미널에서 실행하고 개발 서버 주소로 접속합니다.

```bash
npm run server
npm run dev
```

## 검증

- 디자인 변경 후 `npm run build`, `npm run lint` 통과
- 검색, 북마크 필터·새로고침 유지, 상세·수정 화면 및 빈 입력 검사 확인
- 작성·수정·삭제 동작과 목록 반영은 스터디 진행 중 직접 확인
