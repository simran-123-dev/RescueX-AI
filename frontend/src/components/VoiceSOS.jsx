import { useState } from 'react';
import { useSocket } from './SocketProvider';
import api from '../utils/api';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

const VoiceSOS = () => {
  const socket = useSocket();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const start = () => {
    if (!SpeechRecognition) return setError('SpeechRecognition not supported');
    setError(null);
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const txt = Array.from(e.results).map((r) => r[0].transcript).join('');
      setTranscript(txt);
    };
    rec.onerror = (e) => setError(e.error || 'speech error');
    rec.onend = async () => {
      setListening(false);
      if (!transcript) return;
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition((p) => resolve([p.coords.longitude, p.coords.latitude]), reject, { enableHighAccuracy: true, timeout: 10000 });
        });
        const payload = { coordinates: pos, type: 'voice-sos', description: transcript, severity: 'critical' };
        const res = await api.post('/api/emergency', payload);
        socket?.emit('newEmergency', { ...res.data.emergency, userId: res.data.emergency.user });
        alert('Voice SOS sent: ' + res.data.emergency.emergencyId);
        setTranscript('');
      } catch (err) {
        console.error(err);
        alert('Voice SOS failed: ' + (err.message || 'unknown'));
      }
    };
    setListening(true);
    try {
      rec.start();
    } catch (e) {
      setError(e.message || 'failed to start');
      setListening(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-20 z-50">
      {!SpeechRecognition && <div className="rounded p-3 text-sm bg-yellow-600/80">Voice not supported</div>}
      {SpeechRecognition && (
        <div className="flex items-center gap-3">
          <button onClick={start} disabled={listening} className="rounded-full bg-amber-500/90 px-4 py-3 font-semibold text-slate-900 shadow-lg hover:scale-105">
            {listening ? 'Listening…' : 'Voice SOS'}
          </button>
          {transcript && <div className="max-w-xs truncate rounded bg-slate-800/60 px-3 py-2 text-sm">{transcript}</div>}
        </div>
      )}
      {error && <div className="mt-2 rounded bg-rose-600/80 px-3 py-2 text-sm">{error}</div>}
    </div>
  );
};

export default VoiceSOS;
