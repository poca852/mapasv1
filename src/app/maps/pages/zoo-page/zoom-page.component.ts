import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'

@Component({
   selector: 'zoom-page',
   templateUrl: './zoom-page.component.html',
   styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

   @ViewChild('map')
   public divMap: ElementRef;

   public zoom: number = 10;
   public map?: Map;
   public lngLat: LngLat = new LngLat(-48.0708357, -15.8768281)

   constructor() { }

   ngOnDestroy(): void {
      this.map.remove()
   }

   ngAfterViewInit(): void {
      this.map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: this.lngLat, // starting position [lng, lat]
         zoom: this.zoom, // starting zoom
      });

      this.mapListeners();
   }

   mapListeners() {
      if(!this.map) throw 'Mapa no inicializado';

      this.map.on('zoom', (ev) => {
         this.zoom = this.map.getZoom();
      })

      this.map.on('zoomend', (ev) => {
         if( this.map.getZoom() <= 18 ) return;

         this.map.zoomTo(18);
      })

      this.map.on('move', () => {
         this.lngLat = this.map.getCenter();
      })
   }

   zoomIn() {
      this.map.zoomIn();
   }

   zoomOut() {
      this.map.zoomOut();
   }

   zoomChange(value: string) {
      this.zoom = Number(value);
      this.map.zoomTo(this.zoom)
   }

}
