import React, { useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';
import './PlaceList.scss';

const PlaceList = ({ placeList = [], activePlace, onPlaceClick }) => {
  const itemRefs = useRef({});

  useEffect(() => {
    if (activePlace && itemRefs.current[activePlace.id]) {
      itemRefs.current[activePlace.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activePlace]);

  return (
    <div className="PlaceList" style={{ marginTop: placeList.length > 0 ? 10 : 0 }}>
      {placeList.map((place) => (
        <PlaceItem
          key={place.id}
          ref={(el) => (itemRefs.current[place.id] = el)}
          {...place}
          placeType={place.placeType}
          active={activePlace.id === place.id}
          onClick={() => onPlaceClick(place)}
        />
      ))}
    </div>
  );
};

export default React.memo(PlaceList);
