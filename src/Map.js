import React from 'react'
import './Map.css';
import {Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './utils';

const URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer url={URL} attribution='&copy; <a href="http://osm.org/copyright" />">OpenStreetMap</a> contributors'/>
        {/* Loop through and draw circles */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
