import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiSend } from 'react-icons/fi';
import api from '../utils/api';

const AI = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/api/ai/first-aid', { prompt: query });
      setResult(res.data.result);
    } catch (err) {
      setResult(err.response?.data?.message || 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="glass-card p-6">
          <p className="eyebrow">AI first aid</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Get immediate guidance</h1>
          <p className="mt-4 leading-8 text-zinc-400">Describe the situation clearly. Include symptoms, age if known, and what has already happened.</p>
          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            {['Chest pain and sweating', 'Heavy bleeding from arm', 'Person fainted suddenly'].map((item) => (
              <button key={item} onClick={() => setQuery(item)} className="rounded-lg border border-white/10 bg-zinc-950/60 px-4 py-3 text-left transition hover:border-teal-300/30">
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="glass-card p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. My friend fainted" className="field" />
            <button onClick={ask} disabled={loading} className="primary-btn shrink-0 gap-2">
              <FiSend /> {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
          <div className="prose prose-invert mt-6 max-w-none rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-zinc-300">
            <ReactMarkdown>{result || 'Ask a question to see AI suggestions.'}</ReactMarkdown>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AI;
