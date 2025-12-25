import { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import { MENU_ITEMS } from '../constants';
import { Menu, X ,LogOut} from 'lucide-react';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls import './index.css';rawer ONLY
  const  user:User= useUserData();
  const navigate=useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear any other auth states if you have them
    navigate('/login');
  };

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
    <aside className=" desktop-sidebar w-64  lg:fixed! hidden! top-0 left-0 bottom-0  z-50 bg-white border-r border-gray-200 transition-transform transform">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src="./icon.png" alt="icon" width={50} height={50} />
          </div>
          <span className="ml-4 font-bold text-xl text-indigo-900 tracking-tight uppercase">NEXUS</span>
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
          <div className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
            <div className='flex '> 
            <img src={user.image} className="w-9 h-9 rounded-full border border-white" alt="User" />
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold text-gray-700 truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{user?.role}</p>
            </div>
            </div>
           
            <button
            onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
          </div>
        </div>
      </div>
    </aside>

    {/* 3. Mobile Overlay - Closes menu when clicking background */}
    {isOpen && (
      <div 
        onClick={() => setIsOpen(false)} 
        className="fixed inset-0 bg-white/80 backdrop-blur-lg z-40 lg:hidden" 
      > <aside className="h-full">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-gray-800shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            X
          </div>
          <span className="ml-12 font-bold text-xl text-indigo-900 tracking-tight uppercase">NEXUS</span>
        </div>

        {/* Navigation Items - Labels are always rendered */}
        <nav className="flex-1 h-full px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx} 
                className={`w-full flex items-center p-3 rounded-xl transition-all group 
                  ${item.active ? ' text-indigo-900 font-semibold border-indigo-900 rounded-lg' : 'text-indigo-900  hover:border-indigo-900 hover:rounded-lg'}`}
              >
                <Icon size={20} className={item.active ? 'text-indigo-600' : 'group-hover:text-indigo-500'} />
                <span className="ml-3 text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-800shrink-0 ">
          <div className="flex justify-between items-center p-2 rounded-xl bg-none text-indigo-900">
            <div className='flex'>
              <img src={user.image} className="w-9 h-9 rounded-full border border-white" alt="User" />
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold truncate">{user.name}</p>
              <p className="text-[10px] uppercase tracking-wider">{user.role}</p>
            </div>
            </div>
            
            <button
            onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
          </div>
        </div>
      </div>
    </aside></div>
    )}
  </>
);
};
export default Sidebar;