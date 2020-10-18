import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/ongs-map.css';
import api from '../services/api';

interface Institution {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

function OngsMap() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);

  useEffect(() => {
    api.get('institutions').then(response => {
      setInstitutions(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha uma instituição no mapa</h2>
          <p>Ajude, o futuro de nosso país está em nossas crianças</p>
        </header>

        <footer>
          <strong>Fortaleza</strong>
          <span>Ceará</span>
        </footer>
      </aside>

      <Map
        center={[-3.7899266,-38.5889879]}
        zoom={12}
        style={{width: '100%', height: '100%'}}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {institutions.map(institution => {
          return (
            <Marker icon={mapIcon} position={[institution.latitude, institution.longitude]} key={institution.id}>
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {institution.name}
                <Link to={`/ongs/${institution.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}

        

      </Map>

      <Link to ="/ongs/create" className="create-institution">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  );
}

export default OngsMap;