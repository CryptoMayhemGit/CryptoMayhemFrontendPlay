import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cryptoMayhemShellRoutes } from './shell.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(cryptoMayhemShellRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class ShellModule {}
