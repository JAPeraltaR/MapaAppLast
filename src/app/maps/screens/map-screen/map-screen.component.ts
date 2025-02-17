import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  standalone: false,
  templateUrl: './map-screen.component.html',
  styles: ``
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

}
