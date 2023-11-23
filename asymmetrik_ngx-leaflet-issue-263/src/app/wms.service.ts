import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WmsService {

  API = 
  "http://localhost:8080/geoserver/TUN_adm_0/wms?service=WMS&version=1.1.0&request=GetMap&layers=TUN_adm_0%3Atun_adm1&bbox=7.53008%2C30.23681%2C11.59826%2C37.55986&width=426&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers";

  constructor(private httpClient : HttpClient) { }
  
  getLayer(API:any){
    return this.httpClient.get(this.API)
  }
}
