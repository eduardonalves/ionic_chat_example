import { map } from "rxjs/operators";
import { AuthService } from "./../auth/auth";
import { Observable } from "rxjs";
import { Chat } from "./../../models/chatModel";
import { HttpModule } from "@angular/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../base/base";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";

/*
  Generated class for the ChatService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatService extends BaseService {
  chats: Observable<any>;
  constructor(
    public http: HttpModule,
    public af: AngularFireDatabase,
    public auth: AuthService
  ) {
    super();
    this.setChats();

    //console.log("Hello ChatService Provider");
  }


  private setChats(): void {
    this.auth.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        console.log();

        this.chats = this.af
          .list(`chats/${user.uid}`, ref => {
            return ref.orderByChild("timestamp");
          })
          .valueChanges()
          .pipe(
            map(resp => {
              return resp.reverse();
            })
          );

      }
    });
  }
  create(chat: Chat, userid1: string, userid2: string): Promise<void> {
    return this.af
      .object(`/chats/${userid1}/${userid2}`)
      .set(chat)
      .catch(this.handlePromisseError);
  }
  getDeepChat(userid1: string, userid2: string): AngularFireObject<Chat> {
    return <AngularFireObject<Chat>>(
      this.af.object(`/chats/${userid1}/${userid2}`)
    );
  }
}
