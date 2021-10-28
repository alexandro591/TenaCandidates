import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TenaCandidates';
  window: any = window;
  localhost() {
    window.open('https://devlocalhost.com');
  }
}
