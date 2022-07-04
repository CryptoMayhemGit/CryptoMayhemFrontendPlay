import { Route } from '@angular/router';
import { LandingPageComponent } from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Route[] = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
];
