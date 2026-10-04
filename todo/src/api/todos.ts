import type { CreateTodoInput, Todo } from '../types/todo';

// .env 파일에 적어둔 서버 주소
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 📖 Read: 목록 조회  →  GET /todos
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) throw new Error(`목록 조회 실패 (${response.status})`);
  return response.json();
}

// 📖 Read: 하나 조회  →  GET /todos/:id
// 없는 할 일이면 null을 돌려줘요 (404 Not Found)
export async function getTodo(id: string): Promise<Todo | null> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`조회 실패 (${response.status})`);
  return response.json();
}

// ✏️ Create: 추가  →  POST /todos
export async function createTodo(text: string): Promise<Todo> {
  // id는 보내지 않아요 → 서버가 만들어서 응답으로 돌려줘요
  const newTodo: CreateTodoInput = {
    text,
    completed: false,
  };

  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // "JSON으로 보낼게요"
    body: JSON.stringify(newTodo), // 객체 → JSON 글자로 포장
  });
  if (!response.ok) throw new Error(`추가 실패 (${response.status})`);
  return response.json(); // 서버가 만든 id가 들어 있는 완성된 Todo
}

// 🔧 Update: 일부만 수정  →  PATCH /todos/:id
// Partial = 전부 선택사항 → { completed: true } 처럼 바꿀 것만 보내면 돼요
export async function updateTodo(id: string, changes: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error(`수정 실패 (${response.status})`);
  return response.json();
}

// 🗑️ Delete: 삭제  →  DELETE /todos/:id
export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`삭제 실패 (${response.status})`);
  // 삭제는 돌려받을 내용이 필요 없어서 response.json()을 하지 않아요
}
