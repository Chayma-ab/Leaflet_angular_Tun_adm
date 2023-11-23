import { Component } from '@angular/core';
import { LatLngBounds, LayerGroup, layerGroup, tileLayer, latLng  } from 'leaflet';
import { WmsService } from './wms.service';
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";
import { Map , GeoJSON, Icon, icon, Marker, marker  } from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public options: any;
  // public Layer : any;
  // public fitBounds: LatLngBounds;
  // public layerLegend: any
  // map : L.Map;
 
  // json;


  constructor(private http: HttpClient) {}


  ngOnInit() {
		let map: L.Map;
		let geojson: L.GeoJSON;

		map = L.map("map").setView([35.726909 , 9.879966], 8);


	
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			id: "mapbox.light",
			attribution: "SOS"
		}).addTo(map);



		let icon = {
			icon: L.icon({
			  iconSize: [ 25, 41 ],
			  iconAnchor: [ 13, 0 ],
			  // specify the path here
			  iconUrl: 'node_modules/leaflet/dist/images/marker-icon.png',
			  shadowUrl: 'node_modules/leaflet/dist/images/marker-shadow.png'
		   })
		};
		const marker = L.marker([51.5, -0.09], icon).addTo(map);


        // L.tileLayer.wms('http://localhost:8080/geoserver/wms?', {
        // layers: '	TUN_adm_0:tun_adm1',}).addTo(map)

		let info;

		info = new L.Control();

		info.onAdd = function () {
			this._div = L.DomUtil.create("div", "info");
			this.update();
			return this._div;
		};

		info.update = function (props: any) {
			this._div.innerHTML =
				"<h4>TUNSIA_adm</h4>" +
				(props ? "<b>" + props.NAME_1 + "</b><br />" : "");
		};

		info.addTo(map);

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function highlightFeature(e) {
			const layer = e.target;

			layer.setStyle({
				weight: 5,
				color: "#666",
				dashArray: "",
				fillOpacity: 0.2
			});

			if (!L.Browser.ie && !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		this.http.get("assets/TUN.json").subscribe((json: any) => {
			geojson = L.geoJSON(json, {
				style: function (feature) {
					switch (feature.properties.ID_1) {
						case 1:
							return {
								color: "white",
								fillColor: "red",
								fillOpacity: 0.1
							};
						case 14:
							return {
								color: "white",
								fillColor: "yellow",
								fillOpacity: 0.1
							};
						case 3:
							return {
								color: "white",
								fillColor: "orange",
								fillOpacity: 0.1
							};
						case 23:
							return {
								color: "white",
								fillColor: "green",
								fillOpacity: 0.1
							};
						
					}
				},
				onEachFeature: function onEachFeature(feature, layer: L.Layer) {
					layer.on({
						mouseover: highlightFeature,
						mouseout: resetHighlight,
						click: zoomToFeature
					});
				}
			}).addTo(map);
		});
	}
	icon(arg0: [number, number], icon: any) {
		throw new Error('Method not implemented.');
	}
}



  
  

  // options = {
  //   layers: [
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 18
  //     }),
      
  //   ],
  //   zoom: 7,
  //   center: latLng( 31.726909 , 9.879966 ),
  //   fitBounds: this.fitBounds
  // };

  // options = {
  //   layers: [
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //          maxZoom: 18
  //   }),
    
  //     L.tileLayer.wms('http://localhost:8080/geoserver/wms?', {
  //       layers: '	TUN_adm_0:tun_adm1',
        


  // }),
      
  //   ],
  //   zoom: 7,
  //   center: latLng( 31.726909 , 9.879966 ),
  //   fitBounds: this.fitBounds
  // };


 
  
  
  
  //   constructor(private wmsService : WmsService , private http: HttpClient ) {}

  //   info.onAdd = function () {
	// 		this._div = L.DomUtil.create("div", "info");
	// 		this.update();
	// 		return this._div;
	// 	};

  //   onMapReady(map) {
  //     this.http.get("assets/departements.json").subscribe((json: any) => {
  //       console.log(json);
  //       this.json = json;
  //         L.geoJSON(this.json).addTo(map);
             
   
  //    });
  //  }

 












  
    // onMapReady(map) {
    //   this.http.get("assets/departements.json").subscribe((json: any) => {
    //     console.log(json);
    //     this.json = json;
    //       L.geoJSON(this.json).addTo(map);
        //       L.tileLayer.wms('https://ows.mundialis.de/services/service?', {
        //       layers: 'OSM-Overlay-WMS'
        // }).addTo(map);
  
      //  Import the WMS Layer
        // L.tileLayer
        //   .wms(
        //     "http://188.166.63.249/thredds/wms/grib/SINDBAD-FAT?service=WMS&version=1.3.0&request=GetCapabilities",
        //     {
        //       layers: "SINDBAD-FAT.ncx3#LambertConformal_269X459-40p04N-14p06E"
        //     }
        //   )
        //   .addTo(map);
    //  });
  //  }

     
      //"http://localhost:8080/geoserver/TUN_adm_0/wms?service=WMS&version=1.1.0&request=GetMap&layers=TUN_adm_0%3Atun_adm1&bbox=7.53008%2C30.23681%2C11.59826%2C37.55986&width=426&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers";
      

   

   
  
  

