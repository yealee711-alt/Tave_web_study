# TAVE Web Study

## 🌱 스터디 Git 사용 목적

이 스터디에서는 하나의 프로젝트를 함께 완성하는 것이 아니라,

> **같은 요구사항을 각자 구현하고 → 서로의 코드를 리뷰하고 → 좋은 구현을 함께 선정하는 것**

을 목표로 합니다.

따라서 모든 팀원이 각자의 브랜치에서 자유롭게 작업하고,
스터디가 끝난 후 **가장 좋은 구현이라고 판단한 코드만 `main`에 merge**합니다.

---

# 브랜치 구조

```text
main
 ├─ feat/todo-yejin
 ├─ feat/todo-이름
 ├─ feat/todo-이름
 ├─ feat/todo-이름
 │
 ├─ feat/board-yejin
 ├─ feat/board-이름
 ├─ feat/board-이름
 └─ feat/board-이름
```

### `main`

* 스터디에서 선정된 **Best Implementation**을 모아두는 브랜치
* 모든 팀원의 코드를 merge하지 않음
* 스터디가 끝난 후 가장 좋은 구현이라고 판단한 PR만 merge
* 직접 커밋 금지
* PR을 통해서만 merge

### 개인 브랜치

각자 자신의 이름으로 브랜치를 만들어 작업합니다.

```text
feat/todo-이예진 << (ex)
feat/todo-name
feat/todo-name

feat/board-이예진 << (ex)
feat/board-name
feat/board-name
```

각 브랜치는 **한 사람이 하나의 프로젝트를 구현하는 공간**입니다.

---

# 📚 주차별 프로젝트

| 주차  | 프로젝트     | 브랜치             |
| --- | -------- | --------------- |
| 1주차 | Todo     | `feat/todo-이름`  |
| 2주차 | Todo 개선  | `feat/todo-이름`  |
| 3주차 | Board    | `feat/board-이름` |
| 4주차 | Board 개선 | `feat/board-이름` |

> 1~2주차는 Todo, 3~4주차는 Board를 진행합니다.

---

# 🚀 작업 시작하기

## 1. Repository Clone

처음 한 번만 진행합니다.

```bash
git clone 레포지토리주소
```

프로젝트 폴더로 이동합니다.

```bash
cd tave-web-study
```

---

## 2. main 최신 상태 가져오기

작업을 시작하기 전에 항상 `main`의 최신 상태를 가져옵니다.

```bash
git checkout main
git pull origin main
```

---

## 3. 내 브랜치 만들기

### Todo

```bash
git checkout -b feat/todo-이름
```

예시:

```bash
git checkout -b feat/todo-이예진
```

### Board

```bash
git checkout -b feat/board-이름
```

예시:

```bash
git checkout -b feat/board-이예진
```

> 브랜치는 프로젝트 시작 시 한 번 만들고, 해당 프로젝트가 끝날 때까지 사용합니다.

---

# 💻 작업하기

자유롭게 코드를 작성하고 커밋합니다.

```bash
git add .
git commit -m "feat: Todo 추가 기능 구현"
```

작업 중간중간 커밋을 남겨도 괜찮습니다.

예:

```text
feat: Todo 입력 기능 구현
feat: Todo 목록 렌더링 구현
fix: Todo 삭제 오류 수정
refactor: Todo 컴포넌트 분리
```

### 💡 커밋은 너무 어렵게 생각하지 않기

개인 브랜치의 커밋 기록은 자유롭게 작성해도 됩니다.

중요한 것은 **최종 PR 제목**입니다.

---

# 📤 GitHub에 내 브랜치 올리기

처음 push할 때:

```bash
git push -u origin feat/todo-이예진
```

이후에는:

```bash
git push
```

하면 됩니다.

---

# 🔀 Pull Request 만들기

작업이 완료되면 GitHub에서

```text
내 브랜치 → main
```

으로 Pull Request를 생성합니다.

예:

```text
feat/todo-이예진
        ↓
      main
```

## PR 제목

PR 제목은 커밋 컨벤션에 맞춰 작성합니다.

```text
feat: Todo 프로젝트 구현
```

예:

```text
feat: Todo 프로젝트 구현 - 이예진
```

---

# 📝 Pull Request 작성 방법

PR에는 단순히 "완료했습니다"라고 작성하기보다
**어떤 방식으로 구현했는지 + 고민한 부분**을 적습니다.

```md
## 구현 내용

- Todo 추가 기능 구현
- Todo 삭제 기능 구현
- Todo 완료 상태 변경
- 컴포넌트 분리

## 구현하면서 고민한 점

- Todo 상태를 부모 컴포넌트에서 관리했습니다.
- props를 어떤 방식으로 전달할지 고민했습니다.

## 다른 사람의 의견을 듣고 싶은 부분

- 현재 컴포넌트 구조가 적절한지 궁금합니다.
- 상태 관리를 다른 방식으로 하는 것이 좋을지 궁금합니다.

## 참고

- 참고한 문서나 자료가 있다면 작성
```

---

# 👀 Code Review

모든 팀원은 다른 팀원의 PR을 확인합니다.

코드를 직접 실행해보고, 궁금한 점이나 개선할 점을 자유롭게 남깁니다.

### 좋은 리뷰 예시

```text
이 상태를 여기서 관리한 이유가 궁금해요!
부모 컴포넌트에서 관리하는 것과 비교하면 어떤 장점이 있을까요?
```

```text
이 부분은 컴포넌트로 분리하면 재사용하기 더 좋을 것 같은데
이렇게 작성하신 이유가 있을까요?
```

```text
저는 map을 사용했는데 filter를 사용하신 방식이 흥미롭네요.
두 방식의 차이를 같이 비교해보면 좋을 것 같습니다.
```

### ❌ 피해야 할 리뷰

```text
이렇게 하면 안 돼요.

이게 더 좋은 것 같은데요?

왜 이렇게 했어요?
```

> 코드 리뷰의 목적은 **정답을 지적하는 것보다 서로 다른 구현 방법을 비교하고 배우는 것**입니다.

---

# 🏆 Best Implementation 선정

스터디 시간에 각자의 PR을 함께 살펴봅니다.

다음과 같은 기준으로 코드를 비교합니다.

* 코드 가독성
* 컴포넌트 구조
* 상태 관리
* 재사용성
* 유지보수성
* React 개념의 적절한 활용
* 요구사항 충족 여부

그리고 스터디에서 **가장 좋은 구현이라고 생각하는 PR을 선정**합니다.

---

# ✅ main에 Merge

Best Implementation으로 선정된 PR만 `main`에 merge합니다.

```text
feat/todo-이예진 ──┐
feat/todo-연우 ────┤
feat/todo-지후 ────┤
                   ↓
              Code Review
                   ↓
             🏆 Best 선정
                   ↓
                  main
```

예를 들어 이예진의 코드가 선정되었다면:

```text
feat/todo-이예진
        ↓
      main
```

으로 merge합니다.

### 다른 PR은?

**merge하지 않습니다.**

하지만 PR 자체는 GitHub에 남아있기 때문에
나중에 다른 팀원의 구현과 리뷰 내용을 다시 확인할 수 있습니다.

> 즉, `main`은 완성된 프로젝트를 모아두는 곳이고,
> 각자의 PR은 스터디 과정과 학습 기록으로 남습니다.

---

# 🔄 다음 주차 시작

새로운 프로젝트를 시작할 때는 `main`에서 새 브랜치를 만듭니다.

### 3주차 Board

```bash
git checkout main
git pull origin main
git checkout -b feat/board-이름
```

이후 동일한 과정을 반복합니다.

```text
개인 브랜치 생성
      ↓
프로젝트 구현
      ↓
GitHub Push
      ↓
PR 생성
      ↓
서로 Code Review
      ↓
스터디에서 코드 비교
      ↓
Best Implementation 선정
      ↓
main Merge
```

---

# 📌 브랜치 이름 규칙

프로젝트 종류 + 이름을 사용합니다.

```text
feat/todo-이름
feat/board-이름
```

예시:

```text
feat/todo-이예진
feat/todo-김민수
feat/board-이예진
feat/board-김민수
```

> 한글 브랜치명이 불편한 경우 영어 이름/닉네임을 사용해도 됩니다.

```text
feat/todo-yejin
feat/board-yejin
```

---

# 📝 Commit Convention

개인 브랜치에서는 너무 엄격하게 관리하지 않습니다.

기본적으로 다음 타입을 사용합니다.

| 타입         | 의미         | 예시                       |
| ---------- | ---------- | ------------------------ |
| `feat`     | 새로운 기능     | `feat: Todo 추가 기능 구현`    |
| `fix`      | 버그 수정      | `fix: Todo 삭제 오류 수정`     |
| `style`    | 스타일 수정     | `style: Todo 버튼 스타일 수정`  |
| `refactor` | 코드 구조 개선   | `refactor: Todo 컴포넌트 분리` |
| `chore`    | 설정 및 기타 작업 | `chore: 프로젝트 초기 설정`      |
| `docs`     | 문서 수정      | `docs: README 작성`        |

예시:

```bash
git commit -m "feat: Todo 추가 기능 구현"
git commit -m "feat: Todo 삭제 기능 구현"
git commit -m "fix: Todo 입력 오류 수정"
git commit -m "refactor: Todo 컴포넌트 분리"
```

---

# ⚠️ 꼭 기억할 것

### 1. `main`에서 직접 작업하지 않기

```text
❌ main에서 코드 작성
⭕ 내 브랜치에서 코드 작성
```

### 2. 작업 시작 전 `pull`

```bash
git checkout main
git pull origin main
```

### 3. 내 브랜치에서 작업

```bash
git checkout -b feat/todo-이름
```

### 4. 작업 후 Push

```bash
git push
```

### 5. GitHub에서 PR 생성

```text
내 브랜치 → main
```

### 6. 다른 사람의 코드도 리뷰하기

PR을 올리는 것만으로 끝나지 않습니다.

**내 PR 1개 + 사전에 정한 다른 스터디원 PR 리뷰**까지가 한 세트입니다.

---

# 🆘 Git이 꼬였을 때

처음 Git을 사용하는 경우 문제가 생기면 혼자 해결하려고 무리하지 않습니다.

```text
❓ 현재 어떤 브랜치인지 모르겠어요
❓ push가 안 돼요
❓ commit을 잘못했어요
❓ merge conflict가 발생했어요
❓ 파일이 사라졌어요
```

이런 상황에서는 **터미널에 나온 에러 메시지를 그대로 스터디 톡방에 공유**합니다.

```bash
git status
```

결과를 함께 올려주면 문제를 확인하기 쉽습니다.

> ⚠️ `git reset --hard`, `git push --force` 등은 임의로 사용하지 않습니다.

---

# 🎯 최종 목표

이 스터디에서 Git은 단순히 코드를 공유하기 위한 도구가 아닙니다.

```text
각자 구현
   ↓
PR
   ↓
Code Review
   ↓
서로의 코드 비교
   ↓
Best Practice 논의
   ↓
Best Implementation
   ↓
main에 기록
```

**"내 코드가 정답"이 아니라
"같은 문제를 다른 방식으로 풀어보고, 서로의 방법에서 배우는 것"**을 목표로 합니다.
