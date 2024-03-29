import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { Apollo } from 'apollo-angular';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { GraphqlService } from './services/graphql.service';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoaderService } from './services/loader.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './auth/auth.utils';
import { environment } from '../environments/environment.dev';
import { HomeComponent } from './pages/home/home.component';
import { MessageService } from './services/message.service';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    ThemeSelectorComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.getApiDomain(), ],
        disallowedRoutes: [environment.getApiDomain() + "/auth/login"]
      },
    }),

  ],
  providers: [Apollo, ApiService, GraphqlService, AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
