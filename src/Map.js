import React from 'react'
import './Map.css';
import {Map as LeafletMap, TileLayer } from 'react-leaflet';

const URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

function Map({ center, zoom }) {
  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer url={URL} attribution='&copy; <a href="http://osm.org/copyright" />">OpenStreetMap</a> contributors'/>
      </LeafletMap>
    </div>
  )
}

export default Map
