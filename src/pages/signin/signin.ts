
import { Component } from "@angular/core";
import { HomePage } from './../home/home';
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SignupPage } from "../signup/signup";
import { AuthService } from "../../providers/auth/auth";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {
  signinForm: FormGroup;



  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.signinForm = this.formBuilder.group({
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
  }
  onSubmit(): void {
    let loading: Loading = this.showLoading();

    this.authService.signInWithEmailAndPassword(this.signinForm.value).then(
      (isLogged:boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }
    ).catch((error) => {
      console.log(error);
      this.showAlert(error);
    });

  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage).then(canAccess => {
      canAccess ? console.log('Autorizado', canAccess) : this.showAlert('User not allowed!');
    });
  }
  onLogout(): void {
    this.authService.logout();
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
