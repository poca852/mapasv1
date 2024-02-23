import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  router: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styles: `
    li{
      cursor: pointer;
      transition: all 0.3s;
    }
  `
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { router: '/maps/fullscreen', name: 'FullScreen' },
    { router: '/maps/zoom-range', name: 'ZoomRange' },
    { router: '/maps/markers', name: 'Markers' },
    { router: '/maps/properties', name: 'Houses' },
  ]

}
