import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './common/auth/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './common/auth/auth.guard';
import { EventListComponent } from './events/list/event-list.component';
import { EventInfoComponent } from './events/info/event-info.component';
import { AdminGuard } from './common/auth/admin.guard';
import { SessionInfoComponent } from './sessions/info/session-info.component';
import { TrainerGuard } from './common/auth/trainer.guard';
import { SessionListComponent } from './sessions/list/session-list.component';
import { VenueInfoComponent } from './sessions/info/venue-info/venue-info.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'events/:id', component: EventInfoComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'sessions/add', component: SessionInfoComponent, canActivate: [AuthGuard, TrainerGuard] },
  { path: 'sessions/:id', component: SessionInfoComponent, canActivate: [AuthGuard] },
  { path: 'sessions', component: SessionListComponent, canActivate: [AuthGuard] },
  { path: 'venues/:id', component: VenueInfoComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
