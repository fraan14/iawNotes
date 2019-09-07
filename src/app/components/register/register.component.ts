import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatDialogRef} from '@angular/material'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,  private dialogRef: MatDialogRef<RegisterComponent>) { }

  public email:string="";
  public contra:string="";
  public isError:boolean=false;
  public error_msg:string="";

  ngOnInit() {
  }

  onAddUser(){
    this.authService.registerUser(this.email,this.contra).then((res)=>{
      this.dialogRef.close();
    }).catch(err=> {this.errorDetected(err.message), console.log("error",err)})
  }

  errorDetected(detail:string){
    this.isError=true;
    this.error_msg=this.authService.errorProcessor(detail);
  }
 
}
