'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
      } else {
        // Validate that we have a summary array
        if (data && data.summary && Array.isArray(data.summary) && data.summary.length > 0) {
          setResult(data);
        } else {
          setError('Invalid response format. Please check the API configuration.');
        }
      }
    } catch (err) {
      setError('Failed to connect to the API. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center w-full max-w-2xl">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Micro-Agent API
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
          Business Strategy Summary Generator
        </p>
        
        {/* Test Form */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6 transition-colors">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Test the API
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter a topic:
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., direct-to-consumer coffee brands"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Generating...' : 'Generate Strategy'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 transition-colors">
            <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300">
              Strategy Summary:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-left text-gray-700 dark:text-gray-300">
              {result.summary?.map((point: string, index: number) => (
                <li key={index} className="mb-2">{point}</li>
              ))}
            </ol>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg mb-4 sm:mb-6 transition-colors">
            <p className="text-red-800 dark:text-red-300 font-semibold">Error: {error}</p>
          </div>
        )}

        {/* API Documentation */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg transition-colors">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            API Endpoint
          </h2>
          <code className="block mb-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 p-2 rounded">
            POST /api/summarize
          </code>
          <div className="text-left mt-4">
            <p className="mb-2 font-medium text-gray-900 dark:text-white">
              <strong>Request:</strong>
            </p>
            <pre className="bg-gray-800 dark:bg-gray-900 text-green-400 dark:text-green-300 p-3 sm:p-4 rounded overflow-x-auto text-xs sm:text-sm border border-gray-700 dark:border-gray-600">
{JSON.stringify({ topic: topic || "direct-to-consumer coffee brands" }, null, 2)}
            </pre>
            <p className="mb-2 mt-4 font-medium text-gray-900 dark:text-white">
              <strong>Response:</strong>
            </p>
            <pre className="bg-gray-800 dark:bg-gray-900 text-green-400 dark:text-green-300 p-3 sm:p-4 rounded overflow-x-auto text-xs sm:text-sm border border-gray-700 dark:border-gray-600">
{result 
  ? JSON.stringify(result, null, 2)
  : `{
  "summary": [
    "Point 1...",
    "Point 2...",
    "Point 3..."
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

