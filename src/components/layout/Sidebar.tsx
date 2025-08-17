'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const coursePhases = [
  {
    id: 1,
    title: "Architecture & Core Foundations",
    emoji: "🌱",
    dayRange: "Days 1-15",
    days: Array.from({ length: 15 }, (_, i) => i + 1)
  },
  {
    id: 2,
    title: "API Automation & Integration",
    emoji: "⚡",
    dayRange: "Days 16-21",
    days: Array.from({ length: 6 }, (_, i) => i + 16)
  },
  {
    id: 3,
    title: "CI/CD & Distributed Testing",
    emoji: "🚀",
    dayRange: "Days 22-30",
    days: Array.from({ length: 9 }, (_, i) => i + 22)
  },
  {
    id: 4,
    title: "Playwright & AI-Powered Testing",
    emoji: "🎯",
    dayRange: "Days 31-42",
    days: Array.from({ length: 12 }, (_, i) => i + 31)
  },
  {
    id: 5,
    title: "Performance & Security Testing",
    emoji: "🛡️",
    dayRange: "Days 43-57",
    days: Array.from({ length: 15 }, (_, i) => i + 43)
  },
  {
    id: 6,
    title: "Test Platform & Cloud Deployment",
    emoji: "👑",
    dayRange: "Days 58-90",
    days: Array.from({ length: 33 }, (_, i) => i + 58)
  }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedPhase, setExpandedPhase] = React.useState<number | null>(null);
  const { getDayStatus, getPhaseProgress, isLoaded } = useProgress();

  // Don't render progress-dependent content until loaded
  if (!isLoaded) {
    return (
      <>
        {/* Mobile backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 
            border-r border-gray-200 dark:border-gray-700 overflow-y-auto
            sidebar-transition
            md:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-4">
            <div className="mb-6 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                90-Day Test Automation
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From Beginner to Test Architect
              </p>
            </div>
            <div className="animate-pulse space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20"></div>
              ))}
            </div>
          </div>
        </aside>
      </>
    );
  }

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  const getPhaseProgressData = (phase: typeof coursePhases[0]) => {
    return getPhaseProgress(phase.days);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700 overflow-y-auto
          sidebar-transition
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          <div className="mb-6 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              90-Day Test Automation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              From Beginner to Test Architect
            </p>
          </div>

          <nav className="space-y-3">
            {coursePhases.map((phase) => {
              const progress = getPhaseProgressData(phase);
              const hasCurrentDay = phase.days.some(day => getDayStatus(day) === 'current');
              const hasCompletedDays = progress.completed > 0;
              const progressPercentage = (progress.progress / progress.total) * 100;
              const completionPercentage = (progress.completed / progress.total) * 100;
              
              return (
                <div key={phase.id} className="group">
                  {/* Phase Header */}
                  <div
                    onClick={() => togglePhase(phase.id)}
                    className={`
                      p-3 rounded-lg border transition-all duration-200 cursor-pointer
                      hover:shadow-md hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20
                      hover:scale-[1.02] hover:-translate-y-0.5
                      active:scale-[0.98] active:translate-y-0
                      focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:outline-none
                      ${hasCurrentDay 
                        ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-sm' 
                        : hasCompletedDays
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 shadow-sm'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="text-lg transform transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
                      >
                        {phase.emoji}
                      </span>
                      <div className="flex-1">
                        <div className={`font-medium text-sm transition-colors duration-200 ${
                          hasCurrentDay 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : hasCompletedDays
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                          {phase.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                          {phase.dayRange}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                          Progress
                        </span>
                        <span className={`font-medium transition-colors duration-200 ${
                          hasCurrentDay 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : hasCompletedDays
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                          {progress.completed}/{progress.total} completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden relative">
                        {/* Completed progress (green) */}
                        {hasCompletedDays && (
                          <div 
                            className="absolute left-0 top-0 h-2 bg-green-500 rounded-full transition-all duration-500 ease-out"
                            style={{ 
                              width: `${completionPercentage}%`,
                              transformOrigin: 'left center'
                            }}
                          ></div>
                        )}
                        {/* Current progress (blue, extends beyond completed) */}
                        {hasCurrentDay && (
                          <div 
                            className="absolute left-0 top-0 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                            style={{ 
                              width: `${progressPercentage}%`,
                              transformOrigin: 'left center'
                            }}
                          ></div>
                        )}
                        {/* Fallback for phases with no progress */}
                        {!hasCompletedDays && !hasCurrentDay && (
                          <div className="absolute left-0 top-0 h-2 bg-gray-400 dark:bg-gray-500 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-300" style={{ width: '100%' }}></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Days List */}
                  {expandedPhase === phase.id && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-5 gap-2">
                        {phase.days.map((dayNumber: number) => {
                          const dayStatus = getDayStatus(dayNumber);
                          return (
                            <Link
                              key={dayNumber}
                              href={`/course/${dayNumber}`}
                              className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                                transition-all duration-200 hover:scale-110
                                ${dayStatus === 'completed' 
                                  ? 'bg-green-500 text-white shadow-sm' 
                                  : dayStatus === 'current'
                                  ? 'bg-blue-500 text-white shadow-sm ring-2 ring-blue-300'
                                  : 'bg-red-500 text-white shadow-sm'
                                }
                              `}
                              title={`Day ${dayNumber} - ${dayStatus}`}
                            >
                              {dayNumber}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}