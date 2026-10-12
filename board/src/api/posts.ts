import type { Post } from "../types/post";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return response.json();
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return response.json();
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("게시글 작성에 실패했습니다.");
  }

  return response.json();
};

export const updatePost = async (
  id: string,
  post: Partial<Omit<Post, "id">>,
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("게시글 수정에 실패했습니다.");
  }

  return response.json();
};

export const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }
};
