import { useHeatmapData } from "../hooks/useData";
import type { HeatmapRow } from "../types";

export const UsersTimeHeatmap = () => {
  const { data, isLoading, error } = useHeatmapData();

  const getIntensityClass = (value: number) => {
    switch (value) {
      case 2: return 'bg-emerald-400'; 
      case 1: return 'bg-emerald-200'; 
      default: return 'bg-slate-100';  
    }
  };
  console.log("Heatmap Data:", data);
  if (isLoading) return <div className="h-64 bg-slate-50 animate-pulse rounded-xl" />;
  if (error || !data) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Users By Time Of Week</h3>
      
      <div className="space-y-4">
        {data.map((row: HeatmapRow, rowIndex: number) => (
          <div key={rowIndex} className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 w-12 uppercase">
              {row.label}
            </span>

            {/* The container MUST have flex and gap for children to show in a row */}
            <div className="flex flex-1 gap-2">
              {row.data?.map((intensity, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  // Ensure h-10 and flex-1 are present. 
                  // If the box is still invisible, add a temporary 'border' class to debug.
                  className={`h-10 flex-1 rounded-sm ${getIntensityClass(intensity)} transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};