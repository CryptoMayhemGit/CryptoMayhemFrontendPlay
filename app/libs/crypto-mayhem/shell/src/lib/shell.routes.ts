import { Routes } from '@angular/router';
import { DaoComponent, GrandStrategyComponent, LauncherComponent, MainPageComponent, MyAccountComponent, PreSaleComponent, TopDownShooterComponent } from '@crypto-mayhem-frontend/crypto-mayhem/pages';
import { LanguageGuard } from './guards/language.guard';
import { DaoResolver } from './resolvers/dao.resolver';
import { VestingComponent } from 'libs/ui/src/lib/vesting/vesting.component';

export const cryptoMayhemShellRoutes: Routes = [
  {
    path: ':lang',
    canActivate: [LanguageGuard],

    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'sale-seed-round', component: PreSaleComponent, pathMatch: 'full' },
      { path: 'gs', component: GrandStrategyComponent, pathMatch: 'full' },
      { path: 'account', component: MyAccountComponent, pathMatch: 'full' },
      { path: 'tds', component: TopDownShooterComponent, pathMatch: 'full' },
      { path: 'dao', component: DaoComponent, resolve: {
        dao: DaoResolver
      }, pathMatch: 'full' },
      { path: 'launcher', component: LauncherComponent, pathMatch: 'full' },
      { path: 'vesting', component: VestingComponent }
    ],
  },
  { path: '**', component: MainPageComponent },
];
