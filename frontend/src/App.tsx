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
    <Sidebar />
    <main className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col space-y-8 max-w-7xl mx-auto w-full">
         <Suspense fallback={<div className="p-4 bg-white rounded shadow h-full">Loading ...</div>}>
          <DownloadsChart />
          <LazyRetentionChart />
        </Suspense>
        </div>
    </main>
</div>
  );
}
export default App;