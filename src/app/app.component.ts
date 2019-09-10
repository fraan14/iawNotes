import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { DataApiService } from './services/data-api.service';
import { UserInterface } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private das: DataApiService){}
  title = 'Iaw-Notes';
  isLogged:Boolean=false;
  public user: UserInterface;

  ngOnInit() {
    this.verifyUser();
  }

  verifyUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        console.log('auth email', auth);
        this.getOrCreateUser(auth.uid)
        this.isLogged = true;
      }
      else{
        //console.log('no logged user');
        this.isLogged = false;
      }
    });
  }

  //aca tengo que ver si el id del usuario que llega esta incluido en la bd, si no esta 
  getOrCreateUser(id : string){
    this.das.getUserById('x69B4FCi4JAPUcoNdx4G').subscribe(user =>{
      console.log(user);
    });
  }

}
