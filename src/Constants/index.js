import { ReactComponent as BankIcon } from '../assets/svg/bank_icon.svg';
import { ReactComponent as CafeIcon } from '../assets/svg/cafe_icon.svg';
import { ReactComponent as GasStationIcon } from '../assets/svg/gas_station_icon.svg';
import { ReactComponent as LiquorStoreIcon } from '../assets/svg/liquor_store_icon.svg';
import { ReactComponent as RestaurantIcon } from '../assets/svg/restaurant_icon.svg';
import { ReactComponent as SupermarketIcon } from '../assets/svg/supermarket_icon.svg';
import { ReactComponent as ParkingIcon } from '../assets/svg/parking_icon.svg';
import { ReactComponent as RestStopIcon } from '../assets/svg/rest_stop_icon.svg';
import { ReactComponent as HikingAreaIcon } from '../assets/svg/hiking_area_icon.svg';
import { ReactComponent as PublicBathroomIcon } from '../assets/svg/public_bathroom_icon.svg';
import { ReactComponent as RvParkIcon } from '../assets/svg/rv_park_icon.svg';
import { ReactComponent as CampgroundIcon } from '../assets/svg/campground_icon.svg';

import { ReactComponent as BankMarker } from '../assets/svg/bank_marker.svg';
import { ReactComponent as CafeMarker } from '../assets/svg/cafe_marker.svg';
import { ReactComponent as GasStationMarker } from '../assets/svg/gas_station_marker.svg';
import { ReactComponent as LiquorStoreMarker } from '../assets/svg/liquor_store_marker.svg';
import { ReactComponent as RestaurantMarker } from '../assets/svg/restaurant_marker.svg';
import { ReactComponent as SupermarketMarker } from '../assets/svg/supermarket_marker.svg';
import { ReactComponent as ParkingMarker } from '../assets/svg/parking_marker.svg';
import { ReactComponent as RestStopMarker } from '../assets/svg/rest_stop_marker.svg';
import { ReactComponent as HikingAreaMarker } from '../assets/svg/hiking_area_marker.svg';
import { ReactComponent as PublicBathroomMarker } from '../assets/svg/public_bathroom_marker.svg';
import { ReactComponent as RvParkMarker } from '../assets/svg/rv_park_marker.svg';
import { ReactComponent as CampgroundMarker } from '../assets/svg/campground_marker.svg';

export const PLACE_TYPES = {
  bank: { label: 'Bank', dropdownIcon: BankIcon, markerIcon: BankMarker },
  cafe: { label: 'Cafe', dropdownIcon: CafeIcon, markerIcon: CafeMarker },
  gas_station: { label: 'Gas Station', dropdownIcon: GasStationIcon, markerIcon: GasStationMarker },
  liquor_store: { label: 'Liquor Store', dropdownIcon: LiquorStoreIcon, markerIcon: LiquorStoreMarker },
  restaurant: { label: 'Restaurant', dropdownIcon: RestaurantIcon, markerIcon: RestaurantMarker },
  supermarket: { label: 'Supermarket', dropdownIcon: SupermarketIcon, markerIcon: SupermarketMarker },
  parking: { label: 'Parking', dropdownIcon: ParkingIcon, markerIcon: ParkingMarker },
  rest_stop: { label: 'Rest Stop', dropdownIcon: RestStopIcon, markerIcon: RestStopMarker },
  hiking_area: { label: 'Hiking Area', dropdownIcon: HikingAreaIcon, markerIcon: HikingAreaMarker },
  public_bathroom: { label: 'Public Bathroom', dropdownIcon: PublicBathroomIcon, markerIcon: PublicBathroomMarker },
  rv_park: { label: 'RV Park', dropdownIcon: RvParkIcon, markerIcon: RvParkMarker },
  campground: { label: 'Campground', dropdownIcon: CampgroundIcon, markerIcon: CampgroundMarker }
};

export const PLACE_TYPE_OPTIONS = Object.keys(PLACE_TYPES).map((key) => ({
  value: key,
  label: PLACE_TYPES[key].label,
  icon: PLACE_TYPES[key].dropdownIcon,
}));
