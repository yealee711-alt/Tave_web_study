import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getPosts } from '../../api/posts'
import type { Post } from '../../types/post'

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('search') ?? ''

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )

  function handleSearch(value: string) {
    if (value.trim()) {
      setSearchParams({ search: value })
    } else {
      setSearchParams({})
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        게시글을 불러오는 중입니다...
      </div>
    )
  }

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
          <p className="mt-2 text-sm text-gray-500">
            자유롭게 게시글을 작성하고 확인해보세요.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={keyword}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="제목을 검색하세요"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {filteredPosts.length === 0 ? (
          <div className="px-6 py-14 text-center text-gray-500">
            게시글이 없습니다.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="block border-b border-gray-100 px-6 py-5 last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {post.author}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}

export default PostsPage