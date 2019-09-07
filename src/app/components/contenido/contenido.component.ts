import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  @Input() texto;
  @Input() tipo;
  constructor() { }

  ngOnInit() {
  }

}
