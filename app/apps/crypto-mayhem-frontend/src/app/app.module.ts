import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {
  NavigationHeaderModule,
  NotificationsModule,
  VestingModule,
  WalletChoiceModule,
} from '@crypto-mayhem-frontend/ui';
import { AuthInterceptor } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/interceptors';
import { APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { ShellModule } from '@crypto-mayhem-frontend/crypto-mayhem/shell';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetaproQrModule } from 'libs/ui/src/lib/metapro-qr/metapro-qr.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShellModule,
    TranslocoRootModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    WalletChoiceModule,
    VestingModule,
    NavigationHeaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationsModule,
    MetaproQrModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: ErrorService,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_CONFIG,
      useValue: environment,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
