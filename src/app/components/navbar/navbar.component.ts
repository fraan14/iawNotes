import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginDialog:MatDialog) { }

  ngOnInit() {
  }

  
  
  abrirVentanaLogueo(){
    let config:MatDialogConfig={
      width:'400px', height:'400px'
    }
    this.loginDialog.open(LoginComponent,config);
  }

  abrirVentanaRegistro(){
    let config:MatDialogConfig={
      width:'400px'
    }
    this.loginDialog.open(RegisterComponent,config);
  }

}
