import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Suggestions, Feature } from '../interfaces/response-suggestions.interfaces';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public baseURL: string = 'https://api.mapbox.com/search/geocode/v6/forward?';

  private placeshttp = inject(PlacesApiClient);

  public isLoadingPlaces: boolean = false;

  public places!: Feature[];

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number,number]>{
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        ( err ) => {
          alert( 'No se pudo obtener la geolocalización' );
          console.log( err );
          reject();
        }
      )
    })
  }

  getPlacesByQuery( query: string ): Observable<Suggestions> {
    if( query.length == 0 ){
      this.isLoadingPlaces = false;
      this.places = [];
      return of();
    }
    if ( !this.userLocation ) throw new Error("No se localiza al usuario")
    this.isLoadingPlaces = true;
    return this.placeshttp.get<Suggestions>( this.baseURL, {
      params: {
        q: query,
        proximity: this.userLocation?.join(',')
      }
    })
  }
}
