import { useHeatmapData } from "../hooks/useData";
import type { HeatmapRow } from "../types/index";
import  {getIntensityClass } from "../utils/index";
import { weekdays } from "../constants/index";

export const UsersTimeHeatmap = () => {
  const { data, isLoading, error } = useHeatmapData();
  if (isLoading) return <div className="h-64 bg-slate-50 animate-pulse rounded-xl" />;
  if (error || !data) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Users By Time Of Week</h3>
      
      <div className="space-y-3">
        {data.map((row: HeatmapRow, rowIndex: number) => (
          <div key={rowIndex} className="flex items-center gap-4">
            {/* Time Label */}
            <span className="text-xs font-bold text-slate-400 w-10 uppercase">
              {row.label}
            </span>

            {/* Grid Row */}
            <div className="flex flex-1 gap-2">
              {row.data?.map((intensity, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  // 'aspect-square' makes them square. 
                  // 'w-full' inside a flex container with gap ensures they stay uniform.
                  className={`aspect-square flex-1 rounded-sm ${getIntensityClass(intensity)} transition-all duration-300 hover:ring-2 hover:ring-emerald-100 cursor-pointer`}
                  title={intensity+' user(s)'}                  
                />
              ))}
            </div>
          </div>
        ))}

        {/* Weekdays Footer Row */}
        <div className="flex items-center gap-4 pt-2">
          {/* Spacer to align with the time labels */}
          <div className="w-10" /> 
          
          <div className="flex flex-1 gap-2">
            {weekdays.map((day, index) => (
              <span 
                key={index} 
                className="flex-1 text-center text-[10px] font-bold text-slate-400 uppercase"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};