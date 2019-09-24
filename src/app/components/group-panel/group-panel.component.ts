import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { GrupInterface } from '../../models/grupo';



@Component({
  selector: 'app-group-panel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.css']
})
export class GroupPanelComponent implements OnInit {
  constructor(private das:DataApiService,private authService: AuthService) { }
  public userid: string;
  public grupos:GrupInterface[];
  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        //console.log('user logged');
        this.userid = auth.uid;
        this.getGroups(this.userid);
      }
      else{
        //console.log('no logged user');
      }
    });
  }

  getGroups(uid:string){
    this.das.getKnownGroups(uid).subscribe(res=>{
      let auxgp:GrupInterface[] = res;
      this.grupos = res;
      let i = 0;
      auxgp.forEach(element => {
                if(element.usuarioiD.includes(uid)){
                  //console.log("ESTE GRUPO PERTENECE AL USUARIO: ",element.nombreGrupo);
                  this.grupos
                }
                else{
                  //this.grupos[i]=null;
                  //console.log("ESTE GRUPO NO PERTENECE AL USUARIO: ",element.nombreGrupo);
                }
                i= i+1;
      });
    });
  }

  showNotes(item:GrupInterface){
    //console.log("item",item.usuarioiD);
    this.das.grupoSeleccionado=item;
  }


}
