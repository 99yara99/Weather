import './Map.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useContext } from 'react';
import { CoordContext } from '../Main/SearchBar/CoordContext';

const MyMap = () => {
  // Getting data from Context
  let { coordsContext } = useContext(CoordContext);
  const position = [coordsContext.lat, coordsContext.lon];

  //Rendering Map Component
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
