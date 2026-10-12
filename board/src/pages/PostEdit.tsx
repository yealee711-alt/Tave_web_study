import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import type { Post } from "../types/post";
import PostForm from "../components/PostForm";
import usePost from "../hooks/usePost";
import usePostForm from "../hooks/usePostForm";
import StatePanel from "../components/StatePanel";

function PostEdit() {
  const { id } = useParams();
  const { data: post, isPending, error } = usePost(id);

  if (!id) return <StatePanel message="게시글 ID가 없습니다." error />;
  if (isPending) return <StatePanel message="게시글을 불러오는 중..." loading />;
  if (error && !post) return <StatePanel message={error.message} error />;
  if (!post) return <StatePanel message="게시글이 없습니다." />;

  return <PostEditForm key={id} post={post} />;
}

function PostEditForm({ post }: { post: Post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { values, error, setError, handleChange, validate } = usePostForm({
    title: post.title,
    content: post.content,
    author: post.author,
  });

  const updateMutation = useMutation({
    mutationFn: (formValues: Omit<Post, "id">) =>
      updatePost(post.id, formValues),

    onSuccess: async (updatedPost) => {
      queryClient.setQueryData(["post", post.id], updatedPost);

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      navigate(`/posts/${post.id}`);
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (updateMutation.isPending) return;
    if (!validate()) return;

    updateMutation.mutate(values);
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <div className="paper">
          <div className="mb-8 border-b border-line pb-7"><p className="eyebrow mb-3">STUDY NOTE</p><h1 className="text-2xl font-semibold tracking-tight">게시글 수정</h1><p className="mt-3 text-sm leading-6 text-muted">기록을 다시 읽고, 더 나은 이야기로 다듬어보세요.</p></div>

          <PostForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            isSubmitting={updateMutation.isPending}
            submitLabel="수정하기"
            submittingLabel="수정 중..."
            cancelTo={`/posts/${post.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
