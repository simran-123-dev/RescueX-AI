import { useState } from 'react';
import { useSocket } from './SocketProvider';
import api from '../utils/api';

const SOSButton = () => {
  const socket = useSocket();
  const [loading, setLoading] = useState(false);

  const triggerSOS = async () => {
    setLoading(true);
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((p) => resolve([p.coords.longitude, p.coords.latitude]), reject, { enableHighAccuracy: true, timeout: 10000 });
      });
      const payload = { coordinates: pos, type: 'medical', description: 'SOS triggered from app', severity: 'critical' };
      const res = await api.post('/api/emergency', payload);
      socket?.emit('newEmergency', { ...res.data.emergency, userId: res.data.emergency.user });
      alert('SOS sent: ' + res.data.emergency.emergencyId);
    } catch (err) {
      console.error(err);
      alert('Failed to send SOS: ' + (err.message || 'unknown'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={triggerSOS} disabled={loading} className="fixed right-6 bottom-8 z-50 rounded-full bg-rose-500/90 px-6 py-4 text-white font-semibold shadow-2xl hover:scale-105">
      {loading ? 'Sending...' : 'SOS'}
    </button>
  );
};

export default SOSButton;
