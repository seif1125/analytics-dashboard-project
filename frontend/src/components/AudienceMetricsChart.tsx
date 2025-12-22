import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { useAudienceMetricsData} from "../hooks/useData";

export const AudienceMetricsChart = () => {
  const { data, isLoading } = useAudienceMetricsData();
  const [zoomLevel, setZoomLevel] = useState(12); // Default to 12 months
  const [visibleData, setVisibleData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      // Always show the last 'zoomLevel' items
      setVisibleData(data.slice(12 - zoomLevel));
    }
  }, [data, zoomLevel]);

  const handleWheel = (e: React.WheelEvent) => {
    // Check if user is scrolling over the chart area
    if (e.deltaY < 0) {
      // Scroll Up -> Zoom In (Min 3 months)
      setZoomLevel((prev) => Math.max(3, prev - 1));
    } else {
      // Scroll Down -> Zoom Out (Max 12 months)
      setZoomLevel((prev) => Math.min(12, prev + 1));
    }
  };

  if (isLoading || !data) return <div className="h-80 animate-pulse bg-slate-50 rounded-xl" />;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-slate-900 font-bold text-lg">Platform Analytics</h3>
          <p className="text-slate-400 text-xs">Scroll over chart to zoom ({zoomLevel} months)</p>
        </div>
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-medium text-slate-500">Visitors</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="text-xs font-medium text-slate-500">Sessions</span>
            </div>
        </div>
      </div>

      <div 
        className="h-80 w-full cursor-ns-resize" 
        onWheel={handleWheel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={visibleData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            
            {/* The Bars */}
            <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={zoomLevel > 6 ? 30 : 60} />
            
            {/* The Curved Line */}
            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="#fb7185" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#fb7185', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};