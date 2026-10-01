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

// POST /posts — Request Body로 받은 값으로 새 게시글 생성
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body ?? {}

  if (!title || !content || !author) {
    // 400 Bad Request: 필수 값이 비어있는 잘못된 요청
    return res.status(400).json({ message: 'title, content, author는 모두 필수입니다.' })
  }

  const newPost = {
    id: nextId++,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  }
  posts.push(newPost)
  res.status(201).json(newPost) // 201 Created
})

// PATCH /posts/:id — 전달받은 필드만 부분 수정
app.patch('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id))
  if (!post) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
  }

  const { title, content, author } = req.body ?? {}
  if (title !== undefined) post.title = title
  if (content !== undefined) post.content = content
  if (author !== undefined) post.author = author

  res.status(200).json(post)
})

// DELETE /posts/:id — 성공 시 본문 없이 204 No Content
app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id === Number(req.params.id))
  if (index === -1) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
  }

  posts.splice(index, 1)
  res.status(204).end()
})

const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`)
})
