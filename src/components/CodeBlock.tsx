'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({ 
  children, 
  language = 'javascript', 
  title,
  className = '' 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {title && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-b-0 border-gray-200 dark:border-gray-700 rounded-t-lg">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`
          bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 overflow-x-auto text-sm
          ${title ? 'rounded-b-lg' : 'rounded-lg'}
          border border-gray-200 dark:border-gray-700
        `}>
          <code className={`language-${language}`}>
            {children}
          </code>
        </pre>
        
        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`
            absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded
            transition-all duration-200 opacity-0 group-hover:opacity-100
            ${copied 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            }
          `}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
    </div>
  );
}