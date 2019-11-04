import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user';
import { GrupInterface } from 'src/app/models/grupo';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddToGroupComponent>,public das:DataApiService) { }

  public suemail:string="";
  public usuariosDelGrupo:UserInterface[];
  public grupoActual:GrupInterface;
  public usrActual:UserInterface;
  public isAdmin:boolean;

  ngOnInit() {
    this.getUsuariosDelGrupo();
    this.usrActual = this.das.getCurrentUser();
    this.grupoActual = this.das.getCurrentGroup();
    this.isAdmin = (this.usrActual.id == this.grupoActual.AdminID);
  }

  async getUsuariosDelGrupo(){
    this.usuariosDelGrupo = new Array();
    this.grupoActual = this.das.getCurrentGroup();
    this.usrActual = this.das.getCurrentUser();
    let idstr:string;
    let usrAux:UserInterface;
    let i = 0;
    for(let usrid of this.grupoActual.usuarioiD){
      await this.das.getUsuarioPorId(usrid).then(function(res){
        usrAux = res;
      });
      this.usuariosDelGrupo[i]=usrAux;
      i+=1;
      
     
    }

    // console.log("Usuarios del grupo "+this.usuariosDelGrupo.length)



    //let idstr:string = gp.usuarioiD[0];
    //console.log("id del primer usuario "+idstr);
    //this.das.getUsuarioPorId(idstr);
  }

  async addIntegrante(){
    // aca lo que tengo que hacer es un metodo que me reciba el email del loco a añadir y me devuelva un success si todo piola o un error si el chabon no existe
    const grupo:GrupInterface = this.das.getCurrentGroup();
    let usr:UserInterface;
    await this.das.VerifyAndAddUser(this.suemail).then(function(usuario){
      usr = usuario
    });
    //verifico que el email provea un usuario registrado.
    if(usr){
      // console.log("El mail registrado es: "+usr.nombre);
      // console.log("El grupo seleccionado sigue siendo: "+grupo.nombreGrupo);

      //ahora tengo que actualizar el grupo con el id del usuario y el usuario con el id del nuevo grupo.
      //ahora tengo que actualizar el usuario con el email del grupo
      grupo.usuarioiD.push(usr.id);
      usr.Grupos.push(grupo.id);

      //console.log("Nuevo Usuario "+usr.Grupos);
      //console.log("nuevo grupo "+grupo.usuarioiD);
      this.das.UpdateGroup(grupo);
      this.das.updateUser(usr);

    }
    else{
      // console.log("no se ha detectado usuario registrado con el email provisto"); //aca deberia ser un modal que explique que el usuario indicado no esta registrado.
    }
  }

  isThisAdmin(l:UserInterface):boolean{
    return (this.isAdmin && (l.id != this.usrActual.id));
  }
  
  RemoverUsuarioDelGrupo(i){
    // console.log("el usuario a remover seria: "+this.usuariosDelGrupo[i].nombre);
    //en este punto ya tengo el grupo y el usuario, simplemente tengo que sacar el idUsuario de la lista del grupo y sacar el grupo de la lista de grupos del usuario y actualizar
    //el indice es el mismo porque lo obtengo iterativamente
    let usr:UserInterface = this.usuariosDelGrupo[i]  //oobtengo el usuario del arreglo de usuarios
    let j = 0;
    let index = 0;
    for(let gpid of usr.Grupos){     //obtengo el indice del id de este grupo en la lista de grupos del usuario
     if(gpid === this.grupoActual.id){
        index = j;
     }
     j+=1;
    }

    usr.Grupos.splice(index,1); //elimino el id del grupo de la lista de grupos del usuario
    this.usuariosDelGrupo[i] = usr;
    this.grupoActual.usuarioiD.splice(i,1); //elimino el id del usuario de la lista de usuarios del grupo actual.

    // console.log("Datos finales");
    // console.log(usr);
    // console.log(this.grupoActual);

    //llamar a actualizar del servicio
    //llamar a metodo actualizar de este modal "get usuarios del grupo"
    
    this.das.updateUser(usr);
    this.das.UpdateGroup(this.grupoActual);
    this.das.grupoSeleccionado = this.grupoActual;


  }



}
