/** 목록 로딩 중에 보여주는 스켈레톤 카드 */
export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="post-list" aria-busy="true" aria-label="게시글을 불러오는 중">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="post-card skeleton-card">
          <span className="skeleton skeleton-title" />
          <span className="skeleton skeleton-line" />
          <span className="skeleton skeleton-meta" />
        </li>
      ))}
    </ul>
  )
}

/** 상세/수정 화면 로딩 중에 보여주는 스켈레톤 */
export function PostDetailSkeleton() {
  return (
    <div className="post-detail" aria-busy="true" aria-label="게시글을 불러오는 중">
      <span className="skeleton skeleton-heading" />
      <span className="skeleton skeleton-meta" />
      <span className="skeleton skeleton-line" />
      <span className="skeleton skeleton-line" />
      <span className="skeleton skeleton-line short" />
    </div>
  )
}
