import { PipeTransform, Pipe } from "@angular/core";
// import { NgModule } from "@angular/core";

@Pipe({name:"TransformarTextoPipe"})

export class TransformarTextoPipe implements PipeTransform {
    MAXIMA_LONGITUD_TEXTO: number = 50;
    MAXIMA_LONGITUD_TITULO: number = 25;

    transform(input: string, tipo: string, tipo_pipe:string):string {
        switch (tipo_pipe) {
            case "cortarTexto":
                return this.cortar_texto(input, this.MAXIMA_LONGITUD_TEXTO);
            case "cortarTitulo":
                return this.cortar_texto(input,this.MAXIMA_LONGITUD_TITULO);
            default:
                break;
        }
    }

    /**
     * cortar_texto
     */
    public cortar_texto(input, cantidad):string {
        if(!input){
            return "";
        }
        else{
            return input.substring(0, cantidad) + "...";
        }
    }
}