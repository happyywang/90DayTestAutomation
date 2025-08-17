'use client';

import React from 'react';
import { useProgress } from '@/hooks/useProgress';

interface ProgressButtonProps {
  dayNumber: number;
}

export default function ProgressButton({ dayNumber }: ProgressButtonProps) {
  const { getDayStatus, markDayAsCompleted, markDayAsIncomplete, setCurrentDay, isLoaded } = useProgress();
  
  React.useEffect(() => {
    // Set current day when visiting the page, but only after loaded
    if (isLoaded) {
      setCurrentDay(dayNumber);
    }
  }, [dayNumber, setCurrentDay, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl border border-green-200 dark:border-green-800 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48"></div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse w-32 h-12"></div>
      </div>
    );
  }

  const dayStatus = getDayStatus(dayNumber);
  const isCompleted = dayStatus === 'completed';

  const handleToggleComplete = () => {
    if (isCompleted) {
      markDayAsIncomplete(dayNumber);
    } else {
      markDayAsCompleted(dayNumber);
    }
  };

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl border border-green-200 dark:border-green-800 mb-8">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}>
          {isCompleted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-lg font-bold">{dayNumber}</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isCompleted ? '🎉 恭喜！课程已完成' : '📚 完成本节课程'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isCompleted 
              ? '太棒了！您已经掌握了本节课程的内容，可以继续下一节课程' 
              : '学完所有内容后，点击按钮标记为已完成'
            }
          </p>
        </div>
      </div>
      
      <button
        onClick={handleToggleComplete}
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          isCompleted
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isCompleted ? '标记为未完成' : '标记为已完成'}
      </button>
    </div>
  );
}