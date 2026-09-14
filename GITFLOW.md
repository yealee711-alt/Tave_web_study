# Git Flow Guide

## 1. Git Flow 개요

프크크 스터디에서는 `main`과 개인 작업 브랜치를 사용합니다.

### 브랜치 구조

```text
main
 ├─ feat/todo-이름
 ├─ feat/todo-이름
 ├─ feat/todo-이름
 │
 ├─ feat/board-이름
 ├─ feat/board-이름
 └─ ...
```

* `main` : Best Implementation이 모이는 브랜치
* `feat/todo-이름` : Todo 프로젝트 개인 작업 브랜치
* `feat/board-이름` : Board 프로젝트 개인 작업 브랜치
* 각자 자신의 브랜치에서 독립적으로 구현합니다.
* 구현이 끝나면 `main`을 대상으로 PR을 생성합니다.
* 서로의 코드를 리뷰한 후 스터디에서 Best Implementation을 선정합니다.
* 선정된 PR만 `main`에 merge합니다.

### 폴더 구조

Best Implementation이 차례로 `main`에 merge되면 최종적으로 다음과 같은 구조가 됩니다.

```text
TAVE-Web-Study/
├── README.md
├── GITFLOW.md
├── todo/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── board/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

> `todo`, `board` 폴더는 미리 `main`에 만들지 않습니다.
> 각자의 작업 브랜치에서 프로젝트를 생성하고, Best Implementation이 `main`에 merge될 때 해당 폴더가 추가됩니다.

---

## 2. 프로젝트별 브랜치

### 1~2주차 : Todo

```text
feat/todo-이름
```

1주차에 생성한 Todo 브랜치에서 2주차까지 계속 작업합니다.

### 3~4주차 : Board

```text
feat/board-이름
```

Board 프로젝트가 시작되면 `main`에서 새로운 브랜치를 생성합니다.

```bash
git checkout main
git pull origin main
git checkout -b feat/board-이름
```

---

## 3. 처음 레포지토리 가져오기

처음 스터디 레포지토리를 사용하는 경우:

```bash
git clone 레포지토리주소
cd 레포지토리폴더
```

예시:

```bash
git clone https://github.com/...
cd TAVE-Web-Study
```

> 이미 레포지토리를 clone한 경우에는 다시 clone하지 않습니다.

---

## 4. 작업 시작하기

작업을 시작하기 전에 `main`을 최신 상태로 가져옵니다.

```bash
git checkout main
git pull origin main
```

그다음 자신의 작업 브랜치로 이동합니다.

```bash
git checkout feat/todo-이름
```

아직 자신의 브랜치가 없다면:

```bash
git checkout -b feat/todo-이름
```

현재 브랜치를 확인하려면:

```bash
git branch
```

`*` 표시가 자신의 작업 브랜치에 있는지 확인합니다.

---

## 5. 프로젝트 생성

자신의 작업 브랜치에서 프로젝트 폴더를 생성합니다.

### Todo

```bash
npm create vite@latest todo -- --template react-ts
cd todo
npm install
npm run dev
```

> 모든 스터디원이 `todo`라는 동일한 폴더 이름을 사용합니다.
> 각자의 브랜치에서 독립적으로 작업하기 때문에 같은 폴더 이름을 사용해도 괜찮습니다.

### Board

```bash
npm create vite@latest board -- --template react-ts
cd board
npm install
npm run dev
```

> Board 프로젝트도 모든 스터디원이 `board`라는 동일한 폴더 이름을 사용합니다.

---

## 6. 작업 후 Commit

작업이 끝나면 변경사항을 확인합니다.

```bash
git status
```

변경사항을 staging합니다.

```bash
git add .
```

Commit합니다.

```bash
git commit -m "feat: Todo 기능 구현"
```

작은 단위로 나누어 commit하는 것을 권장합니다.

---

## 7. 원격 저장소에 Push

처음 Push할 때:

```bash
git push -u origin feat/todo-이름
```

이후에는:

```bash
git push
```

---

## 8. Pull Request 생성

GitHub에서 자신의 작업 브랜치 → `main`으로 Pull Request를 생성합니다.

```text
feat/todo-이름
      ↓
    main
```

### PR 제목 예시

```text
feat: Todo 프로젝트 구현 - 이예진
```

PR에는 다음 내용을 작성합니다.

* 구현한 기능
* 어려웠던 부분
* 고민한 부분
* 참고한 자료
* 리뷰받고 싶은 부분

---

## 9. Code Review

자신의 PR을 올린 후 정해진 다른 스터디원의 PR을 리뷰합니다.

리뷰할 때는 단순히 잘못된 부분을 찾기보다,

* 왜 이렇게 구현했는지
* 다른 방법은 없는지
* 어떤 방식이 더 읽기 쉬운지
* 어떤 방식이 유지보수하기 좋은지

를 중심으로 생각합니다.

예시:

```text
이 부분을 컴포넌트로 분리한 이유가 궁금합니다!

저라면 ○○ 방식으로 구현했을 것 같은데,
이 방식의 장점이 있을까요?
```

> 코드 리뷰는 서로의 구현 방식을 비교하고 배우기 위한 과정입니다.

---

## 10. Best Implementation 선정

스터디 시간에 각자의 구현을 비교합니다.

다음과 같은 기준으로 Best Implementation을 선정합니다.

* 요구사항 충족 여부
* 코드 가독성
* 컴포넌트 구조
* 상태 관리 방식
* 코드 재사용성
* 유지보수성
* React 개념 활용

Best Implementation은 단순히 **코드가 가장 짧은 사람**을 의미하지 않습니다.

각자의 구현에서 좋은 점을 찾아보고, 왜 해당 구현이 좋은지 함께 이야기하는 것을 목표로 합니다.

---

## 11. Best Implementation을 `main`에 Merge

Best Implementation으로 선정된 PR만 `main`에 merge합니다.

```text
개인 브랜치
    ↓
Pull Request
    ↓
Code Review
    ↓
Best Implementation 선정
    ↓
main에 Merge
```

다른 PR은 merge하지 않고 그대로 남겨둡니다.

> Merge되지 않은 PR도 다른 구현 방식을 비교하고 학습할 수 있는 자료로 활용합니다.

---

## 12. Merge 이후

Best Implementation이 `main`에 merge되면 다음 프로젝트를 시작하기 전에 `main`을 최신 상태로 업데이트합니다.

```bash
git checkout main
git pull origin main
```

이후 새로운 프로젝트 브랜치를 생성합니다.

```bash
git checkout -b feat/board-이름
```

이제 새로운 브랜치에서 Board 프로젝트를 생성하고 작업을 시작합니다.

---

## 13. Commit Convention

Commit 메시지는 다음 형식을 사용합니다.

```text
type: 작업 내용
```

### Type

| Type       | 의미         |
| ---------- | ---------- |
| `feat`     | 새로운 기능     |
| `fix`      | 버그 수정      |
| `style`    | 스타일 수정     |
| `refactor` | 코드 구조 개선   |
| `chore`    | 설정 및 기타 작업 |
| `docs`     | 문서 수정      |

### 예시

```bash
git commit -m "feat: Todo 추가 기능 구현"
git commit -m "fix: Todo 삭제 오류 수정"
git commit -m "refactor: Todo 컴포넌트 분리"
git commit -m "docs: Git Flow 가이드 추가"
```

---

## 14. 꼭 지켜주세요

### ① `main`에서 직접 작업하지 않습니다.

```text
❌ main에서 코드 작성
⭕ 자신의 feat 브랜치에서 작업
```

### ② 작업 전에 `main`을 최신 상태로 가져옵니다.

```bash
git checkout main
git pull origin main
```

### ③ 현재 브랜치를 확인합니다.

```bash
git branch
```

실수로 `main`에서 작업하고 있지 않은지 확인합니다.

### ④ 잘 모르는 Git 명령어는 혼자 실행하지 않습니다.

특히 다음 명령어는 주의합니다.

```bash
git reset --hard
git push --force
```

문제가 생겼다면 여러 명령어를 연속으로 실행하기보다 터미널의 에러 메시지를 스터디 채팅에 공유합니다.

---

## 15. Git 문제가 생겼다면

먼저 현재 상태를 확인합니다.

```bash
git status
```

현재 브랜치를 확인합니다.

```bash
git branch
```

터미널에 나온 에러 메시지를 그대로 공유합니다.

```text
[에러 메시지]
```

**혼자 해결하려고 여러 명령어를 연속으로 실행하지 않는 것을 권장합니다.**

---

## 16. 전체 Workflow

```text
① main 최신화
      ↓
② 자신의 feat 브랜치 이동/생성
      ↓
③ 프로젝트 생성
      ↓
④ 기능 구현
      ↓
⑤ Commit
      ↓
⑥ Push
      ↓
⑦ Pull Request → main
      ↓
⑧ 다른 스터디원 PR Code Review
      ↓
⑨ 스터디에서 구현 비교
      ↓
⑩ Best Implementation 선정
      ↓
⑪ Best Implementation만 main Merge
      ↓
⑫ main 최신화
      ↓
⑬ 다음 프로젝트 브랜치 생성
```
