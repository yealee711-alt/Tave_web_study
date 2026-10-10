import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// ⚠️ 컴포넌트 바깥에서 한 번만 만들기 (안에서 만들면 렌더링마다 캐시가 날아가요)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패하면 1번만 다시 시도 (기본값 3번은 에러 화면이 늦게 떠요)
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
