import { Routes } from '@angular/router';
import { CcProfileComponent, DaoComponent, GrandStrategyComponent, LauncherComponent, MainPageComponent, MyAccountComponent, PreSaleComponent, TopDownShooterComponent } from '@crypto-mayhem-frontend/crypto-mayhem/pages';
import { LanguageGuard } from './guards/language.guard';
import { DaoResolver } from './resolvers/dao.resolver';
import { VestingComponent } from 'libs/ui/src/lib/vesting/vesting.component';
import { StakingComponent } from '@crypto-mayhem-frontend/ui';

export const cryptoMayhemShellRoutes: Routes = [
  {
    path: ':lang',
    canActivate: [LanguageGuard],

    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'presale', component: PreSaleComponent, pathMatch: 'full' },
      { path: 'gs', component: GrandStrategyComponent, pathMatch: 'full' },
      { path: 'account', component: MyAccountComponent, pathMatch: 'full' },
      { path: 'tds', component: TopDownShooterComponent, pathMatch: 'full' },
      { path: 'dao', component: DaoComponent, resolve: {
        dao: DaoResolver
      }, pathMatch: 'full' },
      { path: 'launcher', component: LauncherComponent, pathMatch: 'full' },
      { path: 'ccprofile', component: CcProfileComponent, pathMatch: 'full'},
      { path: 'vesting', component: VestingComponent },
      { path: 'staking', component: StakingComponent }
    ],
  },
  { path: '**', component: MainPageComponent },
];
