import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { MatDialog } from '@angular/material';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  cards : object[];
  btn_activo:boolean = false;

  constructor(
    public dialog: MatDialog,
    private das: DataApiService
  ) { 
    // let card_1 = {
    //   id: 123,
    //   texto: '[  {"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]',
    //   color: "rojo",
    //   titulo: "El titulo mas largo delasd nknajk ldsjkl djklj ldasj dkla ",
    //   img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
    //   tipo: 2,
    //   label: ["card", "prueba", "checkbox"]
    // }

    // let card_2 = {
    //   id: 124,
    //   texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor tristique condimentum. Fusce non mauris id nibh volutpat facilisis vel in sem. Nunc aliquet augue quis dui laoreet, sit amet aliquet velit ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi faucibus lobortis nulla, quis volutpat metus eleifend vitae. Nulla quis nisl enim. Nunc fringilla nulla in egestas dictum. Morbi consectetur nibh lorem, non tincidunt risus vestibulum non. Pellentesque varius vulputate sem sit amet convallis. Pellentesque blandit leo at dignissim ornare. Quisque ut eros enim.',
    //   color: "rojo",
    //   titulo: "Un titulo de prueba 2 ",
    //   img: "",
    //   tipo: 1,
    //   label: ["card", "prueba", "comun"]
    // }

    // let card_3 = {
    //   id: 124,
    //   texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor tristique condimentum. Fusce non mauris id nibh volutpat facilisis vel in sem. Nunc aliquet augue quis dui laoreet, sit amet aliquet velit ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi faucibus lobortis nulla, quis volutpat metus eleifend vitae. Nulla quis nisl enim. Nunc fringilla nulla in egestas dictum. Morbi consectetur nibh lorem, non tincidunt risus vestibulum non. Pellentesque varius vulputate sem sit amet convallis. Pellentesque blandit leo at dignissim ornare. Quisque ut eros enim.',
    //   color: "rojo",
    //   titulo: "Un titulo de prueba 2 ",
    //   img: "https://lh3.googleusercontent.com/YH6zn6nGGvf5g48KFRTsocF9jMmMVl00pcMrCF3mm43-0OAk3qt4DOUVo1Jnog5f7nv5cnPFpvTBoS7203rtc0amG5KfGPYtYf438H3Tl1M4SEzMEPaQ22oNOJK0E1UYHHcYfees7G-TQkww_XnjnAfiPaH631hv809hJRcf2qnWwb4y3gcVjk-5ks2TiFCKUQsX470K4ukP_pr9ezvhRRt2HssB--R8695sstKacAHgERC0yevYF49WO1Q8ZRuFzCEyE1GIrsyekdJbZpKdpNZIOBfI5Ntfyji2JMZ5yJi4mbfOYH59A7nj7vXHbd5RKdgHrW6Updsg_Gh6FKAUw2Pn4cku1khto7-Dcea6VifSSVZU0tfbciRKQod7-oKpzpv4Z5edAZmBI4sYdUxsPev8rZKrCosImAnDLlrL2Hc7ieLmmkor1dhHHOiB1tLQ7N9iE-m8J9vKDiA6Hut5iihNE6hUhqEhqT0klFntDNiq2nJFr4LlskY8dPrl2Yha1RC860ARrjfxV2lIthUGc6BLYl5lPB1FbMdv4vz6T02Srl45KcLigzb0dj5PkcCeemyX6IxZRnxGK-PI4jvX_x0vOFwsZ_FaiMHl3dbZYYPT7pizxzmipD8mZQysGCzHdhz4km7wTSEBHxCU-LTDFERFdGrz035ijpdFVyAi3d6a6nmM49Nm7GMY=w462-h615-no",
    //   tipo: 1,
    //   label: ["card", "prueba", "comun"]
    // }

    // this.cards = [card_1, card_2, card_3];

  }

  // Espero a que me pasen una card a eliminar
  private borrarCard(e:number) {
    console.log("llego",e);
  //  TODO:Falta la comunicacion con firebase para borrar 
  }

  private deshacerBorrarCard(e:card) {
    console.log("llego: ",e);
  //  TODO:Falta la comunicacion con firebase para re insertar la card 
  }


  public crearCard(tipo:string){
    let nuevaCard: card; 
    let tipo_aux: number = Number.parseInt(tipo);
    nuevaCard = {
      texto : "",
      titulo : "",
      img: "",
      tipo: tipo_aux
    }
    if(tipo_aux == 2){
      nuevaCard.texto = "[]";
    }
    let dialogRef = this.dialog.open(CardModalComponent, {
      data: {card: nuevaCard}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log("se cerro el modal: ", res);
      if(res != null){
        this.das.saveNote(res);
      }
    });
  }

  ngOnInit() {
    //me suscribo al service y hago un get notes1}
    this.cards = this.das.getNotes();
  }

  activo(){
    console.log("clickeo");
    
    if(this.btn_activo == false)
      this.btn_activo = true;
    else
      this.btn_activo = false;
  }

}
