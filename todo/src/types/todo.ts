// 할 일 하나의 모양(설계도)
export interface Todo {
  id: string; // 서버(json-server)가 만들어주는 고유한 문자열
  text: string;
  completed: boolean;
}

// 새로 만들 때 보내는 데이터: id는 서버가 만들어주니까 빼요
export type CreateTodoInput = Omit<Todo, 'id'>;
