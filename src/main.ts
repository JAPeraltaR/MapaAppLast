import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl';
import { environments } from './app/environments/environments';

if(!navigator.geolocation){
  alert('Navegador no soporta Geolocation');
  throw new Error('Navegador no soporta Geolocation');
}

Mapboxgl.accessToken = environments.MAPBOX_KEY;

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
