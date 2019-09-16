import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import {MatDialogRef} from '@angular/material'
import {auth} from 'firebase/app';
import { GrupInterface } from '../../models/grupo';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth, private dialogRef: MatDialogRef<CreateGroupComponent>,private authService:AuthService, public das:DataApiService) { }

  public ngrupo:string="grupo x";
  actualUserId:string;
  newGroupid:string="";
  newGroup:GrupInterface;

  ngOnInit() {
    this.getActualUserId();
  }


  getActualUserId(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.actualUserId= auth.uid;
      }
    });
  }
  crearGrupo(){
    this.das.getUserById(this.actualUserId).subscribe(user=>{
      this.newGroupid=this.das.CreateNewGroup(user.nombre,user.id,this.ngrupo);
      
    });
  }

}
