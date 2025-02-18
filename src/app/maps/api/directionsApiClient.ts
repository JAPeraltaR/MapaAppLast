import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: 'root',
})

export class DirectionsApiClient extends HttpClient{

  baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving'

  constructor( handler: HttpHandler ){
    super(handler);
  }

  public override get<T>( url: string ){
    url = this.baseURL + url;
    return super.get<T>( url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: environments.DEFAULT_KEY
      }
    })

  }
}
