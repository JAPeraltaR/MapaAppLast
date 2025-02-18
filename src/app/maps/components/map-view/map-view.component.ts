import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { MarkerMap } from '../../interfaces/marker';


@Component({
  selector: 'app-map-view',
  standalone: false,
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;

  private placesServices = inject(PlacesService);
  private mapService = inject(MapService);


  ngAfterViewInit(): void {
    const { Map, Popup } = mapboxgl;

    if( !this.placesServices.userLocation ) throw new Error('Error en la localizacion del usuario');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesServices.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    this.mapService.setMap(map);
    const popup = new Popup()
      .setHTML(`
        <h6>Aqui Estoy</h6>
        <span>Estoy en este lugar del mundo</span>
    `);



    const marker: MarkerMap = {
      color: 'red',
      lngLat: mapboxgl.LngLat.convert(this.placesServices.userLocation),
      popUp: popup,
      map: map
    }

    this.mapService.setMarket( marker );
  }

}
