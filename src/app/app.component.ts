import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService){}
  title = 'Iaw-Notes';
  isLogged:Boolean=false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        //console.log('user logged');
        this.isLogged = true;
      }
      else{
        //console.log('no logged user');
        this.isLogged = false;
      }
    });
  }

}
