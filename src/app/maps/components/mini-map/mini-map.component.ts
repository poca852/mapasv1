import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 150px;
      margin: 0;
    }
  `
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number]; 
  @ViewChild('map') divMap: ElementRef; 

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'div not found';
    if(!this.lngLat) throw 'lngLat es obligatorio'

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    })

    new Marker({
      draggable: false,
    })
      .setLngLat(this.lngLat)
      .addTo(map)
  }



}
