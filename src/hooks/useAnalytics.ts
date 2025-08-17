'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PageVisit {
  path: string;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  referrer: string;
}

export interface Analytics {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: { [path: string]: number };
  dailyVisits: { [date: string]: number };
  sessionDuration: number[];
  lastVisit: string;
  visits: PageVisit[];
}

const ANALYTICS_KEY = 'test-automation-analytics';
const SESSION_KEY = 'analytics-session-id';

// Generate a unique session ID
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: {},
    dailyVisits: {},
    sessionDuration: [],
    lastVisit: '',
    visits: []
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load analytics from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAnalytics = localStorage.getItem(ANALYTICS_KEY);
      if (savedAnalytics) {
        try {
          const parsed = JSON.parse(savedAnalytics);
          setAnalytics(parsed);
        } catch (error) {
          console.error('Failed to parse saved analytics:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save analytics to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
    }
  }, [analytics, isLoaded]);

  // Track page visit
  const trackPageVisit = useCallback((path: string) => {
    if (!isLoaded) return;

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const sessionId = getSessionId();

    const newVisit: PageVisit = {
      path,
      timestamp: now.toISOString(),
      sessionId,
      userAgent: navigator.userAgent || '',
      referrer: document.referrer || ''
    };

    setAnalytics(prev => {
      const existingSessions = new Set(prev.visits.map(v => v.sessionId));
      const isNewSession = !existingSessions.has(sessionId);

      return {
        ...prev,
        totalVisits: prev.totalVisits + 1,
        uniqueVisitors: isNewSession ? prev.uniqueVisitors + 1 : prev.uniqueVisitors,
        pageViews: {
          ...prev.pageViews,
          [path]: (prev.pageViews[path] || 0) + 1
        },
        dailyVisits: {
          ...prev.dailyVisits,
          [dateKey]: (prev.dailyVisits[dateKey] || 0) + 1
        },
        lastVisit: now.toISOString(),
        visits: [...prev.visits, newVisit].slice(-1000) // Keep last 1000 visits
      };
    });
  }, [isLoaded]);

  // Get popular pages
  const getPopularPages = useCallback((limit: number = 10) => {
    const sortedPages = Object.entries(analytics.pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
    
    return sortedPages.map(([path, views]) => ({ path, views }));
  }, [analytics.pageViews]);

  // Get recent visits
  const getRecentVisits = useCallback((limit: number = 20) => {
    return analytics.visits
      .slice(-limit)
      .reverse()
      .map(visit => ({
        ...visit,
        timeAgo: getTimeAgo(visit.timestamp)
      }));
  }, [analytics.visits]);

  // Get daily stats for last 7 days
  const getDailyStats = useCallback(() => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const visits = analytics.dailyVisits[dateKey] || 0;
      
      last7Days.push({
        date: dateKey,
        visits,
        label: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : date.toLocaleDateString('en', { weekday: 'short' })
      });
    }
    
    return last7Days;
  }, [analytics.dailyVisits]);

  // Clear analytics data
  const clearAnalytics = useCallback(() => {
    setAnalytics({
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: {},
      dailyVisits: {},
      sessionDuration: [],
      lastVisit: '',
      visits: []
    });
  }, []);

  return {
    analytics,
    isLoaded,
    trackPageVisit,
    getPopularPages,
    getRecentVisits,
    getDailyStats,
    clearAnalytics
  };
}

// Helper function to get time ago
function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}