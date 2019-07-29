import { SigninPage } from './../../pages/signin/signin';
import { AuthService } from './../../providers/auth/auth';
import { AlertController, App, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the BaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'base',
  templateUrl: 'base.html'
})
export class BaseComponent implements OnInit {

  text: string;
  protected navCtrl: NavController;

  constructor(
    public alertCtrl:AlertController,
    public authService:AuthService,
    public app: App,
    public menuCtrl:MenuController
  ) {
    console.log('Hello BaseComponent Component');
    this.text = 'Hello World';
  }
  ngOnInit():void {
    this.navCtrl = this.app.getActiveNav();
  }
  onLogout(): void {
    this.alertCtrl.create({
      message:'Do you want to quit?',
      buttons: [
        {
          text:'Yes',
          handler: () => {
            this.authService.logout().then(() => {
              this.navCtrl.setRoot(SigninPage);
            })
          }
        },{
          text:'No'
        }
    ]
    }).present();
  }
}
