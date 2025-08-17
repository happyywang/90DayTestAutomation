'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import { useAnalytics } from '@/hooks/useAnalytics';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState(false);
  const pathname = usePathname();
  const { trackPageVisit, analytics } = useAnalytics();

  // Track page visits
  useEffect(() => {
    if (pathname) {
      trackPageVisit(pathname);
    }
  }, [pathname, trackPageVisit]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleAnalyticsToggle = () => {
    setIsAnalyticsPanelOpen(!isAnalyticsPanelOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={isSidebarOpen}
        onAnalyticsToggle={handleAnalyticsToggle}
        totalVisits={analytics.totalVisits}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        
        <main className="flex-1 md:ml-80 transition-all duration-300">
          <div className="p-6 w-full">
            {children}
          </div>
        </main>
      </div>

      <AnalyticsPanel 
        isOpen={isAnalyticsPanelOpen}
        onClose={() => setIsAnalyticsPanelOpen(false)}
      />
    </div>
  );
}