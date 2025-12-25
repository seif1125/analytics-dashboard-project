import {  Trash2, ChevronDown } from 'lucide-react';
import { useCampaigns } from '../hooks/useData';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const Campaigns = () => {
  const queryClient = useQueryClient();
  const { data: campaigns, isLoading, isError } = useCampaigns();
console.log(campaigns);
  // 1. Define the Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}campaigns/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }
      return response.json();
    },
    // 2. The REFRESH Trigger
    onSuccess: () => {
      // This tells React Query: "The 'campaigns' data is now wrong, go get the new list"
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (error: any) => {
      alert(`Error: ${error.message}`);
    }
  });

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = currentUser.role === 'admin';

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading campaigns...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Top Campaigns</h2>
        <button className="flex items-center text-sm text-slate-400 hover:text-indigo-600 transition-colors">
          View All <ChevronDown size={16} className="ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">Sales</th>
              <th className="px-6 py-4">Goal</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {campaigns?.map((camp) => (
              <tr key={camp._id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={camp.provider?.image || '/default_avatar.png'} 
                      className="w-10 h-10 rounded-lg object-cover shadow-sm"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-sm font-bold text-slate-700">{camp.provider?.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{camp.provider?.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-600">
                  ${camp.sales.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-indigo-500">
                  {camp.goal}%
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                    camp.status === 'Achieved' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
                  }`}>
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {isAdmin && (
                    <div className="flex justify-end gap-2">
                    
                      <button 
                        onClick={() => handleDelete(camp._id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-slate-400 hover:text-rose-600 border border-slate-100 rounded-lg disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};