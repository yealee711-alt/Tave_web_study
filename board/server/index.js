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

// 게시글 전체 조회
app.get('/posts', (req, res) => {
  res.json(posts)
})

// 게시글 한 개 조회
app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
  }

  res.json(post)
})

// 게시글 작성
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body

  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  }

  posts.push(newPost)

  res.status(201).json(newPost)
})

// 게시글 수정
app.patch('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
  }

  const { title, content, author } = req.body

  post.title = title
  post.content = content
  post.author = author

  res.json(post)
})

// 게시글 삭제
app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id)
  const postIndex = posts.findIndex((post) => post.id === id)

  if (postIndex === -1) {
    return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
  }

  posts.splice(postIndex, 1)

  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Board API server running at http://localhost:${PORT}`)
})