import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 주소를 보고 화면을 바꾸는 기능 켜기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
