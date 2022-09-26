import { Routes } from '@angular/router';
import { GrandStrategyComponent, MainPageComponent, MyAccountComponent, PreSaleComponent } from '@crypto-mayhem-frontend/crypto-mayhem/pages';
import { LanguageGuard } from './guards/language.guard';

export const cryptoMayhemShellRoutes: Routes = [
  {
    path: ':lang',
    canActivate: [LanguageGuard],

    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
      { path: 'game', component: GrandStrategyComponent, pathMatch: 'full' },
      { path: 'account', component: MyAccountComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: MainPageComponent },
];
