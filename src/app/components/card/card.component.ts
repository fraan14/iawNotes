import { Component, OnInit, Input } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { MatDialog } from '@angular/material';
import { MensajeConfirmacionComponent } from '../mensajes/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card:card;

  constructor(public dialog: MatDialog) {
    //   this.card = {
    //   id: 123,
    //   texto: '[  {"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]',
    //   color: "rojo",
    //   titulo: "El titulo mas largo delasd nknajk ldsjkl djklj ldasj dkla ",
    //   img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    //   tipo: 2,
    //   label: ["hola", "como", "andas"]
    // }
   }

  ngOnInit() {

    // console.log( JSON.parse('[  {"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]'));
    //console.log( JSON.parse('[  {"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]'));
  }
  borrar(){
    console.log("me borran");
    let dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      height: '145px',
      width: '220px',
    });
  }
  masOpciones(){
    
  }

  aGuardar(event){
    console.log(event);
    
  }

}
