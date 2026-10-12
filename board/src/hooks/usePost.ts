import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";

function usePost(id: string | undefined) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => {
      if (!id) {
        throw new Error("게시글 ID가 없습니다.");
      }

      return getPost(id);
    },
    enabled: Boolean(id),
  });
}

export default usePost;
