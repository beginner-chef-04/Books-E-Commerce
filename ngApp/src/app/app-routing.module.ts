import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './auth.guard';
import { SpecialEventsUploadComponent } from './special-events-upload/special-events-upload.component';
import { SpecialEventsViewProfileComponent } from './special-events-view-profile/special-events-view-profile.component';
  
const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent 
  },
  {
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'special/upload',
    canActivate: [AuthGuard],
    component: SpecialEventsUploadComponent
  },
  {
    path: 'special/view-profile',
    canActivate: [AuthGuard],
    component: SpecialEventsViewProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
