import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth, private dialogRef: MatDialogRef<CreateNoteComponent>,private authService:AuthService, public das:DataApiService) { }
  public nombreNota:string;
  ngOnInit() {
  }

  crearNota(){
    
  }
}
