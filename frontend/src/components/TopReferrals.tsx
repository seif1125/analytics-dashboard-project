// components/TopReferrals.tsx
import { useReferralsData } from "../hooks/useData";
// Import the type

export const TopReferrals = () => {
  // data is now correctly typed as ReferralStats | undefined
  const { data, isLoading, error } = useReferralsData();

  if (isLoading) return <div className="animate-pulse h-64 bg-slate-50 rounded-xl " />;
  
  // Safety check: if there's an error or data is missing/malformed
  if (error || !data || !data.pages) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-80">
      <h3 className="text-slate-900 font-bold text-lg mb-6">Top Referral Pages</h3>
      
      <div className="mb-4">
        <span className="text-4xl font-bold text-slate-900">
          {data.totalViews.toLocaleString()}
        </span>
        <div className="flex justify-center items-center gap-2 mt-1">
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
            {data.growthRate} ▲
          </span>
          <span className="text-slate-400 text-sm font-medium">{data.timeLabel}</span>
        </div> 
      </div>

      {/* Progress Bar Segmented */}
      <div className="flex h-2 w-full rounded-full overflow-hidden mb-8 gap-1 bg-slate-100">
        {data.pages.map((page) => (
          <div 
            key={page.id} 
            style={{ 
              width: `${(page.value / data.totalViews) * 100}%`, 
              backgroundColor: page.color 
            }}
          />
        ))}
      </div>

      {/* Page List */}
      <div className="space-y-4">
        {data.pages.map((page) => (
          <div key={page.id} className="flex justify-between items-start group">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: page.color }} />
              <span className="text-slate-500 text-start  font-medium text-sm leading-tight max-w-[160px]">
                {page.label}
              </span>
            </div>
            <span className="text-slate-400 font-bold text-sm tabular-nums">
              {page.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};