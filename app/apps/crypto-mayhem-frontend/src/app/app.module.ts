import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TranslocoRootModule } from './transloco-root.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {
  NavigationHeaderModule,
  NotificationsModule,
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
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

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
    NavigationHeaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationsModule,
    ApolloModule
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
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.cyberconnect.dev/',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
