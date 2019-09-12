import { Component, OnInit, Input } from '@angular/core';
import { isBoolean } from 'util';

@Component({
  selector: 'app-contenido-checklist',
  templateUrl: './contenido-checklist.component.html',
  styleUrls: ['./contenido-checklist.component.css']
})
export class ContenidoChecklistComponent implements OnInit {
@Input() texto;
public obj;
public inicializado: boolean = false;


  constructor() {
   }

  ngOnInit() {
    if(this.texto != null){
      this.obj = JSON.parse(this.texto);
      //console.log("obj",this.obj);
      //console.log(isBoolean(this.obj[0].check));
      
      this.inicializado = true;
    }
  }

  /**
   * cambiemos
   */
  public cambiemos(c:object) {
    //console.log(c);
    
  }
 
}
