import { BaseComponent } from './../base/base';
import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';

/**
 * Generated class for the CustomLoggedHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;

  constructor(
    public alertCtrl:AlertController,
    public authService:AuthService,
    public app: App,
    public menuCtrl:MenuController) {
    super(
      alertCtrl,
      authService,
      app,
      menuCtrl
      );
  }

}
