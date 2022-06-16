import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule,  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/root/app.component';

import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';
import { getAppConfigProvider } from '../../../../libs/crypto-mayhem/config/src';
import { ErrorService } from '../../../../libs/crypto-mayhem/data-access/cm-services/src';
import { NavbarModule, NotificationModule } from '../../../../libs/ui/src';
import { AuthInterceptor } from '../../../../libs/crypto-mayhem/data-access/interceptors/src';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslocoRootModule,
    NotificationModule,
    NavbarModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    getAppConfigProvider(environment),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
