import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { DataApiService } from '../../services/data-api.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginDialog:MatDialog, private authService: AuthService, private afsAuth: AngularFireAuth, private das:DataApiService) { }
  public app_name: string = 'notes-iaw';
  public isLogged: boolean = false;
  public hayGrupo:boolean = false;

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

  abrirVentanaCrearNota(){

    if(this.das.getCurrentGroup()!= null){
      console.log("Grupo seleccionado: ", this.das.getCurrentGroup().nombreGrupo)
      let config:MatDialogConfig={
        width:'400px',
      }
      this.loginDialog.open(CreateNoteComponent,config);
    }
    else{
      console.log("seleccione grupo");
    }

    
  }

  abrirVentanaCrearGrupo(){
    let config:MatDialogConfig={
      width:'700px'
    }
    this.loginDialog.open(CreateGroupComponent,config);
  }


  onLogout(){
    this.afsAuth.auth.signOut();
  }

}
