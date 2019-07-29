import { User } from "./../../models/user";
import { AuthService } from "./../auth/auth";
import { HttpModule } from "@angular/http";
import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { BaseService } from "../base/base";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataSnapshot } from "@angular/fire/database/interfaces";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService extends BaseService {
  constructor(
    public http: HttpModule,
    public af: AngularFireDatabase,
    public auth: AuthService
  ) {
    super();
  }

  users: Observable<User[]>;
  currentUser: Promise<any>;
  user_id: string;

  create(user: User): Promise<any> {
    return this.af
      .object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromisseError);
  }

  getUsers() {
    return this.af
      .list("/users", ref => {
        return ref.orderByChild("name");
      })
      .valueChanges()
      .pipe(
        map(res => {
          return res.filter(user => {
            return user.uid !== this.user_id;
          });
        })
      );
  }

  userExists(username: string): Observable<boolean> {
    return this.af
      .list("/users", ref => {
        return ref.orderByChild("username").equalTo(username);
      })
      .valueChanges()
      .pipe(
        map(res => {
          return res.length > 0;
        })
      );
  }

  getUsersOnce(username: string): Promise<any> {
    return this.af.database
      .ref("/users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
  }
  listenAuthState(): void {
    this.auth.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.af.database
          .ref()
          .child(`users/${user.uid}`)
          .once("value", snap => {
            this.currentUser = snap.val();
          });
        this.user_id = user.uid;
      }
    });
  }
  getCurrentUser(): Promise<User> {
    this.listenAuthState();
    return this.currentUser;
  }
  getUserById(userId:string): Promise<any> {

    return this.af.database
    .ref()
    .child(`users/${userId}`)
    .once("value");
  }
}
