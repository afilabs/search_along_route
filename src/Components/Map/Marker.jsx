import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

// Dependencies
import { ReactComponent as StartMarker } from '../../assets/images/start_marker.svg';
import { ReactComponent as EndMarker } from '../../assets/images/end_marker.svg';
import { PLACE_TYPES } from '../../Constants';
import './Marker.scss';

const Marker = ({ id, position, type, style, onToggle, active }) => {
  let Icon;

  if (type === 'startLocation') {
    Icon = StartMarker;
  } else if (type === 'endLocation') {
    Icon = EndMarker;
  } else {
    Icon = PLACE_TYPES[type].markerIcon;
  }

  return (
    <AdvancedMarker
      key={id}
      position={{
        lat: position.latitude,
        lng: position.longitude,
      }}
      className={`marker ${active ? 'active' : ''}`}
      zIndex={active ? 2 : 1}
      onClick={onToggle}
    >
      <Icon style={style} />
    </AdvancedMarker>
  );
};

export default Marker;
