import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="px-8 mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            90-Day Test Automation Course
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            A system learning path from beginner to test architect
          </p>
          <Link 
            href="/course/1"
            className="inline-flex items-center gap-3 px-12 py-6 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Start Your Journey
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>

        {/* Why Choose This Course */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose This Course
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Systematic Course Design",
                description: "Carefully structured 90-day curriculum with progressive difficulty levels and clear milestones"
              },
              {
                icon: "💻",
                title: "Practical Project-Driven",
                description: "Real-world projects and hands-on exercises that build your portfolio and practical skills"
              },
              {
                icon: "⚡",
                title: "Modern Technology Stack",
                description: "Learn cutting-edge tools: Playwright, AI testing, Kubernetes, and cloud-native platforms"
              },
              {
                icon: "🗺️",
                title: "Clear Learning Path",
                description: "Step-by-step progression from beginner basics to expert-level test architecture"
              }
            ].map((reason, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-200 hover:scale-105">
                <div className="text-4xl mb-6">{reason.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Course Structure - Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Course Structure
          </h2>
          
          <div className="relative mt-20">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-200 dark:bg-green-800 h-full"></div>
            
            <div className="space-y-24">
              {[
                {
                  phase: 1,
                  title: "Architecture & Core Foundations",
                  days: "Days 1-15",
                  description: "Build testing frameworks, Page Object Model, and Selenium automation",
                  icon: "🌱",
                  startDay: 1
                },
                {
                  phase: 2,
                  title: "API Automation & Integration",
                  days: "Days 16-21", 
                  description: "REST/GraphQL testing and hybrid UI+API test suites",
                  icon: "⚡",
                  startDay: 16
                },
                {
                  phase: 3,
                  title: "CI/CD & Distributed Testing",
                  days: "Days 22-30",
                  description: "GitHub Actions, Docker, parallel execution, and reporting",
                  icon: "🚀",
                  startDay: 22
                },
                {
                  phase: 4,
                  title: "Playwright & AI-Powered Testing",
                  days: "Days 31-42",
                  description: "Modern testing with Playwright and self-healing locators",
                  icon: "🎯",
                  startDay: 31
                },
                {
                  phase: 5,
                  title: "Performance & Security Testing",
                  days: "Days 43-57",
                  description: "NBomber, Lighthouse, OWASP ZAP, and security scanning",
                  icon: "🛡️",
                  startDay: 43
                },
                {
                  phase: 6,
                  title: "Test Platform & Cloud Deployment",
                  days: "Days 58-90",
                  description: "Blazor platform, microservices, Kubernetes, and monitoring",
                  icon: "👑",
                  startDay: 58
                }
              ].map((phase, index) => (
                <div key={phase.phase} className="relative flex items-center min-h-24">
                  {/* Timeline Circle - positioned on the center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-6 border-white dark:border-gray-900 shadow-xl">
                      Phase {phase.phase}
                    </div>
                  </div>
                  
                  {/* Content Card - positioned close to the center timeline */}
                  <div className={`absolute w-80 ${index % 2 === 0 ? 'right-1/2 mr-30' : 'left-1/2 ml-30'}`}>
                    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-xl">{phase.icon}</div>
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                          Phase {phase.phase} • {phase.days}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                        {phase.description}
                      </p>
                      <Link 
                        href={`/course/${phase.startDay}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Start Phase {phase.phase}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Begin?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start with Day 1 and build your test automation expertise step by step.
          </p>
          <Link 
            href="/course/1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 text-lg"
          >
            Begin Day 1
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
}
