import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { BusquedaModalComponent } from '../modals/busqueda-modal/busqueda-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card:card;
  @Input() id: number;

  @Output() borrarCard: EventEmitter<number>;
  @Output() deshacerBorrarCard: EventEmitter<card>;

  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.borrarCard = new EventEmitter();  
    this.deshacerBorrarCard = new EventEmitter();
  }
  
  ngOnInit() {
  }
  
  
  //Accion de borrar crea un SnackBar para deshacer los cambios
  borrar(){
    let copiaDelCard = this.card;
    let snackBar_borrar = this._snackBar.open("Se eliminó la tarjeta ", 'deshacer',{panelClass:"sucess", verticalPosition: "bottom",   duration: 5000});
    snackBar_borrar.afterDismissed().subscribe(data => {
      if(data.dismissedByAction)
        this.deshacerBorrarCard.emit(copiaDelCard);
    });
    this.borrarCard.emit(this.id);
  }

  editar(){
    console.log("Editar");
    let dialogRef = this.dialog.open(CardModalComponent, {
      data: {card: this.card}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log("se cerro el modal: ", res);
    });


  }

  compartir(){
    let dialog = this.dialog.open(BusquedaModalComponent, {
      data: {card: this.card }
    });

    dialog.afterClosed().subscribe(res => {
      console.log("Se cerro la busqueda", res);
      
    });
  }

  masOpciones(){
    
  }
  
  aGuardar(event){
    console.log(event);
    
  }
  
}
