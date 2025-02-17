import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { tap } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  private debounceTimer?:NodeJS.Timeout

  onQueryChange( query: string ): void {
    if( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout( () => {
      this.placesService.getPlacesByQuery(query).pipe(
        tap( () => this.placesService.isLoadingPlaces = false)
      ).subscribe( resp => {
        console.log(resp);

        this.placesService.places = resp.features;
        this.mapService.createMarkerFromPlaces(resp.features);
      })
    },500)

  }

}
