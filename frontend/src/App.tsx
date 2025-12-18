import './App.css';
import React, { Suspense } from 'react'; // Import React and Suspense
import DownloadsChart from './components/DownloadsChart';
import './index.css';
import Sidebar from './components/SideBarMenu';

// 1. Lazy load the RetentionChart component
const LazyRetentionChart = React.lazy(() => import('./components/RetentionChart'));

function App() {
 return (
    <div className="flex min-h-screen bg-gray-50">
     
      {/* 1. Sidebar: Fixed on mobile, Static on Desktop */}
      <Sidebar />

      {/* 2. Main Content: Takes remaining width */}
      <main className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        {/* Top Spacer for Mobile Toggle if needed */}
        <div className="lg:hidden h-12" /> 

        <div className="flex flex-col space-y-8 max-w-7xl mx-auto w-full">
          <header>
            <h1 className="text-sm lg:text-xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Real-time performance metrics</p>
          </header>
         <Suspense fallback={<div className="p-4 bg-white rounded shadow">Loading retention chart...</div>}>
          {/* Charts & Tables stacked vertically */}
          <DownloadsChart />
          <LazyRetentionChart />
        </Suspense>
        </div>
      </main>
    </div>
  );
}
export default App;