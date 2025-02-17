import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class PlacesApiClient extends HttpClient{

  constructor( handler: HttpHandler ){
    super(handler);
  }

  public override get<T>( url: string, options: {
    params?: HttpParams | {
                [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  } ){
    return super.get<T>( url, {
      params: {
        limit: 4,
        language: 'es',
        access_token: environments.MAPBOX_KEY,
        ...options.params
      }
    })
  }
}
