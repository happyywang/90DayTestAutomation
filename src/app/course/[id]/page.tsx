import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CodeBlock from '@/components/CodeBlock';
import ProgressButton from '@/components/ProgressButton';
import { getDayContent, getAdjacentDays, getPhaseInfo } from '@/lib/mdx';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DayPage({ params }: PageProps) {
  const { id } = await params;
  const dayId = parseInt(id);
  
  if (isNaN(dayId) || dayId < 1 || dayId > 90) {
    notFound();
  }

  const day = await getDayContent(dayId);
  
  if (!day) {
    notFound();
  }

  const { previous, next } = getAdjacentDays(dayId);
  const phaseInfo = getPhaseInfo(day.phase);

  return (
    <MainLayout>
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-200">
              Course Home
            </Link>
            <span className="mx-2">→</span>
            <span>Phase {day.phase}: {phaseInfo.title}</span>
            <span className="mx-2">→</span>
            <span className="text-gray-900 dark:text-gray-200">Day {dayId}</span>
          </nav>

          {/* Header Section */}
          <header className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                Phase {day.phase}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {day.readingTime} min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Day {dayId} - {day.title}
            </h1>
            
            {day.description && (
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {day.description}
              </p>
            )}
          </header>

          {/* Learning Objectives */}
          {day.objectives && day.objectives.length > 0 && (
            <section id="learning-objectives" className="mb-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    Learning Objectives
                  </h2>
                </div>
                <div className="grid gap-3 ml-4">
                  {day.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {objective}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Learning Content */}
          <section id="learning-content" className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📘</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Learning Content & Code Examples
                </h2>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote 
                  source={day.content}
                  components={{
                    pre: ({ children }: { children: React.ReactNode }) => {
                      const childElement = children as { props?: { children?: string; className?: string } };
                      const code = childElement?.props?.children || '';
                      const language = childElement?.props?.className?.replace('language-', '') || 'javascript';
                      return <CodeBlock language={language}>{code}</CodeBlock>;
                    },
                    h1: ({ children }: { children: React.ReactNode }) => (
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: { children: React.ReactNode }) => (
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: { children: React.ReactNode }) => (
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }: { children: React.ReactNode }) => (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }: { children: React.ReactNode }) => (
                      <ul className="space-y-2 mb-6">
                        {children}
                      </ul>
                    ),
                    li: ({ children }: { children: React.ReactNode }) => (
                      <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{children}</span>
                      </li>
                    )
                  }}
                />
              </div>
            </div>
          </section>

          {/* Daily Exercise */}
          {day.exercises && day.exercises.length > 0 && (
            <section id="daily-exercise" className="mb-12">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🛠</span>
                  </div>
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-200">
                    Daily Exercise
                  </h2>
                </div>
                <div className="grid gap-3 ml-4">
                  {day.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {exercise}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Solution & Common Mistakes */}
          <section id="solution-mistakes" className="mb-12">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">
                  Solution & Common Mistakes
                </h2>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">💡 Pro Tips:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Always test your code incrementally</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use meaningful variable names</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Handle edge cases and errors gracefully</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Optional Challenge */}
          <section id="optional-challenge" className="mb-12">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                  Optional Challenge <span className="text-sm font-normal">(for fast learners)</span>
                </h2>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">🎯 Challenge Ideas:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Extend the basic exercise with additional features</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Implement error handling and edge case testing</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Optimize performance and add logging</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          {day.resources && day.resources.length > 0 && (
            <section id="additional-resources" className="mb-12">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                    Additional Resources
                  </h2>
                </div>
                <div className="grid gap-3 ml-4">
                  {day.resources.map((resource, index) => {
                    // Parse resource string to extract title and URL
                    const match = resource.match(/^(.+?):\s*(https?:\/\/.+)$/);
                    if (match) {
                      const [, title, url] = match;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-blue-500 mt-1">🔗</span>
                          <div>
                            <a 
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium"
                            >
                              {title}
                            </a>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {url}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      // Fallback for resources without URL format
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-blue-500 mt-1">🔗</span>
                          <p className="text-gray-700 dark:text-gray-300">
                            {resource}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Progress Button */}
          <ProgressButton dayNumber={dayId} />

          {/* Navigation */}
          <nav className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <div>
              {previous && (
                <Link
                  href={`/course/${previous}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Day {previous}
                </Link>
              )}
            </div>
            
            <div>
              {next && (
                <Link
                  href={`/course/${next}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
                >
                  Day {next}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </nav>
        </article>

        {/* Table of Contents Sidebar */}
        <aside className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>📖</span>
                Table of Contents
              </h3>
              <nav className="space-y-2">
                <a href="#learning-objectives" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  🎯 Learning Objectives
                </a>
                <a href="#learning-content" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  📘 Learning Content
                </a>
                <a href="#daily-exercise" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  🛠 Daily Exercise
                </a>
                <a href="#solution-mistakes" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  ✅ Solutions & Tips
                </a>
                <a href="#optional-challenge" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  🚀 Optional Challenge
                </a>
                {day.resources && day.resources.length > 0 && (
                  <a href="#additional-resources" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    📚 Additional Resources
                  </a>
                )}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </MainLayout>
  );
}