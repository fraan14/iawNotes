import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogRef} from '@angular/material'
import {auth} from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth, private dialogRef: MatDialogRef<LoginComponent>,private authService:AuthService) { }

  public email:string =""; //asd
  public pass:string="";

  ngOnInit() {
  }

  inputValue='';
  AceptarLogin(){
  }
  CancelarLogin(){
  }

  onLogin():void{
    this.authService.loginEmailUser(this.email,this.pass).then((res)=>{
      this.close()
    }).catch(err => console.log('err',err.message));
  }

  onLoginGoogle():void{
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser().then((res)=>{
      this.close();
    }).catch(err=>{
      console.log('error',err.message);   //esto se ejecuta cuando sucede un error, aca tendria que evitar el cierre del popup y poner en rojo el problema
    })
  }
  onLoginFacebook(){
    //this.afAuth.auth.signInWithPopup( new auth.FacebookAuthProvider());  
    this.authService.loginFacebookUser().then((res)=>{
      this.close();
    }).catch(err=>{
      console.log('error',err.message);   //esto se ejecuta cuando sucede un error, aca tendria que evitar el cierre del popup y poner en rojo el problema
    })
  }

  onLogout(){
    this.authService.logoutUser();
  }

  close() {
    this.dialogRef.close();
}

}
