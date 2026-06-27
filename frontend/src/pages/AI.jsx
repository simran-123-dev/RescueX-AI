import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../utils/api';

const AI = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await api.post('/api/ai/first-aid', {
        prompt: query,
      });

      setResult(res.data.result);
    } catch (err) {
      setResult(err.response?.data?.message || 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 lg:px-16">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-semibold text-white">
          AI First Aid Assistant
        </h1>

        <p className="mt-2 text-slate-400">
          Ask RescueX AI for step-by-step first aid guidance.
        </p>

        <div className="mt-6 flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. My friend fainted"
            className="w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 outline-none"
          />

          <button
            onClick={ask}
            className="rounded-full bg-cyan-400 px-4 py-3 font-semibold text-slate-950"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-900/60 p-6">

          <div className="prose prose-invert max-w-none whitespace-pre-wrap">
            <ReactMarkdown>
              {result || 'Ask a question to see AI suggestions.'}
            </ReactMarkdown>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AI;