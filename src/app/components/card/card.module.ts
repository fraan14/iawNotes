import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {MatCardModule} from '@angular/material/card';
import { ContenidoModule } from '../contenido/contenido.module';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ContenidoModule
  ],
  exports:[CardComponent]
})
export class CardModule { }
