import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {auth} from 'firebase/app';

//en este servicio esta todo lo relacionado con el login y registro de usuarios

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth:AngularFireAuth) { }

  error_msg:string=""

  registerUser(email:string,pass:string){ 
    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email,pass).then(userData=>resolve(userData),
      err=> reject(err));
    });
  }
  loginEmailUser(email:string , pass:string){
    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.signInWithEmailAndPassword(email,pass).then(userData=>resolve(userData),
      err=> reject(err));
    });

   }
  loginFacebookUser(){ 
    return this.afsAuth.auth.signInWithPopup( new auth.FacebookAuthProvider()); 
  }
  loginGoogleUser(){ 
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()); 
  }
  logoutUser(){
    return this.afsAuth.auth.signOut();
  }
  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }

  errorProcessor(detail:string):string{
    switch(detail){
      case "The email address is badly formatted.":
        this.error_msg="el email ingresado es incorrecto";
        break;
      case "The password must be 6 characters long or more.":
        this.error_msg="La contraseña debe contener al menos 6 caracteres";
        break;
      case "The email address is already in use by another account.":
        this.error_msg="el email ingresado ya esta en uso";
        break;
      case "Password should be at least 6 characters":
        this.error_msg="La contraseña debe contener al menos 6 caracteres";
        break;
      case "The password is invalid or the user does not have a password.":
        this.error_msg="La contraseña es incorrecta. Intente nuevamente";
        break;
      default:
          this.error_msg=detail;
          break;
    }
    return this.error_msg;
  }
  
}
