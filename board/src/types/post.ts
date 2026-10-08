export interface Post {
  id: string; // json-server가 만들어주는 고유한 문자열
  title: string;
  content: string;
  author: string;
}

// 작성·수정할 때 보내는 데이터: id는 서버가 만들어주니까 빼요
export type CreatePostInput = Omit<Post, 'id'>;
