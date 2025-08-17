'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Progress {
  completedDays: number[];
  currentDay: number | null;
  lastAccessDate: string;
}

const PROGRESS_KEY = 'test-automation-course-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({
    completedDays: [],
    currentDay: null,
    lastAccessDate: new Date().toISOString()
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          setProgress(parsed);
        } catch (error) {
          console.error('Failed to parse saved progress:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const markDayAsCompleted = useCallback((dayNumber: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: [...new Set([...prev.completedDays, dayNumber])],
      lastAccessDate: new Date().toISOString()
    }));
  }, []);

  const markDayAsIncomplete = useCallback((dayNumber: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: prev.completedDays.filter(day => day !== dayNumber),
      lastAccessDate: new Date().toISOString()
    }));
  }, []);

  const setCurrentDay = useCallback((dayNumber: number) => {
    setProgress(prev => {
      // Only update if the current day is actually different
      if (prev.currentDay === dayNumber) {
        return prev;
      }
      return {
        ...prev,
        currentDay: dayNumber,
        lastAccessDate: new Date().toISOString()
      };
    });
  }, []);

  const getDayStatus = useCallback((dayNumber: number): 'completed' | 'current' | 'pending' => {
    if (progress.completedDays.includes(dayNumber)) {
      return 'completed';
    }
    if (progress.currentDay === dayNumber) {
      return 'current';
    }
    return 'pending';
  }, [progress.completedDays, progress.currentDay]);

  const resetProgress = useCallback(() => {
    setProgress({
      completedDays: [],
      currentDay: null,
      lastAccessDate: new Date().toISOString()
    });
  }, []);

  const getPhaseProgress = useCallback((phaseDays: number[]) => {
    const completedInPhase = phaseDays.filter(day => progress.completedDays.includes(day));
    const currentInPhase = phaseDays.find(day => progress.currentDay === day);
    
    return {
      completed: completedInPhase.length,
      current: currentInPhase || null,
      total: phaseDays.length,
      progress: completedInPhase.length + (currentInPhase ? 1 : 0)
    };
  }, [progress.completedDays, progress.currentDay]);

  return {
    progress,
    isLoaded,
    markDayAsCompleted,
    markDayAsIncomplete,
    setCurrentDay,
    getDayStatus,
    resetProgress,
    getPhaseProgress
  };
}