import { HttpModule } from "@angular/http";
import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { BaseService } from "../base/base";
import { resolve } from "url";
import { rejects } from "assert";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService extends BaseService{
  constructor(public http: HttpModule, public afAuth: AngularFireAuth) {
    super();
    console.log("Hello AuthService Provider");
  }
  createAuthUser(user: { email: string; password: string }): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    ).catch(this.handlePromisseError);
  }
  signInWithEmailAndPassword(user: {email: string, password:string}): Promise<boolean>{
   return  this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((response) => {
     console.log(response);
      return response != null;
    });
  }
  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  get autthenticated(): Promise<boolean>{
    return new Promise ((resolve, reject) =>{
        this.afAuth.auth.onAuthStateChanged(user =>{
          user ? resolve(true) : reject(false);
        });
    });
  }
}
