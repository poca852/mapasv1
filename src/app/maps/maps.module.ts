import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = environment.MAPBOX

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { environment } from '../../environments/environment';
import { ZoomPageComponent } from './pages/zoo-page/zoom-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';


@NgModule({
  declarations: [
    SideMenuComponent,
    MapsLayoutComponent,
    ZoomPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    MiniMapComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
