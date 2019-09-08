import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {MatCardModule} from '@angular/material/card';
import { ContenidoModule } from '../contenido/contenido.module';
import { ComunPipeModule } from 'src/app/pipe/comun-pipe.module';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ContenidoModule,
    ComunPipeModule,
  ],
  exports:[CardComponent]
})
export class CardModule { }
