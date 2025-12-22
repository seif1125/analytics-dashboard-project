import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDeviceData } from "../hooks/useData";

export const DevicesChart = () => {
  const { data, isLoading, error } = useDeviceData();

  if (isLoading) return <div className="h-96 animate-pulse bg-slate-50 rounded-xl w-full" />;
  if (error || !data) return null;

  return (
    <div className="bg-white  rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-2 flex justify-between items-center">
        <h3 className="text-slate-900 font-bold text-lg">Sessions By Device</h3>
        <button className="text-slate-400 text-xs font-bold flex items-center gap-1 hover:text-slate-600 transition-colors">
          View All <span className="text-[10px]">▼</span>
        </button>
      </div>

      {/* Recharts Donut Visualization */}
      <div className="relative flex-1 flex justify-center items-center min-h-[280px]">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.devices}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.devices.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text (Overlay) */}
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-slate-500 text-sm font-medium">Total Audience</span>
          <span className="text-slate-900 text-4xl font-black tracking-tight">
            {data.totalAudience.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-3 border-t border-slate-100 bg-slate-50/30">
        {data.devices.map((device, idx) => (
          <div 
            key={device.label} 
            className={`p-6 text-center ${idx !== data.devices.length - 1 ? 'border-r border-slate-100' : ''}`}
          >
            <span className="block text-slate-900 text-2xl font-bold tabular-nums">
              {device.value.toLocaleString()}
            </span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 block">
              {device.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};