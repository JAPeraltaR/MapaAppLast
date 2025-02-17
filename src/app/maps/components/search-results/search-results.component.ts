import { Component, inject } from '@angular/core';
import { Feature } from '../../interfaces/response-suggestions.interfaces';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedID: string = '';
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo( place: Feature ){
    this.selectedID = place.id
    const { longitude, latitude } = place.properties.coordinates;
    this.mapService.flyTo([longitude, latitude])
  }

  getDirections( place: Feature ) {
    if( !this.placesService.userLocation ) throw new Error("No se puede loccalizar al usuario");
    const start = this.placesService.userLocation;
    const end = Object.values(place.properties.coordinates) as [number, number]
    this.mapService.getRouteBetweenPoints( start, end ).subscribe( resp =>
      this.mapService.drawPolyLines( resp.routes[0] )
    );
  }
}
