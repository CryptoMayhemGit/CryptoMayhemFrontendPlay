import { Routes } from '@angular/router';
import {
  LandingPageComponent,
  PreSaleComponent,
} from '@crypto-mayhem-frontend/ui';
import { GrandStrategyComponent } from 'libs/ui/src/lib/grand-strategy/grand-strategy.component';

export const cryptoMayhemShellRoutes: Routes = [
  { path: '', redirectTo: '/presale', pathMatch: 'full' },
  { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
  { path: 'game', component: GrandStrategyComponent, pathMatch: 'full' },
  { path: '**', component: LandingPageComponent },
];
