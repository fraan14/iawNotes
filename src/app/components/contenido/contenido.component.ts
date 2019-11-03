import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  @Input() texto;
  @Input() tipo;
  @Output() contenido_texto;
  constructor() { 
    this.contenido_texto = new EventEmitter<string>();
  }
  
  ngOnInit() {
  }

  aGuardar(event){
    this.contenido_texto.emit(event);
  }
}
