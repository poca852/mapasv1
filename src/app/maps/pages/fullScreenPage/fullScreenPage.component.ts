import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Map } from 'mapbox-gl';

@Component({
   selector: 'full-screen-page',
   templateUrl: './fullScreenPage.component.html',
   styleUrls: ['./fullScreenPage.component.css'],
})
export class FullScreenPageComponent implements AfterViewInit {

   @ViewChild('map')
   public divMap: ElementRef;

   constructor() {}

   ngAfterViewInit(): void {
      const map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: [-48.0708357, -15.8768281], // starting position [lng, lat]
         zoom: 9, // starting zoom
      });
   }

}
