import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages & Components
import { Login } from './pages/Login';
import  DashboardLayout  from './pages/DashboardLayout';
import { ProtectedRoutes } from './components/ProtectedRoutes';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes - Wrapped in Layout */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoutes>
                <DashboardLayout />
              </ProtectedRoutes>
            }
          >
         
          </Route>

          {/* Redirect root to login or dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;