import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule} from 'primeng/button';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { RouterModule, Routes} from '@angular/router'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserInfoComponent } from './user-info/user-info.component';
import { PrimaryPageComponent } from './primary-page/primary-page.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { CarouselModule } from 'primeng/carousel';
import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { HomePageComponent } from './home-page/home-page.component';
const appRoutes: Routes = [
  { path: 'app-login', component: LoginComponent, canActivate: [AuthGuard], },
  { path: 'app-signup-page', component: SignupPageComponent, canActivate: [AuthGuard], },
  { path: 'app-user-info', component: UserInfoComponent, canActivate: [AuthGuard], },
  { path: 'app-primary-page', component: PrimaryPageComponent, },
  { path: 'app-home-page', component: HomePageComponent, canActivate: [AuthGuard], }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginComponent,
    UserInfoComponent,
    PrimaryPageComponent,
    HomePageComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes),
      BrowserModule, AngularFirestoreModule, TabMenuModule,
      FormsModule, ButtonModule, PasswordModule, MenuModule,
      CarouselModule,
      AngularFireModule.initializeApp({
      apiKey: "AIzaSyAZ3008CP-UlIjm1zLwCdu_chl5W88kspE",
      authDomain: "welproject-80e93.firebaseapp.com",
      databaseURL: "https://welproject-80e93.firebaseio.com",
      projectId: "welproject-80e93",
      storageBucket: "welproject-80e93.appspot.com",
      messagingSenderId: "787777218268"})
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
