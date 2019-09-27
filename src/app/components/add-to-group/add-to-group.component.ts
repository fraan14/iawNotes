import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddToGroupComponent>,private das:DataApiService) { }

  public suemail:string="";

  ngOnInit() {

  }

  addIntegrante(){
    // aca lo que tengo que hacer es un metodo que me reciba el email del loco a añadir y me devuelva un success si todo piola o un error si el chabon no existe
    this.das.VerifyAndAddUser(this.suemail);
    
  }

}
