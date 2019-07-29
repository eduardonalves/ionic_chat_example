import { UserService } from './../../providers/user/user';
import { Observable } from 'rxjs';
import { AuthService } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { User } from "../../models/user";
import { AngularFireObject } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage {
  messages: string[] = [];
  currentUser: Observable<User[]>;
  pageTitle:string;
  sender:Promise<any>;
  recipient:User;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    this.sender = this.userService.getCurrentUser();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChatPage");
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.sender = this.userService.getCurrentUser();
   // console.log(this.sender);
  }
  ionViewCanEnter(): Promise<boolean> {
    return this.authService.autthenticated;
  }
  sendNewMessage(newMessage:string){
    this.messages.push(newMessage);
  }
}
