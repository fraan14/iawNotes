import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { MatDialog, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { BusquedaModalComponent } from '../modals/busqueda-modal/busqueda-modal.component';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: card;
  @Input() id: number;
  
  @Output() borrarCard: EventEmitter<card>;
  @Output() deshacerBorrarCard: EventEmitter<card>;
  
  
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private DAS: DataApiService
    ) {
      this.borrarCard = new EventEmitter();  
      this.deshacerBorrarCard = new EventEmitter();
    }
    
    ngOnInit() {
      console.log('card:', this.card);
      
    }
    
    
    //Accion de borrar crea un SnackBar para deshacer los cambios
    // TODO: Debe eliminar el elemento de la base de datos
    borrar(){
      let copiaDelCard = this.card;
      let snackBar_borrar = this._snackBar.open("Se eliminó la tarjeta ", 'deshacer',{panelClass:"sucess", verticalPosition: "bottom",   duration: 5000});
      snackBar_borrar.afterDismissed().subscribe(data => {
        if(data.dismissedByAction)
        this.deshacerBorrarCard.emit(copiaDelCard);
      });
      this.borrarCard.emit(this.card);
    }
    
    
    
    
    // TODO: Debe editar
    editar(){
      console.log("Editar");
      let dialogRef = this.dialog.open(CardModalComponent, {
        data: {card: this.card}
      });
      
      dialogRef.afterClosed().subscribe(res => {
        console.log("se cerro el modal: ", res);
        // TODO: en caso de que devuelva un UNDIFINED no hacer NativeDateAdapter... sino update de nota
        this.DAS.saveNote(res);
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
    
    cambiarColor(color:String){
      console.log(color);
      
      switch (color) {
        case 'sin-color':
        this.card.color = "white"; 
        break;
        case 'azul':
        this.card.color = "#034fbbd4";
        break;
        case 'rosa':
        this.card.color = "#ff7ba8";
        break;
        case 'naranja':
        this.card.color = "#ffc107d1";
        break;
        case 'celeste':
        this.card.color = "#03b5bbd4";
        break;
        case 'violeta':
        this.card.color = "#5803bbd4";
        break;
        case 'lila':
        this.card.color = "#bb039ed4";
        break;
        case 'amarillo':
        this.card.color = "#e4ff40";
        break;
        case 'verde':
          this.card.color ="#33bb03d4";
        default:
        break;
      }
    }
    seleccionarGrupo(e: any){
      console.log("card-container: ");
      
    }
  
    
  }
  