import { inject, Injectable } from '@angular/core';
// import { GeoJSONSourceRaw, LngLatBounds, LngLatLike, Map, Marker, Popup, mapboxgl } from 'mapbox-gl';
import { Feature } from '../interfaces/response-suggestions.interfaces';
import { MarkerMap } from '../interfaces/marker';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/direction.interfaces';
import { Observable } from 'rxjs';
import { GeoJSONSourceRaw, LngLatLike, Map, Marker } from 'mapbox-gl';




@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  private httpDirecions = inject(DirectionsApiClient);

  get isMapReady(): boolean{
    return !!this.map;
  }

  setMap(map: Map): void{
    this.map = map;
  }

  flyTo( coords: LngLatLike ){
    if( !this.isMapReady ) throw new Error('El mapa no esa inicializado');
    this.map?.flyTo({
      center: coords,
      zoom: 14
    })
  }

  setMarket( marker: MarkerMap ){
    if( !marker.map ) throw new Error("No se encontro el mapa");
    const  mark =  new mapboxgl.Marker({color: marker.color}).setLngLat(marker.lngLat).addTo(marker.map);
    if( marker.popUp ) mark.setPopup(marker.popUp);
  }

  createMarkerFromPlaces( places: Feature[] ){
    if(!this.map) throw new Error("Mapa no inicializado");
    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];
    for( const place of places){
      const  {longitude , latitude}  = place.properties.coordinates;
      const popUp = new mapboxgl.Popup().setHTML(`
        <h6>Aqui Estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);
      const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).setPopup(popUp).addTo(this.map);
      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if(places.length == 0 ) return;

    const bounds = new mapboxgl.LngLatBounds();
    newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ) );
    this.map.fitBounds(bounds, {
      padding: 200
    });
  }

  getRouteBetweenPoints( start:[number, number],end: [number, number] ): Observable<DirectionsResponse>{
    return this.httpDirecions.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
  }

  public drawPolyLines( route: Route ){
    console.log(`km: ${ route.distance / 1000 }, duration: ${ route.duration / 60 }`);
    if( !this.map ) throw new Error('Mapa no inicializado');
    const coords = route.geometry.coordinates
    const bound = new mapboxgl.LngLatBounds();
    route.geometry.coordinates.forEach( coor => bound.extend(coor as LngLatLike) );
    this.map.fitBounds(bound, {
      padding: 200
    })

    //PolyLine
    const sourceData: GeoJSONSourceRaw = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: coords,
            type: 'LineString'
          }
        }]
      }
    }

    if(this.map.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  }


}
