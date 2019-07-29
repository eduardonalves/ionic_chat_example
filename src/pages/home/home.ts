import { AuthService } from "./../../providers/auth/auth";
import { ChatService } from "./../../providers/chat/chat";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { SignupPage } from "./../signup/signup";
import { Observable } from "rxjs";
import { UserService } from "../../providers/user/user";
import { User } from "../../models/user";
import { ChatPage } from "../chat/chat";
import { Chat } from "../../models/chatModel";
import firebase from "firebase";
import { log } from "util";
import { DataSnapshot } from "@angular/fire/database/interfaces";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  users: Observable<any[]>;
  view: string = "chats";
  chats: Observable<Chat[]>;

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public chatService: ChatService
  ) {}
  ionViewDidLoad() {
    this.users = this.userService.getUsers();
    this.userService.listenAuthState();
    this.chats = this.chatService.chats;
    console.log(this.chats);

  }
  ionViewCanEnter(): Promise<boolean> {
    return this.authService.autthenticated;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser: User): void {
    let currentUser = this.userService.getCurrentUser();
    this.chatService
      .getDeepChat(currentUser.uid, recipientUser.uid)
      .query.once("value", chat => {
        if (chat.val() == null) {
          let timestamp = firebase.database.ServerValue.TIMESTAMP;
          let chat1 = new Chat("", timestamp, recipientUser.name, "", recipientUser.uid);
          this.chatService.create(chat1, currentUser.uid, recipientUser.uid);
          let chat2 = new Chat("", timestamp, currentUser.name, "", currentUser.uid);
          this.chatService.create(chat2, recipientUser.uid, currentUser.uid);
        }
      });

    this.navCtrl.push(ChatPage, { recipientUser: recipientUser });
  }

  onChatOpen(chat:Chat): void{

    let recipientUserId: string = chat.user_id;
    let userData: Promise<any> = this.userService.getUserById(recipientUserId).then(
      user => {
        if(user.val() != null){
          this.navCtrl.push(ChatPage, {
            recipientUser: user.val()
          });
        }

      }
    );
   // console.log(userData);
  }
}
