// components/BrowserInsights.tsx
import { useInsightsData } from '../hooks/useData';

export const BrowserInsights:React.FC = () => {
      const { data, isLoading, isError } = useInsightsData();
    
      if (isLoading) return <div className="w-64 bg-white border-r h-screen p-4">Loading Profile...</div>;
      if (isError) return <div className="w-64 bg-white border-r h-screen p-4 text-red-500">Error</div>;
  return (
    <div className="">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Browser Insights</h3>
      <div className="space-y-5">
        {data?.map((browser) => (
          <div key={browser.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Placeholder for Browser Logo */}
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 font-bold text-slate-400 text-xs">
                {browser.name[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{browser.name}</p>
                <p className="text-xs text-slate-400">{browser.company}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{browser.value.toLocaleString()}</p>
              <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full ${browser.color}`} 
                  style={{ width: `${(browser.value / 1500) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};