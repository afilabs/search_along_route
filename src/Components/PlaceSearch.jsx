import React, { useEffect, useState, useCallback } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import './PlaceSearch.scss';

const PlaceSearch = ({ onSelectPlace }) => {
  const map = useMap();
  const googleMaps = useMapsLibrary('places');

  const [placesService, setPlacesService] = useState(null);
  useEffect(() => {
    if (googleMaps && map) {
      setPlacesService(new googleMaps.PlacesService(map));
    }
  }, [map, googleMaps]);

  const handlePlaceSelect = useCallback(
    (place) => {
      if (!place || !placesService) return;

      placesService.getDetails(
        {
          placeId: place.place_id,
          fields: ['geometry', 'name', 'formatted_address', 'place_id'],
        },
        (result) => {
          const formatResult = {
            id: result.place_id,
            displayName: {
              text: result.name,
            },
            formattedAddress: result.formatted_address,
            location: {
              latitude: result.geometry.location.lat(),
              longitude: result.geometry.location.lng(),
            },
          };

          onSelectPlace(formatResult);
        },
      );
    },
    [placesService],
  );

  return (
    <div className="PlaceSearch">
      <PlaceAutocompleteInput onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default React.memo(PlaceSearch);
