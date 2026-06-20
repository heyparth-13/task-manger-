'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, CheckSquare, Settings, LogOut, Layers } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white/60 backdrop-blur-xl border-r border-gray-100/80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        
        {/* Logo Area */}
        <div className="flex items-center h-20 flex-shrink-0 px-6">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <Layers size={22} />
          </div>
          <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            TaskFlow
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-6 px-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
          <nav className="flex-1 space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon
                    className={`
                      flex-shrink-0 mr-3 h-5 w-5 transition-colors duration-200
                      ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100/80">
          <button
            onClick={logout}
            className="flex w-full items-center px-3 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="flex-shrink-0 h-5 w-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
