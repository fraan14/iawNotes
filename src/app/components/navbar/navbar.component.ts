import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
import { UserInterface } from 'src/app/models/user';
import { card } from 'src/app/interfaces/card.interface';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

@Output() nuevoGrupo: EventEmitter<string>  = new EventEmitter<string>();
 
  opened = false;
  public app_name: string = 'notes-iaw';
  public isLogged: boolean = null;
  public email:string = "";
  public hayGrupo:boolean = false;
  public nombre: string;
  public nombreGrupoSeleccionado = "Seleccione Grupo"
  public grupos: GrupInterface[];
  public userid: string;
  color = 'accent';
  checked = false;
  disabled = false;



  constructor(private loginDialog:MatDialog, 
    private authService: AuthService,
    private afsAuth: AngularFireAuth, 
    private das:DataApiService) {
     }



  ngOnInit() {
    this.getCurrentUser();
  }
  
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      // console.log("Se ejecuta el auth")
      if(auth){
        this.isLogged = true;
        this.nombre = auth.displayName;
        if(this.nombre == null){
          this.nombre = auth.email;
        }
        this.userid = auth.uid;
        this.getGroups(this.userid);
        let usrActual:UserInterface={
          email: this.email,
          nombre:this.nombre,
          id:this.userid,
          Grupos:null
        }
        this.das.usuarioActual = usrActual;
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
      // console.log("Grupo seleccionado: ", this.das.getCurrentGroup().nombreGrupo)
      let config:MatDialogConfig={
        width:'400px',
      }
      this.loginDialog.open(CreateNoteComponent,config);
    }
    else{
      // console.log("seleccione grupo");
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
      // console.log("Grupo seleccionado: ", this.das.getCurrentGroup().nombreGrupo)
      let config:MatDialogConfig={
        width:'400px',
      }
      this.loginDialog.open(AddToGroupComponent,config);
    }
    else{
      // console.log("seleccione grupo");
    }   
  }

  EliminarGrupoSeleccionado(){
    if(this.das.getCurrentGroup()!= null){

      this.das.deleteGroup(this.das.getCurrentGroup());

    }
    else{
      console.log("seleccione grupo");
    }  
  }

  onLogout(){
    this.das.grupoSeleccionado = null;
    this.hayGrupo = false;
    this.nombreGrupoSeleccionado="Seleccione Grupo"
    //this.das.updateGrupoSeleccionado(null)
    this.afsAuth.auth.signOut();
  }


  getGroups(uid:string){
    //console.log("al getGroups le llega: "+uid)
    this.das.getKnownGroups(uid).subscribe(res=>{
      let auxgp:GrupInterface[] = res;
      // console.log("Grupos del usuario ", res);
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


  async seleccionarGrupo(item: GrupInterface){
    this.das.grupoSeleccionado=item;
    this.nombreGrupoSeleccionado = item.nombreGrupo;
    // console.log("grupo seleccionado: " + item.nombreGrupo);
    this.das.updateGrupoSeleccionado(item);
    //let aux : card[] = await this.das.getAllNotesFromGroup()
    this.nuevoGrupo.emit(item.id);
    this.hayGrupo = true;
    //console.table(aux);


  }

  switchColor(color){
    // if(color.checked){
    //   document.getElementById("").classList.add
    // }
    // console.log("check: ",color);
    
  }


  abrir(){
    // console.log("holis");
    
  }


}
