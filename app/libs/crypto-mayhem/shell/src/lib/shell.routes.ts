import { Routes } from '@angular/router';
import { LandingPageComponent, PreSaleComponent } from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full', },
  { path: 'pre-sale', component: PreSaleComponent, pathMatch: 'full' }
];
