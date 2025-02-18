import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environments } from './app/environments/environments';

export declare var mapboxgl: typeof import('mapbox-gl');

if(!navigator.geolocation){
  alert('Navegador no soporta Geolocation');
  throw new Error('Navegador no soporta Geolocation');
}

mapboxgl.accessToken = environments.MAPBOX_KEY;

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
