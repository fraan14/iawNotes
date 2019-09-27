import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeConfirmacionComponent } from './mensaje-confirmacion/mensaje-confirmacion.component';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [MensajeConfirmacionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports:[MensajeConfirmacionComponent]
})
export class MensajesModule{ }
