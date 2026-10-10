import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUserStore } from '../store/userStore';
import PostForm from '../components/PostForm';
import type { PostInput } from '../types/post';

export default function PostCreate() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user); // 로그인했다면 작성자 기본값으로
  const { mutate, isPending, isError, error } = useCreatePost();

  const handleSubmit = (input: PostInput) => {
    mutate(input, {
      onSuccess: (newPost) => navigate(`/posts/${newPost.id}`), // 서버가 만든 id로 상세 페이지 이동
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-dusty-rose-dark">글쓰기</h2>
      <PostForm
        initialValues={{ title: '', content: '', author: user?.name ?? '' }}
        submitLabel="작성"
        isSubmitting={isPending}
        errorMessage={isError ? `작성에 실패했습니다. (${error.message})` : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
