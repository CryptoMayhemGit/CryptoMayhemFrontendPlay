import { Routes } from '@angular/router';
import {
  LandingPageComponent,
  PreSaleComponent,
} from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Routes = [
  { path: '', redirectTo: '/presale', pathMatch: 'full' },
  { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
  { path: '**', component: LandingPageComponent },
];
