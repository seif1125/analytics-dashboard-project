import { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import { MENU_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls import './index.css';rawer ONLY
  const { data, isLoading, isError } = useUserData();

  if (isLoading) return <div className="w-64 bg-white border-r h-screen p-4">Loading Profile...</div>;
  if (isError) return <div className="w-64 bg-white border-r h-screen p-4 text-red-500">Error</div>;

return (
  <>
   {/* 1. Mobile Toggle Button - Hidden on Desktop (lg) */}
    <div className="lg:hidden fixed top-4 left-4 z-60">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-indigo-600 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
   
    </div>

    {/* 2. The Sidebar */}
    <aside className=" desktop-sidebar w-64  md:fixed! hidden! top-0 left-0 bottom-0  z-50 bg-white border-r border-gray-200 transition-transform transform">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl italic">V</span>
          </div>
          <span className="ml-4 font-bold text-xl text-indigo-900 tracking-tight uppercase">Vyzor</span>
        </div>

        {/* Navigation Items - Labels are always rendered */}
        <nav className=" px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx} 
                className={`w-full flex items-center p-3 rounded-xl transition-all group 
                  ${item.active ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
              >
                <Icon size={20} className={item.active ? 'text-indigo-600' : 'group-hover:text-indigo-500'} />
                <span className="ml-3 text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-50 ">
          <div className="flex items-center p-2 rounded-xl bg-gray-50">
            <img src={data?.avatar} className="w-9 h-9 rounded-full border border-white" alt="User" />
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold text-gray-700 truncate">{data?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{data?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    {/* 3. Mobile Overlay - Closes menu when clicking background */}
    {isOpen && (
      <div 
        onClick={() => setIsOpen(false)} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
      > <aside className="">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            X
          </div>
          <span className="ml-12 font-bold text-xl text-indigo-900 tracking-tight uppercase">Vyzor</span>
        </div>

        {/* Navigation Items - Labels are always rendered */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx} 
                className={`w-full flex items-center p-3 rounded-xl transition-all group 
                  ${item.active ? ' text-indigo-900 font-semibold' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
              >
                <Icon size={20} className={item.active ? 'text-indigo-600' : 'group-hover:text-indigo-500'} />
                <span className="ml-3 text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-50 shrink-0">
          <div className="flex items-center p-2 rounded-xl bg-gray-50">
            <img src={data?.avatar} className="w-9 h-9 rounded-full border border-white" alt="User" />
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold text-gray-700 truncate">{data?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{data?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside></div>
    )}
  </>
);
};
export default Sidebar;