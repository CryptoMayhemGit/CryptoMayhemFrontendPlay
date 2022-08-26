import { Routes } from '@angular/router';
import {
  MainPageComponent,
  PreSaleComponent,
} from '@crypto-mayhem-frontend/ui';
import { GrandStrategyComponent } from 'libs/ui/src/lib/grand-strategy/grand-strategy.component';
import { LanguageGuard } from './guards/language.guard';

export const cryptoMayhemShellRoutes: Routes = [
  {
    path: ':lang',
    canActivate: [LanguageGuard],

    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
      //{ path: 'game', component: GrandStrategyComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: MainPageComponent },
];
