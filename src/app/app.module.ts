import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './common/auth/auth.service';
import { AuthGuard } from './common/auth/auth.guard';
import { LoginComponent } from './common/auth/login.component';
import { TokenInterceptor } from './common/auth/token.interceptor';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventListComponent } from './events/list/event-list.component';
import { EventInfoComponent } from './events/info/event-info.component';
import { VenueInfoComponent } from './sessions/info/venue-info/venue-info.component';
import { SessionListComponent } from './sessions/list/session-list.component';
import { SessionInfoComponent } from './sessions/info/session-info.component';
import { ScheduleListComponent } from './schedule/list/schedule-list.component';
import { EditScheduleComponent } from './schedule/edit/edit-schedule.component';
import { EventPickerComponent } from './schedule/picker/event-picker.component';
import { ScheduleAddComponent } from './schedule/add/schedule-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    EventListComponent,
    EventInfoComponent,
    VenueInfoComponent,
    SessionListComponent,
    SessionInfoComponent,
    ScheduleListComponent,
    EditScheduleComponent,
    EventPickerComponent,
    ScheduleAddComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
