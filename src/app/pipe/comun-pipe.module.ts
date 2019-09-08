import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TransformarTextoPipe } from './procesar-texto.pipe';

@NgModule({
    imports:[CommonModule],
    declarations:[TransformarTextoPipe],
    exports:[TransformarTextoPipe]
})
export class ComunPipeModule{}