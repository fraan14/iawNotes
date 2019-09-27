import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from './contenido.component';
import { ContenidoAudioComponent } from './contenido-audio/contenido-audio.component';
import { ContenidoTextoComponent } from './contenido-texto/contenido-texto.component';
import { ContenidoChecklistComponent } from './contenido-checklist/contenido-checklist.component';
import { MatCheckboxModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ComunPipeModule } from 'src/app/pipe/comun-pipe.module';

@NgModule({
  declarations: [
    ContenidoComponent,
    ContenidoAudioComponent,
    ContenidoTextoComponent, 
    ContenidoChecklistComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ComunPipeModule
  ],
  exports:[ContenidoComponent]
})
export class ContenidoModule { }
