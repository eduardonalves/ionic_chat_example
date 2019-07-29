import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "./../../providers/user/user";
import { AuthService } from "./../../providers/auth/auth";
import { HomePage } from "../home/home";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.signupForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)
        ])
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {}

  onSubmit(): void {
    let loading: Loading = this.showLoading();

    let formUser = this.signupForm.value;
    let username: string = formUser.username;
    this.userService.getUsersOnce(username).then(resp => {
      if (resp.val() != null) {
        loading.dismiss();
        this.showAlert("User already exists.");
      } else {
        loading.dismiss();
        this.authService
          .createAuthUser({
            email: formUser.email,
            password: formUser.password
          })
          .then(resp => {
            //apaga o campo password de formUser
            delete formUser.password;

            formUser.uid = resp.user.uid;
            this.userService
              .create(formUser)
              .then(() => {
                loading.dismiss();
                this.navCtrl.setRoot(HomePage);
              })
              .catch((error: any) => {
                loading.dismiss();
                this.showAlert(error);
              });
          })
          .catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });
        /* */
      }
    });
  }
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    return loading;
  }
  private showAlert(message: string): void {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["ok"]
      })
      .present();
  }
}
