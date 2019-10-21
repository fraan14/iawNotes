import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {MatCardModule} from '@angular/material/card';
import { ContenidoModule } from '../contenido/contenido.module';
import { ComunPipeModule } from 'src/app/pipe/comun-pipe.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MensajesModule } from '../mensajes/mensajes.module';
import { MatSnackBarModule, MatMenuModule, MatListModule } from '@angular/material';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { ModalsModule } from '../modals/modals.module';
import { BusquedaModalComponent } from '../modals/busqueda-modal/busqueda-modal.component';
import { DataApiService } from 'src/app/services/data-api.service';




@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ContenidoModule,
    ComunPipeModule,
    MatIconModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MensajesModule,
    MatSnackBarModule,
    ModalsModule,
    MatMenuModule,
    MatListModule
  ],
   entryComponents:[CardModalComponent, BusquedaModalComponent],
  exports:[CardComponent],
  providers:[DataApiService]
})
export class CardModule { }
