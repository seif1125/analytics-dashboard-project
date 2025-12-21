import './App.css';
import React, { Suspense } from 'react'; // Import React and Suspense
import DownloadsChart from './components/DownloadsChart';
import './index.css';
import Sidebar from './components/SideBarMenu';
import { BrowserInsights } from './components/BrowserInsights';
import { UsersTimeHeatmap } from './components/UsersTimeHeatmap';

// 1. Lazy load the RetentionChart component
const LazyRetentionChart = React.lazy(() => import('./components/RetentionChart'));
const StatCardsData = React.lazy(() => import('./components/StatCardsData').then(module => ({ default: module.StatCardsData })));

function App() {
 return (
<div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
        <div className="flex md:flex-row flex-col flex-grow flex-1 space-y-8 max-w-7xl mx-auto w-full">
         <Suspense fallback={<div className="p-4 bg-white rounded shadow h-full">Loading ...</div>}>
        <div className="flex flex-col flex-1 space-y-8">
        <StatCardsData/>
        <DownloadsChart />
        <LazyRetentionChart />
        </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full flex flex-col gap-8">
            <BrowserInsights/>
            <UsersTimeHeatmap/>
          </div>
          
          
        </Suspense>
        </div>
    </main>
</div>
  );
}
export default App;