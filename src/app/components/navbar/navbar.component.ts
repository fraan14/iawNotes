import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginDialog:MatDialog, private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name: string = 'notes-iaw';
  public isLogged: boolean = false;


  ngOnInit() {
    this.getCurrentUser();
  }
  
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        //console.log('user logged');
        this.isLogged = true;
      }
      else{
        //console.log('no logged user');
        this.isLogged = false;
      }
    });
  }
  
  
  abrirVentanaLogueo(){
    let config:MatDialogConfig={
      width:'400px'
    }
    this.loginDialog.open(LoginComponent,config);
  }

  abrirVentanaRegistro(){
    let config:MatDialogConfig={
      width:'400px'
    }
    this.loginDialog.open(RegisterComponent,config);
  }

  onLogout(){
    this.afsAuth.auth.signOut();
  }

}
