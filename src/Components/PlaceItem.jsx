import React, { forwardRef } from 'react';
import Rating from './Rating';
import DefaultPlaceImg from '../assets/images/default_place.png';
import './PlaceItem.scss';
import { formatSnakeCase } from '../Utils';

const PlaceItem = forwardRef(
  (
    { active, displayName, rating = 0, userRatingCount = 0, formattedAddress, photos = [], primaryType, onClick },
    ref,
  ) => {
    const imageUrl = photos.length
      ? `https://places.googleapis.com/v1/${photos[0].name}/media?key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxHeightPx=56&maxWidthPx=56`
      : DefaultPlaceImg;

    return (
      <div ref={ref} className={`PlaceItem ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="top-content">
          <img className="item-image" alt={displayName.text} src={imageUrl} />
          <div className="details">
            <p className="item-name">{displayName.text}</p>
            <p className="item-rating">
              {rating} <Rating rating={rating} /> ({userRatingCount})
            </p>
            <p className="item-type">{formatSnakeCase(primaryType)}</p>
          </div>
        </div>
        <p className="item-address">{formattedAddress}</p>
      </div>
    );
  },
);

export default React.memo(PlaceItem);
