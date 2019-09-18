import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isBoolean } from 'util';

@Component({
  selector: 'app-contenido-checklist',
  templateUrl: './contenido-checklist.component.html',
  styleUrls: ['./contenido-checklist.component.css']
})
export class ContenidoChecklistComponent implements OnInit {
@Input() texto;
@Output() textoAGuardar;
public obj;
public inicializado: boolean = false;


  constructor() {
    this.textoAGuardar = new EventEmitter<string>();
   }

  ngOnInit() {
    if(this.texto != null){
      this.obj = JSON.parse(this.texto);
      this.inicializado = true;
    }
  }
  ngOnDestroy(): void {
    this.textoAGuardar.emit(JSON.stringify(this.obj));
  }

  /**
   * cambiemos
   */
  public modificacion(c:object) {
    this.obj= c;    
    // console.log("me modifique");
    
    this.textoAGuardar.emit(JSON.stringify(this.obj));

  }
 
}
