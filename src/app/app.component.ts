import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { DataApiService } from './services/data-api.service';
import { UserInterface } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private das: DataApiService){}
  title = 'Iaw-Notes';
  isLogged:Boolean=false;
  public idPerson:string="";
  tema: string = "my-theme";

  ngOnInit() {
    this.verifyUser();
  }

  verifyUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        //console.log('VERRRRRRRRRRRRR',auth);
        this.getOrCreateUser(auth);
        this.idPerson = auth.uid;
        this.isLogged = true;
      }
      else{
        this.isLogged = false;
      }
    });
  }

  //aca tengo que ver si el email del usuario que llega esta incluido en la bd, si no esta 
  getOrCreateUser(person : firebase.User){
    this.das.getOrCreateUser(person);
  }
  cambiarTema(event){
    
    if(this.tema === "my-theme"){
      this.tema = 'my-second-theme';
    }
    else{
      this.tema = "my-theme";
    }
  }

  
}
