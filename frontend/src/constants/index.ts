  import { Home, Grid, Layers, FileText, LayoutGrid, Moon, LogOut, UserCog, Menu, X } from 'lucide-react';
import type { MenuItem } from '../types';
  
  
  
 export const MENU_ITEMS: MenuItem[] = [
  { icon: Home, label: 'Home', active: true },
  { icon: Grid, label: 'Applications' },
  { icon: Layers, label: 'Layers' },
  { icon: FileText, label: 'Pages' },
  { icon: LayoutGrid, label: 'Utilities' },
];

  export const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`;
