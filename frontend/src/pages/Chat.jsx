import { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useSocket } from '../components/SocketProvider';
import api from '../utils/api';

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    api.get('/api/chat').then((r) => setMessages(r.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!socket) return undefined;
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
    <div className="page-shell">
      <div className="glass-card mx-auto max-w-4xl p-6">
        <p className="eyebrow">Responder channel</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Live Chat</h1>
        <div className="mt-6 flex h-[28rem] flex-col gap-3 overflow-auto rounded-lg border border-white/10 bg-zinc-950/70 p-4">
          {messages.length === 0 && <div className="grid h-full place-items-center text-sm text-zinc-500">No messages yet.</div>}
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-lg px-4 py-3 ${m.local ? 'ml-auto bg-teal-300 text-zinc-950' : 'bg-white/[0.07] text-zinc-200'}`}>
              <div className="text-sm">{m.text}</div>
              <div className={`mt-1 text-xs ${m.local ? 'text-zinc-700' : 'text-zinc-500'}`}>{new Date(m.createdAt || Date.now()).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="field" />
          <button onClick={send} className="primary-btn gap-2"><FiSend /> Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
