
import React, { Suspense } from 'react'; // Import React and Suspense
import DownloadsChart from '../components/DownloadsChart';

import Sidebar from '../components/SideBarMenu';

// 1. Lazy load the RetentionChart component
const LazyRetentionChart = React.lazy(() => import('../components/RetentionChart'));
const StatCardsData = React.lazy(() => import('../components/StatCardsData').then(module => ({ default: module.StatCardsData })));
const DevicesChart=React.lazy(() => import('../components/DevicesChart').then(module => ({ default: module.DevicesChart })));
const CountryVisitors=React.lazy(() => import('../components/CountryVisitors').then(module => ({ default: module.CountryVisitors })));
const BrowserInsights=React.lazy(() => import('../components/BrowserInsights').then(module => ({ default: module.BrowserInsights })));
const UsersTimeHeatmap=React.lazy(() => import('../components/UsersTimeHeatmap').then(module => ({ default: module.UsersTimeHeatmap })));
const TopReferrals=React.lazy(() => import('../components/TopReferrals').then(module => ({ default: module.TopReferrals })));
const AudienceMetricsChart=React.lazy(() => import('../components/AudienceMetricsChart').then(module => ({ default: module.AudienceMetricsChart }))); 
const Campaigns=React.lazy(() => import('../components/Campaigns').then(module => ({ default: module.Campaigns }))); 
function DashboardLayout() {
 return (
<div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <Sidebar />
    <Suspense fallback={<div className="p-4  bg-white rounded shadow h-full">Loading ...</div>}>
    <main className="flex-1 flex xl:flex-row flex-col pb-6 space-y-8 overflow-x-hidden w-full  ">
 
        <div className="flex xl:flex-row flex-col flex-grow flex-1 space-y-8 max-w-7xl mx-auto w-full">
         
        <div className="flex flex-col flex-1 space-y-8">
        <StatCardsData/>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 p-6'>
          <DevicesChart/>
          <CountryVisitors/>
        </div>
        <AudienceMetricsChart />

        <LazyRetentionChart />
        <Campaigns />
        <DownloadsChart />
        </div>
          
         
          
          </div>
          <div className="bg-white p-3 mx-6 sm:mx-0 sm:pt-6 sm:px-6 rounded-xl border border-slate-100 shadow-sm  flex flex-col gap-8">
            <BrowserInsights/>
            <UsersTimeHeatmap/>
            <TopReferrals/>
      </div>
     
    </main>
     
        </Suspense>
      
</div>
  );
}
export default DashboardLayout;