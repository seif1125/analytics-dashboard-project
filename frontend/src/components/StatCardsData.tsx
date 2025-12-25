import  { useState, useEffect } from 'react';
import { 
  Users, 
  BarChart3, 
  Percent, 
  Timer, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  HelpCircle 
} from 'lucide-react';
import { getStats } from '../utils';
import type { StatCardData, StatIconKey } from '../types';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<StatIconKey, LucideIcon> = {
  users: Users,
  sessions: BarChart3,
  bounce: Percent,
  duration: Timer,
};

export const StatCardsData = () => {
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 animate-pulse h-[550px] text-slate-400">Loading Dashboard...</div>;

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Analytics</h2>
        <div className="flex items-center text-sm font-medium">
          <span className="text-purple-600">Dashboards</span>
          <ChevronRight size={14} className="mx-1 text-slate-400" /> 
          <span className="text-slate-800">Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const IconComponent = iconMap[stat.icon] || HelpCircle;

          return (
            <div key={stat.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start gap-5">
              
              {/* Added flex-shrink-0 to prevent icon box from squishing */}
              <div className={`flex items-center flex-col justify-center flex-shrink `}>
            <div className={`${stat.color} p-4 rounded-lg text-white  shadow-lg`}>
                <IconComponent size={24} strokeWidth={2.5} />
               </div>
                
                <div className="flex items-center mt-2 gap-1.5">
                  {stat.isPositive ? (
                    <TrendingUp size={16} className="text-emerald-500" />
                  ) : (
                    <TrendingDown size={16} className="text-rose-500" />
                  )}
                  <span className={`text-sm font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">This Year</span>
                </div>
            </div>

              <div className="flex-1">
                <p className="text-slate-500 font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                
                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatCardsData;