import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useSocket } from './SocketProvider';

// This component dynamically loads react-leaflet if installed. If not installed
// it shows instructions and a simple list fetched from the API.
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
        // create simple markers from fetched items if they have location
        const m = combined
          .filter((it) => it.location && it.location.coordinates)
          .map((it) => ({ id: it._id || it.id, coords: [it.location.coordinates[1], it.location.coordinates[0]], meta: it }));
        setMarkers(m);
      } catch (err) {
        setError(err.message || 'failed');
      }
    };

    // try to set center from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => setCenter([p.coords.latitude, p.coords.longitude]), () => {});
    }

    loadData();
  }, []);

  useEffect(() => {
    // dynamic load of leaflet css and react-leaflet
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
        // not installed — leave placeholder UI
        setLeafletLoaded(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!socketApi) return;
    const onVolunteer = (data) => {
      setMarkers((m) => {
        const exists = m.find((x) => x.id === data._id || x.id === data.id);
        const newMarker = { id: data._id || data.id, coords: [data.location.coordinates[1], data.location.coordinates[0]], meta: data };
        if (exists) return m.map((x) => (x.id === exists.id ? newMarker : x));
        return [...m, newMarker];
      });
    };
    socketApi.on && socketApi.on('volunteerNearby', onVolunteer);
    socketApi.on && socketApi.on('emergencyCreated', (e) => {
      // add emergency marker
      if (e.location && e.location.coordinates) {
        setMarkers((m) => [...m, { id: e._id || e.emergencyId || Date.now(), coords: [e.location.coordinates[1], e.location.coordinates[0]], meta: e }]);
      }
    });

    return () => {
      socketApi.off && socketApi.off('volunteerNearby', onVolunteer);
    };
  }, [socketApi]);

  if (!leafletLoaded) {
    return (
      <div className="rounded-2xl bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold">Map</h3>
        <p className="mt-2 text-sm text-slate-400">Interactive map not available. To enable install:</p>
        <pre className="mt-2 rounded bg-slate-800 p-3 text-xs">npm install leaflet react-leaflet</pre>
        <p className="mt-3 text-sm text-slate-300">After installing, the map will load automatically.</p>
        <div className="mt-4">
          <strong className="text-sm">Nearby items fetched (sample):</strong>
          <ul className="mt-2 max-h-40 overflow-auto text-sm">
            {items.length === 0 && <li className="text-slate-400">No items found or endpoint unavailable.</li>}
            {items.map((it, idx) => (
              <li key={idx} className="mt-1">{it.name || it.email || it._id} — {it.bloodGroup || it.role || ''}</li>
            ))}
          </ul>
        </div>
        {error && <div className="mt-3 text-rose-400">Error: {error}</div>}
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = LModule;

  return (
    <div className="rounded-2xl bg-slate-900/60 p-6">
      <h3 className="text-lg font-semibold">Live Map</h3>
      <div className="mt-4 h-[480px] w-full">
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((m) => (
            <Marker key={m.id} position={m.coords}>
              <Popup>
                <div className="text-sm">
                  <div>{m.meta.name || m.meta.email || 'Unknown'}</div>
                  <div className="text-xs text-slate-400">{m.meta.role || m.meta.bloodGroup || ''}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPlaceholder;
