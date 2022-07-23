import { Route } from '@angular/router';
import { LandingPageComponent, PreSaleComponent } from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Route[] = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'pre-sale', component: PreSaleComponent, pathMatch: 'full' }
];
