'use client';

import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsPanel({ isOpen, onClose }: AnalyticsPanelProps) {
  const { analytics, isLoaded, getPopularPages, getRecentVisits, getDailyStats, clearAnalytics } = useAnalytics();

  if (!isLoaded) {
    return null;
  }

  const popularPages = getPopularPages(5);
  const recentVisits = getRecentVisits(10);
  const dailyStats = getDailyStats();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-400 text-xl">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                网站访问统计
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                查看您的课程网站流量数据
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.totalVisits.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">总访问量</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analytics.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">独立访客</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Object.keys(analytics.pageViews).length}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">访问页面</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {analytics.lastVisit ? new Date(analytics.lastVisit).toLocaleDateString() : '暂无'}
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">最后访问</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Visits Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📈 过去7天访问量
              </h3>
              <div className="space-y-3">
                {dailyStats.map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {day.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 w-20">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.max(5, (day.visits / Math.max(...dailyStats.map(d => d.visits))) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                        {day.visits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Pages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔥 热门页面
              </h3>
              <div className="space-y-3">
                {popularPages.length > 0 ? popularPages.map((page, pageIndex) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                        {pageIndex + 1}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {page.path === '/' ? '首页' : page.path}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.views}
                    </span>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">暂无访问数据</p>
                )}
              </div>
            </div>

            {/* Recent Visits */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🕒 最近访问记录
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">页面</th>
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">时间</th>
                      <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">来源</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.length > 0 ? recentVisits.map((visit, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 text-gray-700 dark:text-gray-300">
                          {visit.path === '/' ? '首页' : visit.path}
                        </td>
                        <td className="py-2 text-gray-500 dark:text-gray-400">
                          {visit.timeAgo}
                        </td>
                        <td className="py-2 text-gray-500 dark:text-gray-400">
                          {visit.referrer ? new URL(visit.referrer).hostname : '直接访问'}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                          暂无访问记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              数据保存在浏览器本地存储中，不会上传到服务器
            </p>
            <button
              onClick={() => {
                if (confirm('确定要清空所有统计数据吗？此操作不可恢复。')) {
                  clearAnalytics();
                }
              }}
              className="px-4 py-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              清空数据
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}