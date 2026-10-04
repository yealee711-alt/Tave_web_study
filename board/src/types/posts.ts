export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  createdAt: string;
}

export type UpdatePostRequest = Partial<Omit<CreatePostRequest, 'createdAt'>>;

export interface GetPostsParams {
  page: number;
  limit: number;
  search?: string;
}