import { Component, OnInit } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { MatDialog } from '@angular/material';
import { DataApiService } from 'src/app/services/data-api.service';
import { GrupInterface } from 'src/app/models/grupo';
import { async } from '@angular/core/testing';
import { NullTemplateVisitor } from '@angular/compiler';



@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  borrarDefinitivo = false;
  cards : card[] = [];
  cards2: string[] = [];
  btn_activo:boolean = false;
  card_eliminada: card = null;

  constructor(
    public dialog: MatDialog,
    private das: DataApiService
  ) { 
    
  }

  // Espero a que me pasen una card a eliminar
  private borrarCard(e:card) {
    this.borrarDefinitivo = true;
    setTimeout( ()=>{
      this.accionBorrarDefinitiva(e)
    }, 3000 );
    

  }

  accionBorrarDefinitiva(e){
    if(this.borrarDefinitivo){
      this.das.deleteNote(e.id);
    }
  }

  private deshacerBorrarCard(e) {
    this.borrarDefinitivo = false;
  }


  public crearCard(tipo_aux:string){
    let nuevaCard: card; 
    nuevaCard = {
      texto : "",
      titulo : "",
      img: "",
      tipo: tipo_aux
    }
    if(tipo_aux == 'check_list'){
      nuevaCard.texto = "[]";
    }
    let dialogRef = this.dialog.open(CardModalComponent, {
      data: {card: nuevaCard,  tipo:'nuevo'}
    });

    dialogRef.afterClosed().subscribe(res => {
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
    });
   
  }

  checkForId(unId:string){
    if(this.cards2 != null)
      return this.cards2.includes(unId);
    else
      return false;
  }

  hayGrupoSeleccionado():boolean{
    return this.das.getCurrentGroup()!=null;
  }


  lasNotasQueHay(){
    this.das.getNotes().subscribe(res=>{
      this.cards=[]
      let auxCard:card[] = res;
      this.cards = auxCard; 
      //console.log("notas de la DB ", res);
     
    });
  }
  

  activo(){
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
    if(this.das.getCurrentGroup() != null){
      this.cards = await this.das.getAllNotesFromGroup();
    }
    return this.cards;
  }
}
