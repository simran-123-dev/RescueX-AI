import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useSocket } from './SocketProvider';

const MapPlaceholder = () => {
  const socketApi = useSocket();
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [LModule, setLModule] = useState(null);
  const [items, setItems] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState([51.505, -0.09]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const d = await api.get('/api/blood-donors').catch(() => null);
        const v = await api.get('/api/volunteers').catch(() => null);
        const combined = [];
        if (d?.data) combined.push(...(Array.isArray(d.data) ? d.data : d.data.items || []));
        if (v?.data) combined.push(...(Array.isArray(v.data) ? v.data : v.data.items || []));
        setItems(combined.slice(0, 200));
        setMarkers(combined
          .filter((it) => it.location && it.location.coordinates)
          .map((it) => ({ id: it._id || it.id, coords: [it.location.coordinates[1], it.location.coordinates[0]], meta: it })));
      } catch (err) {
        setError(err.message || 'failed');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => setCenter([p.coords.latitude, p.coords.longitude]), () => {});
    }

    loadData();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await import('leaflet/dist/leaflet.css');
        const mod = await import('react-leaflet');
        if (mounted) {
          setLModule(mod);
          setLeafletLoaded(true);
        }
      } catch (e) {
        setLeafletLoaded(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!socketApi) return undefined;
    const onVolunteer = (data) => {
      setMarkers((m) => {
        const exists = m.find((x) => x.id === data._id || x.id === data.id);
        const newMarker = { id: data._id || data.id, coords: [data.location.coordinates[1], data.location.coordinates[0]], meta: data };
        if (exists) return m.map((x) => (x.id === exists.id ? newMarker : x));
        return [...m, newMarker];
      });
    };
    const onEmergency = (e) => {
      if (e.location && e.location.coordinates) {
        setMarkers((m) => [...m, { id: e._id || e.emergencyId || Date.now(), coords: [e.location.coordinates[1], e.location.coordinates[0]], meta: e }]);
      }
    };
    socketApi.on && socketApi.on('volunteerNearby', onVolunteer);
    socketApi.on && socketApi.on('emergencyCreated', onEmergency);

    return () => {
      socketApi.off && socketApi.off('volunteerNearby', onVolunteer);
      socketApi.off && socketApi.off('emergencyCreated', onEmergency);
    };
  }, [socketApi]);

  if (!leafletLoaded) {
    return (
      <div className="page-shell">
        <div className="glass-card mx-auto max-w-5xl p-6">
          <p className="eyebrow">Map</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Live response map</h3>
          <p className="mt-2 text-sm text-zinc-400">Interactive map not available. To enable install:</p>
          <pre className="mt-3 overflow-auto rounded-lg border border-white/10 bg-zinc-950/80 p-3 text-xs text-zinc-300">npm install leaflet react-leaflet</pre>
          <p className="mt-3 text-sm text-zinc-300">After installing, the map will load automatically.</p>
          <div className="mt-5">
            <strong className="text-sm text-white">Nearby items fetched</strong>
            <ul className="mt-2 max-h-44 overflow-auto text-sm text-zinc-300">
              {items.length === 0 && <li className="text-zinc-500">No items found or endpoint unavailable.</li>}
              {items.map((it, idx) => (
                <li key={idx} className="mt-1">{it.name || it.email || it._id} - {it.bloodGroup || it.role || ''}</li>
              ))}
            </ul>
          </div>
          {error && <div className="mt-3 text-rose-400">Error: {error}</div>}
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = LModule;

  return (
    <div className="page-shell">
      <div className="glass-card mx-auto max-w-6xl p-6">
        <p className="eyebrow">Map</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">Live response map</h3>
        <div className="mt-5 h-[480px] w-full overflow-hidden rounded-lg border border-white/10">
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((m) => (
              <Marker key={m.id} position={m.coords}>
                <Popup>
                  <div className="text-sm">
                    <div>{m.meta.name || m.meta.email || 'Unknown'}</div>
                    <div className="text-xs text-zinc-500">{m.meta.role || m.meta.bloodGroup || ''}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
