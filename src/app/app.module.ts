import { CapitalizePipe } from "./../pipe/capitalize";

import { AuthService } from "./../providers/auth/auth";

import { SigninPage } from "./../pages/signin/signin";
import { SignupPage } from "./../pages/signup/signup";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from "@angular/http";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { AngularFireModule, FirebaseAppConfig } from "angularfire2";
import { UserService } from "../providers/user/user";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { BaseService } from "../providers/base/base";
import { CustomLoggedHeaderComponent } from "../components/custom-logged-header/custom-logged-header";
import { ChatPage } from "../pages/chat/chat";
import { ChatService } from "../providers/chat/chat";

const firebaseAppconfig: FirebaseAppConfig = {
  apiKey: "my_ky",
  authDomain: "queco-18f4f.firebaseapp.com",
  databaseURL: "https://queco-18f4f.firebaseio.com",
  projectId: "my_id",
  storageBucket: "queco-18f4f.appspot.com",
  messagingSenderId: "My_sender_id",
  appId: "id"
};
@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    ChatPage,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ChatPage, HomePage, SignupPage, SigninPage],
  providers: [
    AuthService,
    BaseService,
    ChatService,
    StatusBar,
    SplashScreen,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
