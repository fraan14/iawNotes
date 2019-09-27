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
import { MensajeConfirmacionComponent } from '../mensajes/mensaje-confirmacion/mensaje-confirmacion.component';




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
    MensajesModule
  ],
  entryComponents:[MensajeConfirmacionComponent],
  exports:[CardComponent]
})
export class CardModule { }
