import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { MatDialog } from '@angular/material';
import { DataApiService } from 'src/app/services/data-api.service';
import { GrupInterface } from 'src/app/models/grupo';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  cards : card[] = [];
  cards2: string[] = [];
  btn_activo:boolean = false;

  constructor(
    public dialog: MatDialog,
    private das: DataApiService
  ) { 
    
  }

  // Espero a que me pasen una card a eliminar
  private borrarCard(e:string) {
    console.log("llego",e);
    this.das.deleteNote(e)
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
    //this._buescarNotas();
    this.changeGroup();
    this.lasNotasQueHay();
    
    //me suscribo al service y hago un get notes1}
    // this.cards = this.das.getNotes();
  }

  changeGroup(){
    this.das.grupoSeleccionado$.subscribe(res => {
      this.cards2 =[]
      this.cards2 =res.notasID

      
      console.log("ACAAAAAAAAA")
      console.log("NOTAS FINAL ",this.cards);
    });
   
  }

  checkForId(unId:string){
    if(this.cards2 != null)
      return this.cards2.includes(unId);
    else
      return false;
  }




  lasNotasQueHay(){
    this.das.getNotes().subscribe(res=>{
      this.cards=[]
      let auxCard:card[] = res;
      this.cards = auxCard; 
      console.log("notas de la DB ", res);
      // this.grupos = res;
      //let i = 0;
      // let gp:GrupInterface = this.das.getCurrentGroup()
      // auxCard.forEach(element => {
      //           if(gp.notasID.includes(element.id)){
      //             if(element != undefined){
      //               this.cards.push(element);
      //             }
      //           }
      //           else{
      //           }
      // });
    });
  }
  

  activo(){
    console.log("clickeo");
    
    if(this.btn_activo == false)
      this.btn_activo = true;
    else
      this.btn_activo = false;
  }

  seleccionarGrupo(){
  }


   hayGrupo(){
    //  this._buescarNotas();
    return this.das.getCurrentGroup() != null;
  }


  async _buescarNotas() {
    console.log("Fui a buscar las notas");
    
    if(this.das.getCurrentGroup() != null){
      this.cards = await this.das.getAllNotesFromGroup();
    }
    return this.cards;
  }
}
