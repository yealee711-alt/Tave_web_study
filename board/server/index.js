// 게시판 과제 학습용 Mock REST API 서버.
// JSONPlaceholder 같은 공개 API는 POST/PATCH/DELETE를 보내도 실제로 저장되지 않기 때문에,
// GET/POST/PATCH/DELETE를 직접 확인할 수 있도록 Express로 간단한 서버를 만들었다.
// (데이터는 메모리에만 저장되므로 서버를 재시작하면 초기 데이터로 리셋된다.)
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())

/** @type {{ id: number, title: string, content: string, author: string, createdAt: string }[]} */
let posts = [
  {
    id: 1,
    title: '안녕하세요 좋은아침입니다.',
    content: '기분이 조금 조흐네용 ㅎㅎ.',
    author: '예진이짱',
    createdAt: new Date('2026-09-20T09:00:00Z').toISOString(),
  },
  {
    id: 2,
    title: 'tave 스터디 프크크팀 진짜 재밌어보인다',
    content: '제곧내',
    author: '익명의 사무라이',
    createdAt: new Date('2026-09-22T09:00:00Z').toISOString(),
  },
  {
    id: 3,
    title: '공부하기싫다',
    content: '시험공부 보통 얼마전부터합니까? 해본적이없어서...',
    author: '몰루게떠요',
    createdAt: new Date('2026-09-24T09:00:00Z').toISOString(),
  },
]
let nextId = posts.length + 1

/**
 * 요청 헤더에서 로그인한 사용자의 닉네임을 꺼낸다.
 * HTTP 헤더에는 한글을 그대로 담을 수 없어서 클라이언트가 encodeURIComponent로 인코딩해 보낸다.
 * (학습용 간이 인증이라 토큰 검증 없이 닉네임만 신뢰한다)
 */
function getNickname(req) {
  const raw = req.get('X-User-Nickname')
  if (!raw) return null
  try {
    return decodeURIComponent(raw).trim() || null
  } catch {
    return null
  }
}

/**
 * 수정/삭제 권한 검사. 문제가 있으면 에러 응답을 보내고 null을, 통과하면 게시글을 반환한다.
 *  - 401 Unauthorized: 로그인하지 않음
 *  - 404 Not Found:    게시글 없음
 *  - 403 Forbidden:    로그인은 했지만 작성자가 아님
 */
function findOwnPost(req, res) {
  const nickname = getNickname(req)
  if (!nickname) {
    res.status(401).json({ message: '로그인이 필요합니다.' })
    return null
  }

  const post = posts.find((p) => p.id === Number(req.params.id))
  if (!post) {
    res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    return null
  }

  if (post.author !== nickname) {
    res.status(403).json({ message: '본인이 작성한 글만 수정/삭제할 수 있습니다.' })
    return null
  }

  return post
}

// GET /posts?search=keyword — 제목/내용에 검색어가 포함된 게시글만 반환 (200 OK)
app.get('/posts', (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim().toLowerCase() : ''

  const result = search
    ? posts.filter(
        (post) => post.title.toLowerCase().includes(search) || post.content.toLowerCase().includes(search),
      )
    : posts

  res.status(200).json(result)
})

// GET /posts/:id — Path Parameter로 특정 게시글 조회
app.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id))
  if (!post) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' }) // 404 Not Found
  }
  res.status(200).json(post)
})

// POST /posts — Request Body로 받은 값으로 새 게시글 생성 (로그인 필요)
app.post('/posts', (req, res) => {
  const nickname = getNickname(req)
  if (!nickname) {
    return res.status(401).json({ message: '로그인이 필요합니다.' }) // 401 Unauthorized
  }

  const { title, content } = req.body ?? {}

  if (!title || !content) {
    // 400 Bad Request: 필수 값이 비어있는 잘못된 요청
    return res.status(400).json({ message: 'title, content는 모두 필수입니다.' })
  }

  const newPost = {
    id: nextId++,
    title,
    content,
    author: nickname, // 작성자는 Body가 아니라 로그인 정보로 정한다 (남의 이름으로 글쓰기 방지)
    createdAt: new Date().toISOString(),
  }
  posts.push(newPost)
  res.status(201).json(newPost) // 201 Created
})

// PATCH /posts/:id — 전달받은 필드만 부분 수정 (작성자 본인만)
app.patch('/posts/:id', (req, res) => {
  const post = findOwnPost(req, res)
  if (!post) return

  // author는 바꿀 수 없다 (바꿀 수 있으면 글 소유권을 넘겨버릴 수 있음)
  const { title, content } = req.body ?? {}
  if (title !== undefined) post.title = title
  if (content !== undefined) post.content = content

  res.status(200).json(post)
})

// DELETE /posts/:id — 성공 시 본문 없이 204 No Content (작성자 본인만)
app.delete('/posts/:id', (req, res) => {
  const post = findOwnPost(req, res)
  if (!post) return

  posts.splice(posts.indexOf(post), 1)
  res.status(204).end()
})

const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`)
})
