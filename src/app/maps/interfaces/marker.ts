import { LngLatLike, Map, Popup } from 'mapbox-gl';

export interface MarkerMap {
  color:  string;
  lngLat: LngLatLike;
  popUp?: Popup;
  map:    Map;
}
