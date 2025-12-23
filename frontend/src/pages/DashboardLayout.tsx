
import React, { Suspense } from 'react'; // Import React and Suspense
import DownloadsChart from '../components/DownloadsChart';

import Sidebar from '../components/SideBarMenu';
import { BrowserInsights } from '../components/BrowserInsights';
import { UsersTimeHeatmap } from '../components/UsersTimeHeatmap';
import  { TopReferrals } from '../components/TopReferrals';
import { DevicesChart } from '../components/DevicesChart';
import { CountryVisitors } from '../components/CountryVisitors';
import { AudienceMetricsChart } from '../components/AudienceMetricsChart';
import { Campaigns } from '../components/Campaigns';

// 1. Lazy load the RetentionChart component
const LazyRetentionChart = React.lazy(() => import('../components/RetentionChart'));
const StatCardsData = React.lazy(() => import('../components/StatCardsData').then(module => ({ default: module.StatCardsData })));

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