import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
   color: string;
   marker: Marker;
}

interface PlainMarker {
   color: string;
   lngLat: number[];
};

@Component({
   selector: 'markers-page',
   templateUrl: './markers-page.component.html',
   styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {
   
   @ViewChild('map')
   public divMap: ElementRef;

   public markers: MarkerAndColor[] = [];

   public zoom: number = 13;
   public map?: Map;
   public lngLat: LngLat = new LngLat(-48.0708357, -15.8768281)

   constructor() { }

   ngAfterViewInit(): void {
      this.map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: this.lngLat, // starting position [lng, lat]
         zoom: this.zoom, // starting zoom
      });

      // const marker = new Marker()
      //    .setLngLat(this.lngLat)
      //    .addTo(this.map)
      this.readFromLocalStorage();
   }

   createMarker() {
      if(!this.map) return;

      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lngLat = this.map.getCenter();
      this.addMarker(lngLat, color)
   }

   addMarker(lngLat: LngLat, color: string = 'red') {
      if(!this.map) return;

      const marker = new Marker({
         color,
         draggable: true
      })
         .setLngLat(lngLat)
         .addTo(this.map)

      this.markers.push({
         color,
         marker
      });
      this.saveToLocalStorage();

      marker.on('dragend', () => this.saveToLocalStorage())
   }

   deleteMarker(index: number) {
      this.markers[index].marker.remove();
      this.markers.splice(index, 1);
      this.saveToLocalStorage();
   }

   flyTo(marker: Marker) {

      this.map.flyTo({
         zoom: 14,
         center: marker.getLngLat()
      })

   }

   saveToLocalStorage(){
      const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
         return{
            color,
            lngLat: marker.getLngLat().toArray()
         }
      })

      localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
   }

   readFromLocalStorage(){
      const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
      const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

      plainMarkers.forEach( ({color, lngLat}) => {
         const [lng, lat] = lngLat;
         const cords = new LngLat(lng, lat);
         this.addMarker(cords, color);
      })
   }

}
