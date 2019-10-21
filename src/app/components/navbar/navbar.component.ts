import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { DataApiService } from '../../services/data-api.service';
import { AddToGroupComponent } from '../add-to-group/add-to-group.component';
import { GrupInterface } from 'src/app/models/grupo';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginDialog:MatDialog, private authService: AuthService, private afsAuth: AngularFireAuth, private das:DataApiService) { }
  public app_name: string = 'notes-iaw';
  public isLogged: boolean = null;
  public hayGrupo:boolean = false;
  public nombre: String;
  public grupos: GrupInterface[];
  public userid: string;

  ngOnInit() {
    this.getCurrentUser();
  }
  
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.isLogged = true;
        this.nombre = auth.displayName;
        this.userid = auth.uid;
        this.getGroups(this.userid);
      }
      else{
        this.isLogged = false;
      }
    });
  } 

  inicializado(){
    return this.isLogged != null;
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

  abrirVentanaAgregarPersonaGrupo(){
    if(this.das.getCurrentGroup()!= null){
      console.log("Grupo seleccionado: ", this.das.getCurrentGroup().nombreGrupo)
      let config:MatDialogConfig={
        width:'400px',
      }
      this.loginDialog.open(AddToGroupComponent,config);
    }
    else{
      console.log("seleccione grupo");
    }   
  }


  onLogout(){
    this.afsAuth.auth.signOut();
  }


  getGroups(uid:string){
    this.das.getKnownGroups(uid).subscribe(res=>{
      let auxgp:GrupInterface[] = res;
      console.log("res ", res);
      
       this.grupos = res;
      let i = 0;
      auxgp.forEach(element => {
                if(element.usuarioiD.includes(uid)){
                  // this.grupos
                }
                else{
                }
                i= i+1;
      });
    });
  }


  seleccionarGrupo(item: GrupInterface){
    this.das.grupoSeleccionado=item;
    console.log("grupo seleccionado: " + item.nombreGrupo)
  }



}
