import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container.component';
import { CardModule } from '../card/card.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [CardContainerComponent],
  imports: [
    CommonModule,
    CardModule,
    FlexLayoutModule
  ],
  exports: [CardContainerComponent]
})
export class CardContainerModule { }
