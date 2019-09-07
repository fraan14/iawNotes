import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public card:card;

  constructor() {
      this.card = {
      id: 123,
      texto: '[  {"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]',
      color: "rojo",
      titulo: "Prueba 1",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      tipo: 2,
      label: ["hola", "como", "andas"]
    }
   }

  ngOnInit() {

    console.log( JSON.parse('[  {"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]'));
        
    
    
    

  }

}
