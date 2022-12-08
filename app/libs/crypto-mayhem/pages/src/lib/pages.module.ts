import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrandStrategyModule } from './grand-strategy/grand-strategy.module';
import { MainPageModule } from './main-page/main-page.module';
import { PreSaleModule } from './pre-sale/pre-sale.module';
import { MyAccountModule } from './my-account/my-account.module';
import { TopDownShooterModule } from './top-down-shooter/top-down-shooter.module';
import { DaoModule } from './dao/dao.module';
import { LauncherModule } from './launcher/launcher.module';

@NgModule({
  imports: [CommonModule],
  exports: [
    GrandStrategyModule,
    MainPageModule,
    PreSaleModule,
    MyAccountModule,
    TopDownShooterModule,
    DaoModule,
    LauncherModule
  ],
  declarations: [],
})
export class PagesModule {}
