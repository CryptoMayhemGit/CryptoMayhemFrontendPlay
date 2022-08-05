import { Routes } from '@angular/router';
import {
  MainPageComponent,
  PreSaleComponent,
} from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
  { path: '**', component: MainPageComponent },
];
