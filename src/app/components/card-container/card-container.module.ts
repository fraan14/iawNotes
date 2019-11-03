import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container.component';
import { CardModule } from '../card/card.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule, MatButtonModule, MatRippleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { ModalsModule } from '../modals/modals.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CardContainerComponent],
  imports: [
    CommonModule,
    CardModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ModalsModule,
    MatRippleModule,
    FormsModule


  ],
  exports: [CardContainerComponent]
})
export class CardContainerModule { }
