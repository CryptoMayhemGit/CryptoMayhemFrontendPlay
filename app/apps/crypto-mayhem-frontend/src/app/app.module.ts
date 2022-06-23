import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {
  NavbarModule,
  NavigationHeaderModule,
  NotificationModule,
} from '@crypto-mayhem-frontend/ui';
import { AuthInterceptor } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/interceptors';
import { ErrorService } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/cm-services';
import { getAppConfigProvider } from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { ShellModule } from '@crypto-mayhem-frontend/crypto-mayhem/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShellModule,
    TranslocoRootModule,
    NotificationModule,
    NavbarModule,
    NavigationHeaderModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    getAppConfigProvider(environment),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
