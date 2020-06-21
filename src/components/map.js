import React, { useState, useEffect } from 'react'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet';
import toolsColors from '../utilities/markersColors';

const UsersMap = ({ usersData }) => {
  const getMarkers = () => {
    const markers = []
    Object.keys(usersData).forEach((tool) => {
      usersData[tool].forEach(({ lat, lon, date }) => {
        markers.push({ tool, lat, lon, date })
      })
    })
    console.log(markers)
    return markers
  }

  return (
    <Map center={[41.385, 2.1734]} zoom={3} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {getMarkers().map((session) => (
        <Marker
          key={session.date}
          position={[session.lat, session.lon]}
          icon={toolsColors[session.tool]}
        >
          <Popup>
            {session.tool}
            {' '}
            {session.date}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

export default UsersMap;
