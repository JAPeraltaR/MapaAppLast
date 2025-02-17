import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-btn-my-location',
  standalone: false,
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  private mapService = inject(MapService);
  private placeService = inject(PlacesService);

  goToMyLocation() {
    if( !this.placeService.isUserLocationReady ) throw new Error('No hay ubicación del usuario')
      if( !this.mapService.isMapReady ) throw new Error('El mapa no esta disponible')
    this.mapService.flyTo(this.placeService.userLocation as LngLatLike)
  }

}
