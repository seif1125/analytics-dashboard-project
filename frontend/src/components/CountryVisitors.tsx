
import { useCountriesData } from "../hooks/useData";

export const CountryVisitors = () => {
  const { data, isLoading, error, isFetching } = useCountriesData();

  if (isLoading) return <div className="h-96 animate-pulse bg-slate-50 rounded-xl w-full" />;
  if (error || !data) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header with Live Indicator */}
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-slate-900 font-bold text-lg">Visitors By Countries</h3>
        <div className="flex items-center gap-2">
            {/* Pulsing Live Dot */}
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-2 px-6 py-3 bg-slate-50/50 border-y border-slate-100">
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Country</span>
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-right">Visitors</span>
      </div>

      {/* Table Body with Scrollbar Styling */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {data?.data?.map((item) => (
          <div key={item.id} className="grid grid-cols-2 px-6 py-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/40 transition-colors">
            {/* Country Info */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-4 overflow-hidden rounded-sm shadow-sm bg-slate-100 shrink-0">
                <img 
                  src={`/src/assets/flags/${item.isoCode.toLowerCase()}.svg`} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/src/assets/flags/placeholder.png'; }}
                />
              </div>
              <span className="text-slate-700 font-bold text-sm tracking-tight">{item.name}</span>
            </div>

            {/* Stats Info */}
            <div className="flex items-center justify-end gap-3">
              <span className={`text-[11px] font-bold flex items-center gap-0.5 ${item.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                ({item.isUp ? '↑' : '↓'} {item.growth}%)
              </span>
              <span className={`text-slate-900 font-black text-sm tabular-nums transition-all duration-500 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                {item.visitors.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};