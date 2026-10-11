
import cors from 'cors'
import express from 'express'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let posts = [
  {
    id: 1,
    title: 'React 게시판 만들기',
    content: 'React와 TypeScript를 이용해 게시판을 구현하고 있습니다.',
    author: '유인서',
    createdAt: new Date().toISOString(),
  },
]

const fields = ['title', 'content', 'author']

// 요청 데이터 검증
function validatePost(data, requireAll = false) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return '올바른 요청 데이터를 입력해주세요.'
  }

  const providedFields = fields.filter((field) =>
    Object.prototype.hasOwnProperty.call(data, field)
  )

  if (requireAll && providedFields.length !== fields.length) {
    return '제목, 내용, 작성자를 모두 입력해주세요.'
  }

  if (providedFields.length === 0) {
    return '수정할 항목을 하나 이상 입력해주세요.'
  }

  for (const field of providedFields) {
    if (
      typeof data[field] !== 'string' ||
      !data[field].trim()
    ) {
      return `${field} 항목에 올바른 값을 입력해주세요.`
    }
  }

  return null
}

// 게시글 전체 조회
app.get('/posts', (req, res) => {
  res.json(posts)
})

// 게시글 한 개 조회
app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    return res.status(404).json({
      message: '게시글을 찾을 수 없습니다.',
    })
  }

  res.json(post)
})

// 게시글 작성
app.post('/posts', (req, res) => {
  const error = validatePost(req.body, true)

  if (error) {
    return res.status(400).json({ message: error })
  }

  const { title, content, author } = req.body

  const newPost = {
    id: posts.length > 0
      ? Math.max(...posts.map((post) => post.id)) + 1
      : 1,
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    createdAt: new Date().toISOString(),
  }

  posts.push(newPost)

  res.status(201).json(newPost)
})

// 게시글 수정 (PATCH)
app.patch('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    return res.status(404).json({
      message: '게시글을 찾을 수 없습니다.',
    })
  }

  const error = validatePost(req.body)

  if (error) {
    return res.status(400).json({ message: error })
  }

  // 전달받은 필드만 수정
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      post[field] = req.body[field].trim()
    }
  }

  res.json(post)
})

// 게시글 삭제
app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const postIndex = posts.findIndex((post) => post.id === id)

  if (postIndex === -1) {
    return res.status(404).json({
      message: '게시글을 찾을 수 없습니다.',
    })
  }

  posts.splice(postIndex, 1)

  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Board API server running at http://localhost:${PORT}`)
})
