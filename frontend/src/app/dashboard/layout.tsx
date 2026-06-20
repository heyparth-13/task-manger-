'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { redirect } from 'next/navigation';
import { Layers } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <div className="relative">
          <Layers className="h-12 w-12 text-indigo-200 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  if (!user) {
    // AuthContext will handle the redirection automatically
    return null;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50/30 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full animate-slide-in-right">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* The Sidebar content goes here for mobile - for now we reuse the component but it needs adjustments in a real app to handle the close state */}
            <div className="flex-1 h-0 overflow-y-auto w-full">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden md:pl-72 relative z-0">
        <Header setMobileMenuOpen={setMobileMenuOpen} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 animate-fade-in-up">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
