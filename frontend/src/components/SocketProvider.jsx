import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const s = io(base, { transports: ['websocket'], autoConnect: true });
    setSocket(s);

    s.on('connect', () => console.debug('socket connected', s.id));
    s.on('disconnect', (reason) => console.debug('socket disconnected', reason));

    // Forward common events to window for simple global listeners
    const forward = (evt) => (payload) => {
      console.debug('socket evt', evt, payload);
      try {
        window.dispatchEvent(new CustomEvent(`socket:${evt}`, { detail: payload }));
      } catch (e) {
        // ignore
      }
    };

    const events = ['emergencyCreated', 'emergencyRequest', 'missionAccepted', 'chatMessage', 'volunteerNearby'];
    events.forEach((e) => s.on(e, forward(e)));

    return () => {
      events.forEach((e) => s.off(e));
      s.close();
    };
  }, []);

  const api = useMemo(() => ({
    socket,
    on: (evt, cb) => socket?.on(evt, cb),
    off: (evt, cb) => socket?.off(evt, cb),
    emit: (evt, payload) => socket?.emit(evt, payload),
  }), [socket]);

  return <SocketContext.Provider value={api}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
