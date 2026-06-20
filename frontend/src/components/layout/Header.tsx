'use client';

import { useAuth } from '@/context/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';

export default function Header({ setMobileMenuOpen }: { setMobileMenuOpen?: (open: boolean) => void }) {
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-30 flex-shrink-0 flex h-20 bg-white/70 backdrop-blur-lg border-b border-gray-100/50">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setMobileMenuOpen?.(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      
      <div className="flex-1 px-4 sm:px-6 md:px-8 flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex-1 flex max-w-2xl">
          <form className="w-full flex" action="#" method="GET" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-field" className="sr-only">
              Search tasks
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 group-focus-within:text-indigo-500 transition-colors" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-11 pl-10 pr-3 rounded-xl border-transparent bg-gray-100/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                placeholder="Search globally (Press '/' to focus)"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>

        {/* Right side items */}
        <div className="ml-4 flex items-center md:ml-6 space-x-3 sm:space-x-4">
          <button className="bg-white/50 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* Profile Profile */}
          <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-gray-50 transition-colors">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900 leading-none">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 mt-1 leading-none">
                Admin
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold uppercase shadow-sm ring-2 ring-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
