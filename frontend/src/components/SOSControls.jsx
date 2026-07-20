import { useEffect, useRef, useState } from 'react';
import { useSocket } from './SocketProvider';
import api from '../utils/api';
import SOSNotice from './SOSNotice';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

const getErrorMessage = (err, label = 'SOS') => {
  if (err.code === 1) return 'Location permission denied. Please allow location access and try again.';
  if (err.code === 2) return 'Could not detect your location. Please check GPS and try again.';
  if (err.code === 3) return 'Location request timed out. Please try again.';
  if (err.response?.data?.message) return err.response.data.message;
  if (err.message === 'Network Error') return `Backend is not reachable. Start the server on port 5000, then try ${label} again.`;
  return err.message || `Could not send ${label} right now.`;
};

const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((p) => resolve([p.coords.longitude, p.coords.latitude]), reject, { enableHighAccuracy: true, timeout: 10000 });
});

const SOSControls = () => {
  const socket = useSocket();
  const latestTranscript = useRef('');
  const [sosLoading, setSosLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSending, setVoiceSending] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(timer);
  }, [notice]);

  const sendEmergency = async ({ type, description, label }) => {
    const coordinates = await getCurrentPosition();
    const res = await api.post('/api/emergency', { coordinates, type, description, severity: 'critical' });
    socket?.emit('newEmergency', { ...res.data.emergency, userId: res.data.emergency.user });
    setNotice({ type: 'success', text: `${label} sent: ${res.data.emergency.emergencyId}` });
  };

  const triggerSOS = async () => {
    setSosLoading(true);
    setNotice(null);
    try {
      await sendEmergency({ type: 'medical', description: 'SOS triggered from app', label: 'SOS' });
    } catch (err) {
      console.error(err);
      setNotice({ type: 'error', text: getErrorMessage(err, 'SOS') });
    } finally {
      setSosLoading(false);
    }
  };

  const startVoiceSOS = () => {
    if (!SpeechRecognition) {
      setNotice({ type: 'error', text: 'Voice SOS is not supported in this browser.' });
      return;
    }

    setNotice(null);
    setTranscript('');
    latestTranscript.current = '';

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join('');
      latestTranscript.current = text;
      setTranscript(text);
    };
    rec.onerror = (e) => {
      setNotice({ type: 'error', text: e.error || 'Speech recognition failed.' });
      setListening(false);
    };
    rec.onend = async () => {
      setListening(false);
      const spokenText = latestTranscript.current.trim();
      if (!spokenText) return;

      setVoiceSending(true);
      try {
        await sendEmergency({ type: 'voice-sos', description: spokenText, label: 'Voice SOS' });
        setTranscript('');
        latestTranscript.current = '';
      } catch (err) {
        console.error(err);
        setNotice({ type: 'error', text: getErrorMessage(err, 'Voice SOS') });
      } finally {
        setVoiceSending(false);
      }
    };

    setListening(true);
    try {
      rec.start();
    } catch (e) {
      setNotice({ type: 'error', text: e.message || 'Could not start voice recognition.' });
      setListening(false);
    }
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-6 sm:max-w-[calc(100vw-2rem)] sm:items-end sm:gap-3">
      <SOSNotice notice={notice} className="w-full sm:w-80" />
      {transcript && <div className="w-full truncate rounded-lg border border-white/10 bg-zinc-900/95 px-3 py-2 text-sm text-zinc-200 shadow-xl sm:w-80">{transcript}</div>}
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-zinc-950/88 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex sm:items-center sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
        <button onClick={startVoiceSOS} disabled={listening || voiceSending || !SpeechRecognition} className="min-h-12 rounded-lg bg-amber-400 px-4 py-3 font-semibold text-zinc-950 shadow-lg shadow-amber-950/30 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:py-4">
          {listening ? 'Listening...' : voiceSending ? 'Sending...' : 'Voice SOS'}
        </button>
        <button onClick={triggerSOS} disabled={sosLoading} className="min-h-12 rounded-lg bg-rose-500 px-4 py-3 font-semibold text-white shadow-2xl shadow-rose-950/40 transition hover:-translate-y-0.5 hover:bg-rose-400 disabled:opacity-70 sm:px-6 sm:py-4">
          {sosLoading ? 'Sending...' : 'SOS'}
        </button>
      </div>
    </div>
  );
};

export default SOSControls;
