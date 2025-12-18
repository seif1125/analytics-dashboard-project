import './index.css';
import './App.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';


// 1. Initialize the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent refetching data too frequently
      staleTime: 1000 * 60 * 5, // 5 minutes cache retention
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Wrap the application with the Provider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);