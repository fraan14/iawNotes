import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contenido-texto',
  templateUrl: './contenido-texto.component.html',
  styleUrls: ['./contenido-texto.component.css']
})
export class ContenidoTextoComponent implements OnInit {
  @Input() texto:string;
  constructor() { }

  ngOnInit() {
    console.log('contenido-texto',this.texto);
    
  }

}
