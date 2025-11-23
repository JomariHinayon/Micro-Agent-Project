'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
        setResult(data);
      }
    } catch (err) {
      setError('Failed to connect to the API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Micro-Agent API</h1>
        <p className="text-lg text-gray-600 mb-8">
          Business Strategy Summary Generator
        </p>
        
        {/* Test Form */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test the API</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Enter a topic:
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., direct-to-consumer coffee brands"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Strategy'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4 text-green-800">Strategy Summary:</h3>
            <ol className="list-decimal list-inside space-y-2 text-left">
              {result.summary?.map((point: string, index: number) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ol>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <p className="text-red-800 font-semibold">Error: {error}</p>
          </div>
        )}

        {/* API Documentation */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
          <code className="block mb-2 text-sm">POST /api/summarize</code>
          <div className="text-left mt-4">
            <p className="mb-2"><strong>Request:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
  "topic": "direct-to-consumer coffee brands"
}`}
            </pre>
            <p className="mb-2 mt-4"><strong>Response:</strong></p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
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

