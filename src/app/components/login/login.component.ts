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
  public error_msg:string="";
  public isError:boolean=true;

  ngOnInit() {
  }

  inputValue='';
  AceptarLogin(){
    console.log('Email', this.email);
    console.log('Password', this.pass);
  }
  CancelarLogin(){
  }

  onLogin():void{
    this.authService.loginEmailUser(this.email,this.pass).then((res)=>{
      this.close()
    }).catch(err => {
      this.errorRised(err.message);
    });
  }

  onLoginGoogle():void{
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser().then((res)=>{
      this.close();
    }).catch(err=>{
      console.log('error',err.message); 
      this.errorRised(err.message);  //esto se ejecuta cuando sucede un error, aca tendria que evitar el cierre del popup y poner en rojo el problema
    })
  }
  onLoginFacebook(){
    //this.afAuth.auth.signInWithPopup( new auth.FacebookAuthProvider());  
    this.authService.loginFacebookUser().then((res)=>{
      this.close();
    }).catch(err=>{
      console.log('error',err.message);   //esto se ejecuta cuando sucede un error, aca tendria que evitar el cierre del popup y poner en rojo el problema
      this.errorRised(err.message);
    })
  }

  onLogout(){
    this.authService.logoutUser();
  }

  close() {
    this.dialogRef.close();
  }

  errorRised(detail:string){
    this.isError=true;
    this.error_msg=this.authService.errorProcessor(detail);
  }

}
