import './Map.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const MyMap = () => {
  const position = [50.4333, 30.5167];

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
      />
    </MapContainer>
  );
};

export default MyMap;
