import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda-modal',
  templateUrl: './busqueda-modal.component.html',
  styleUrls: ['./busqueda-modal.component.scss']
})
export class BusquedaModalComponent implements OnInit {

  lista_amigos:string[];
  lista_contactos:string[];

  emailFormControl: FormControl;


  constructor() {
    this.emailFormControl = new FormControl('',[Validators.required, Validators.email]);
   }

  ngOnInit() {
    this.llenarListaAmigos();
    this.llenarListaContactos();
  }


  llenarListaContactos() {
    this.lista_contactos = ["Juan Perez", "Jose Romualdo", "Romina Perez", "Homero Simpsons"];
  }
  llenarListaAmigos() {
    this.lista_amigos = ["Juampi Coutinho", "Pame Bonfiglio", "Karen Reddel"];
  }

  eliminar(i:number){
    // TODO:Conectar con la base de datos.
    this.lista_amigos.splice(i,1);
  }

  // TODO: Habria que ver la posibilidad de ver la funcionalidad.. si usar alguna ed transitoria y cuando le das aceptar o cancelar aplicar los cambios
  insertar(){

  }

  agregarContacto(){
    if(this.emailFormControl.valid){
      console.log(this.emailFormControl.value);
      this.lista_amigos.push(this.emailFormControl.value);
      this.emailFormControl.setValue("");
    }
    
  }
}

