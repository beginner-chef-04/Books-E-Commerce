import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AlertsModule } from 'angular-alert-module';
import { SpecialEventsUploadComponent } from './special-events-upload/special-events-upload.component';
import { SpecialEventsViewProfileComponent } from './special-events-view-profile/special-events-view-profile.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShareLogininfoService } from './share-logininfo.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    SpecialEventsUploadComponent,
    SpecialEventsViewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AlertsModule.forRoot()
  ],
  providers: [AuthService, AuthGuard,ShareLogininfoService, EventService, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
