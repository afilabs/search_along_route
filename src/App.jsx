import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

// Components
import PlaceSearch from './Components/PlaceSearch';
import PlaceTypeSelector from './Components/PlaceTypeSelector';
import PlaceList from './Components/PlaceList';
import GoogleMap from './Components/Map/GoogleMap';

import { ReactComponent as ClearIcon } from './assets/images/clear.svg';

// Dependencies
import { PLACE_TYPE_OPTIONS } from './Constants';
import request from './Utils/request';
import './App.scss';

const App = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [startLocationId, setStartLocationId] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [endLocationId, setEndLocationId] = useState(null);
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const [encodedPolyline, setEncodedPolyline] = useState(null);
  const [placeResults, setPlaceResults] = useState([]);
  const [activePlace, setActivePlace] = useState({});

  const handleSelectPlaceOption = useCallback((selectedOptions) => setSelectedPlaceType(selectedOptions), []);

  const handlePlaceClick = useCallback((place) => setActivePlace(activePlace.id !== place.id ? place : {}), []);

  const clearFiltersAndRedirect = () => {
    window.location.reload();
  };

  const filteredResults = useMemo(() => {
    if (!selectedPlaceType || !placeResults) return [];
    return placeResults.filter((place) => place.primaryType === selectedPlaceType.value);
  }, [placeResults, selectedPlaceType]);

  const getPolyline = async (requestBody) => {
    const routesResponse = await request('https://routes.googleapis.com/directions/v2:computeRoutes', {
      headers: {
        'X-Goog-FieldMask': 'routes.polyline',
      },
      method: 'POST',
      data: requestBody,
    });

    const polyline = routesResponse.routes ? routesResponse.routes[0] : null;

    if (!polyline) return null;

    setEncodedPolyline(polyline.polyline.encodedPolyline);
    return polyline;
  };

  const searchAlongRoute = async () => {
    if (!encodedPolyline || !selectedPlaceType) return;

    try {
      const placesResponse = await request('https://places.googleapis.com/v1/places:searchText', {
        headers: {
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.primaryType,places.id,places.location,places.rating,places.userRatingCount,places.photos',
        },
        method: 'POST',
        data: {
          textQuery: selectedPlaceType.value,
          searchAlongRouteParameters: {
            polyline: {
              encodedPolyline: encodedPolyline,
            },
          },
        },
      });

      setPlaceResults(placesResponse?.places);
    } catch (error) {
      console.error('Error fetching polyline or places:', error);
    }
  };

  useEffect(() => {
    if (!startLocation || !endLocation) return;

    if (startLocationId !== startLocation.id) {
      setStartLocationId(startLocation.id);
    }

    if (endLocationId !== endLocation.id) {
      setEndLocationId(endLocation.id);
    }

    const requestBody = {
      origin: {
        location: {
          latLng: {
            latitude: startLocation.location.latitude,
            longitude: startLocation.location.longitude,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: endLocation.location.latitude,
            longitude: endLocation.location.longitude,
          },
        },
      },
    };

    getPolyline(requestBody);
  }, [startLocation, endLocation]);

  useEffect(() => {
    searchAlongRoute();
  }, [encodedPolyline, selectedPlaceType]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div className="control-panel">
        <label>Origin address</label>
        <PlaceSearch onSelectPlace={setStartLocation} />

        <label>Destination address</label>
        <PlaceSearch onSelectPlace={setEndLocation} />

        <PlaceTypeSelector options={PLACE_TYPE_OPTIONS} onSelectionChange={handleSelectPlaceOption} />

        <div className="buttons">
          <button className="btn btn-clear" onClick={clearFiltersAndRedirect}>
            Clear All
            <ClearIcon />
          </button>
        </div>

        <PlaceList placeList={filteredResults} activePlace={activePlace} onPlaceClick={handlePlaceClick} />
      </div>

      <GoogleMap
        polyline={encodedPolyline}
        places={filteredResults}
        startLocation={startLocation}
        endLocation={endLocation}
        activePlace={activePlace}
        onMarkerClick={handlePlaceClick}
      />
    </APIProvider>
  );
};

export default App;
