import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
const firebaseConfig = {
  apiKey: "AIzaSyB7HwSLdcodR2pVmn6Ut-BvfX4bD3_7SWQ",
  authDomain: "clima-app-1997.firebaseapp.com",
  projectId: "clima-app-1997",
  storageBucket: "clima-app-1997.appspot.com",
  messagingSenderId: "654000265003",
  appId: "1:654000265003:web:1ac1f22d7fa6c89e72d76e",
  measurementId: "G-ND18RM8PVT"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
