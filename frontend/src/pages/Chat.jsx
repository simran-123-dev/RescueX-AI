import { useEffect, useState } from 'react';
import { useSocket } from '../components/SocketProvider';
import api from '../utils/api';

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // load history (best-effort)
    api.get('/api/chat').then((r) => setMessages(r.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handler = (m) => setMessages((s) => [...s, m]);
    socket.on('chatMessage', handler);
    return () => socket.off('chatMessage', handler);
  }, [socket]);

  const send = async () => {
    if (!text.trim()) return;
    const msg = { text, createdAt: new Date().toISOString() };
    setMessages((s) => [...s, { ...msg, local: true }]);
    try {
      await api.post('/api/chat', msg).then((r) => r.data && socket?.emit('chatMessage', r.data));
    } catch (err) {
      console.error(err);
    }
    setText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold">Live Chat</h2>
        <div className="mt-4 flex h-80 flex-col gap-2 overflow-auto rounded-lg bg-slate-900/60 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`rounded px-3 py-2 ${m.local ? 'bg-slate-700/60' : 'bg-slate-800/30'}`}>
              <div className="text-sm text-slate-300">{m.text}</div>
              <div className="mt-1 text-xs text-slate-500">{new Date(m.createdAt || Date.now()).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="w-full rounded px-3 py-2 bg-slate-900/40 outline-none" />
          <button onClick={send} className="rounded bg-cyan-400 px-4 py-2 font-semibold text-slate-900">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
