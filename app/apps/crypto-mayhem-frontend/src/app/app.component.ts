import { Component } from '@angular/core';

@Component({
  selector: 'crypto-mayhem-app',
  template: `
    <ui-nav></ui-nav>
    <router-outlet></router-outlet>
    <ui-notification></ui-notification>
  `,
})
export class AppComponent {}
