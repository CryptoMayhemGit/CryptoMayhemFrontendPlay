import { Component } from '@angular/core';

@Component({
  selector: 'crypto-mayhem',
  template: `
    <ui-nav></ui-nav>
    <router-outlet></router-outlet>
    <cm-notification></cm-notification>
  `,
})
export class AppComponent {}
