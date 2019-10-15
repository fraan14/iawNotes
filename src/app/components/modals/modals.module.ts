import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal/card-modal.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusquedaModalComponent } from './busqueda-modal/busqueda-modal.component';


@NgModule({
  declarations: [CardModalComponent, BusquedaModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  exports:[CardModalComponent, BusquedaModalComponent]
})
export class ModalsModule { }
