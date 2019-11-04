import { Component, OnInit, Inject } from '@angular/core';
import { card } from 'src/app/interfaces/card.interface';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validator, FormControl, FormBuilder } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {
  
  card:card=null;
  tipo: string = null;
  cardForm: FormGroup;
  fb: FormBuilder;
  lista_check: {check:boolean, text:string}[];
  fileUploadInputFor:string = "";
  
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  fb: FormBuilder , private das:DataApiService           
  ) {
    //Datos pasados
    if(data){
      this.card = data.card;
      this.tipo = data.tipo;
      console.log("data pasada",this.card, this.tipo );
      
      if(this.card.tipo == 2){
        this.lista_check = JSON.parse(this.card.texto);
        this.cardForm = fb.group({
          'titulo':             [this.card.titulo],
          'contenido':          [""],
          'tipo_contenido':     ["check_list"],
          'agregar_check':      ["agregar item"] ,
          'imagen':             [""],
        });
      }
      else{
        this.lista_check = new Array<any>();
        this.cardForm = fb.group({
          'titulo':             [this.card.titulo],
          'contenido':          [this.card.texto],
          'tipo_contenido':     ["texto"],
          'agregar_check':      ["agregar item"] ,
          'imagen':             [""],
        });
      }      
    }
    
    // this.lista_check = new Array<any>();
    // this.cardForm = fb.group({
    //   'titulo':             [""],
    //   'contenido':          [""],
    //   'tipo_contenido':     ["texto"],
    //   'agregar_check':      ["agregar item"] ,
    //   'imagen':             [""],
    // });
  }
  
  ngOnInit() {
    // this._iniciarControles();
    // this._iniciarValores();
  }
  
  private _iniciarControles(){
    
    this.cardForm =  new FormGroup({
      'titulo':             new FormControl(''),
      'contenido':          new FormControl(''),
      'tipo_contenido':     new FormControl('texto'),
      'agregar_check':      new FormControl('agregar item'), 
    });
  }
  
  private _iniciarValores(){
    //Consturimos el formulario..
    this.cardForm = this.fb.group({
      'tipo_contenido':   'texto',
      'agregar_check':    'agregar item',
    });
  }
  
  public enterAction(){
    console.log(this.cardForm.get('agregar_check').value);
    //ahora tengo que agregar el value dento de un json y agregarlo al arreglo de json.
    
    let valor_check = {
      "check" : false,
      "text"  : this.cardForm.get('agregar_check').value
    }
    
    this.lista_check.push(valor_check);
    this.cardForm.get('agregar_check').setValue("");
    
    console.log(this.lista_check);
    
  }
  
  public limpiar(){
    this.cardForm.get('agregar_check').setValue("");
  }
  
  accionEditar(): card{
    let texto = "";
    if(this.cardForm.get('tipo_contenido').value == 'check_list'){
      texto = JSON.stringify(this.lista_check);
    }
    else{
      texto = this.cardForm.get('contenido').value;
    }
    
    let card: card ={
      'titulo': this.cardForm.get('titulo').value,
      'texto' : texto,
      'tipo'  : this.cardForm.get('tipo_contenido').value 
    }
    
    // console.log(card);
    // this.das.saveNote(card);
    
    return card;
    
  }
  
  seleccionaronElemento(item , i){
    this.lista_check[i].check = !item.check;
    console.log(this.lista_check[i]);
    
  }
  
  
  onFileChange(event){
    console.log("evento",event);
    
    let reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(reader);
      this.cardForm.patchValue({
        file: reader.result
      });
      
      console.log(this.cardForm.get('imagen').value);
      
    }
    
  }
  
  
  // TODO: Guardar la imagen en el storage de Firebase
  subirImagen(){
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {

      const file = fileUpload.files[0];
      console.log("files:",file);
      for (let index = 0; index < fileUpload.files.length; index++) {
        
        // this.files.push({ data: file, state: 'in', 
        // inProgress: false, progress: 0, canRetry: false, canCancel: true });
      }
      // this.uploadFiles();
    };
    fileUpload.click();
  }
}
