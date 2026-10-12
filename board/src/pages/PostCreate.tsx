import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import PostForm from "../components/PostForm";
import usePostForm from "../hooks/usePostForm";

function PostCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { values, error, setError, handleChange, validate } = usePostForm();
  const createMutation = useMutation({
    mutationFn: createPost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      navigate("/posts");
    },

    onError: (error) => {
      setError(error.message);
    },
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createMutation.isPending) return;
    if (!validate()) return;

    createMutation.mutate(values);
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <div className="paper">
          <div className="mb-8 border-b border-line pb-7"><p className="eyebrow mb-3">STUDY NOTE</p><h1 className="text-2xl font-semibold tracking-tight">게시글 작성</h1><p className="mt-3 text-sm leading-6 text-muted">새로운 배움과 생각을 한 장의 기록으로 남겨보세요.</p></div>

          <PostForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            isSubmitting={createMutation.isPending}
            submitLabel="작성하기"
            submittingLabel="작성 중..."
            cancelTo="/posts"
          />
        </div>
      </div>
    </div>
  );
}

export default PostCreate;
