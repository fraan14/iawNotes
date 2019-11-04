import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { GrupInterface } from 'src/app/models/grupo';
import { UserInterface } from 'src/app/models/user';
import { card } from 'src/app/interfaces/card.interface';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-busqueda-modal',
  templateUrl: './busqueda-modal.component.html',
  styleUrls: ['./busqueda-modal.component.scss']
})
export class BusquedaModalComponent implements OnInit {

  lista_amigos:string[];
  lista_contactos:string[];
  grupos:GrupInterface[] = [];
  gruposAGuardar:GrupInterface[]=[]
  usuarioActual: UserInterface = null;
  emailFormControl: FormControl;

  Micard : card

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private das:DataApiService) {
    this.emailFormControl = new FormControl('',[Validators.required, Validators.email]);
    this.Micard = data.card;
   }

  ngOnInit() {
    this.usuarioActual = this.das.usuarioActual;
    this.getGroups(this.usuarioActual.id)
    //this.llenarListaAmigos();
    //this.llenarListaContactos();
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


  eliminar(i:number){
    // TODO:Conectar con la base de datos.
    this.lista_amigos.splice(i,1);
  }

  // TODO: Habria que ver la posibilidad de ver la funcionalidad.. si usar alguna ed transitoria y cuando le das aceptar o cancelar aplicar los cambios
  compartir(g:GrupInterface, index: number){
    console.log("Grupo a compartir",g);
    console.log("indice",index);
    
    
    if(this.gruposAGuardar.includes(g)){
      this.gruposAGuardar.slice(index,1);
    }
    else{
      this.gruposAGuardar.push(g);
    }
  }
  
  terminarCompartir(){
    this.gruposAGuardar.forEach(element => {
      element.notasID.push(this.Micard.id);
      this.das.UpdateGroup(element);
    });
  }
}

