import { Injectable } from '@angular/core';

//en este servicio esta todo lo relacionado con el login y registro de usuarios

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUser(){ }
  loginEmailUser(){ }
  loginFacebookUser(){ }
  loginGoogleUser(){ }
  logoutUser(){ }

}
