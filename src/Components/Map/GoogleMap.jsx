// Libraries
import React, { memo, useEffect } from 'react';
import { Map, useMap } from '@vis.gl/react-google-maps';

// Components
import Polyline from '../External/Polyline';
import Marker from './Marker';
import MapHandler from './MapHandler';

function GoogleMap({ polyline, places, startLocation, endLocation, onMarkerClick, activePlace }) {
  const map = useMap();

  const renderMarkers = (places) => {
    return places.map((place) => {
      return (
        <Marker
          style={{ width: 30 }}
          active={activePlace.id === place.id}
          key={place.id}
          id={place.id}
          position={place.location}
          type={place.primaryType}
          onToggle={() => onMarkerClick(place)}
        ></Marker>
      );
    });
  };

  useEffect(() => {
    if (activePlace?.id) {
      const latLng = {
        lat: activePlace.location.latitude,
        lng: activePlace.location.longitude,
      };
      map.panTo(latLng);
    }
  }, [activePlace, map]);

  return (
    <div className="GoogleMap" style={{ width: '100%', height: '100%' }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={12}
        defaultCenter={{ lat: 49.25307278849622, lng: -123.12095840000302 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {startLocation && (
          <Marker
            key={startLocation.id}
            id={startLocation.id}
            position={startLocation.location}
            type="startLocation"
            style={{ width: 40, position: 'relative', top: 30 }}
          ></Marker>
        )}

        {places?.length > 0 && renderMarkers(places)}

        {endLocation && (
          <Marker
            key={endLocation.id}
            id={endLocation.id}
            position={endLocation.location}
            type="endLocation"
            style={{ width: 40, position: 'relative', top: 30 }}
          ></Marker>
        )}

        {polyline && <Polyline polyline={polyline} />}
      </Map>
      <MapHandler startLocation={startLocation} endLocation={endLocation} markers={places} />
    </div>
  );
}

export default memo(GoogleMap);
