import { memo, useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

function MapHandler({ markers, startLocation, endLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const bounds = new window.google.maps.LatLngBounds();
    let locationsAdded = 0;

    const addLocationToBounds = (location) => {
      const latLng = new window.google.maps.LatLng(location.latitude, location.longitude);
      if (!bounds.contains(latLng)) {
        bounds.extend(latLng);
        locationsAdded++;
      }
    };

    if (startLocation?.location) {
      addLocationToBounds(startLocation.location);
    }

    if (endLocation?.location) {
      addLocationToBounds(endLocation.location);
    }

    markers?.forEach((marker) => {
      if (marker?.location) {
        addLocationToBounds(marker.location);
      }
    });

    if (locationsAdded > 0) {
      map.fitBounds(bounds);

      if (locationsAdded === 1) {
        map.setZoom(14);
      }
    }
  }, [markers, map, startLocation, endLocation]);

  return null;
}

export default memo(MapHandler);
