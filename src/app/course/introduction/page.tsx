import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function IntroductionPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-white text-3xl font-bold">90D</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to Your Journey!
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            You're about to embark on a transformative 90-day journey that will take you from a testing beginner to a skilled test automation architect. Let's set you up for success!
          </p>
        </div>

        {/* What You'll Achieve */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🎯 What You'll Achieve in 90 Days
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-3">
                Technical Mastery
              </h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-300">
                <li>• Master C# and .NET test automation</li>
                <li>• Build robust test frameworks from scratch</li>
                <li>• Implement Page Object Model patterns</li>
                <li>• Create CI/CD pipelines with automated testing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-3">
                Career Growth
              </h3>
              <ul className="space-y-2 text-green-800 dark:text-green-300">
                <li>• Become a sought-after test automation engineer</li>
                <li>• Build a portfolio of real-world projects</li>
                <li>• Gain expertise in modern testing tools</li>
                <li>• Develop leadership skills in test strategy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Path Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            📚 Your Learning Path
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: "Foundations",
                days: "Days 1-30",
                icon: "🌱",
                color: "blue",
                description: "Master the fundamentals of test automation, framework design, and core C# concepts"
              },
              {
                phase: "Advanced Skills",
                days: "Days 31-60", 
                icon: "⚡",
                color: "purple",
                description: "Dive into modern tools like Playwright, AI-powered testing, and performance optimization"
              },
              {
                phase: "Expert Level",
                days: "Days 61-90",
                icon: "👑",
                color: "green",
                description: "Build enterprise-grade test platforms, implement cloud solutions, and lead test strategy"
              }
            ].map((phase, index) => (
              <div key={index} className={`bg-${phase.color}-50 dark:bg-${phase.color}-950/20 rounded-2xl p-6 border border-${phase.color}-200 dark:border-${phase.color}-800 text-center`}>
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className={`text-xl font-bold text-${phase.color}-900 dark:text-${phase.color}-200 mb-2`}>
                  {phase.phase}
                </h3>
                <div className={`text-sm text-${phase.color}-600 dark:text-${phase.color}-400 font-medium mb-3`}>
                  {phase.days}
                </div>
                <p className={`text-${phase.color}-800 dark:text-${phase.color}-300 text-sm leading-relaxed`}>
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Commitment */}
        <div className="mb-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">⏰</span>
            </div>
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-200">
              Time Commitment & Study Tips
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200 mb-3">
                📅 Recommended Schedule
              </h3>
              <ul className="space-y-2 text-orange-800 dark:text-orange-300">
                <li>• <strong>1-2 hours per day</strong> for consistent progress</li>
                <li>• <strong>Morning study</strong> for better retention</li>
                <li>• <strong>Practice projects</strong> on weekends</li>
                <li>• <strong>Review previous lessons</strong> weekly</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200 mb-3">
                💡 Success Tips
              </h3>
              <ul className="space-y-2 text-orange-800 dark:text-orange-300">
                <li>• Set up a dedicated learning environment</li>
                <li>• Practice coding exercises daily</li>
                <li>• Join testing communities for support</li>
                <li>• Build projects alongside learning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🛠 Prerequisites & Setup
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Required Knowledge
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Basic computer skills</li>
                  <li>• Willingness to learn programming</li>
                  <li>• Understanding of web applications</li>
                  <li>• No prior testing experience needed!</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-500">🖥️</span>
                  Required Software
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Visual Studio Code (free)</li>
                  <li>• .NET SDK (free)</li>
                  <li>• Git version control (free)</li>
                  <li>• Google Chrome browser</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Start */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            🚀 Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your 90-day journey to test automation mastery starts now!
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/course/1"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-green-600 text-xl font-bold rounded-2xl transition-all duration-200 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              Begin Day 1: Introduction & Setup
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <div className="text-sm opacity-75">
              Day 1: Introduction to Test Automation & Environment Setup
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course Overview
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}