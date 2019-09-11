import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
//tengo que importar las interfaces.

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { }

  private userDoc: AngularFirestoreDocument<UserInterface>;
  private users:Observable<UserInterface[]>;
  private user:Observable<UserInterface>;
  private user2:UserInterface;

  getUserById(idUser: string){
    this.userDoc = this.afs.doc<UserInterface>(`Usuarios/${idUser}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists===false){
        return null;
      }else{
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  getEmailFromUser(email:string)
  {
    this.users = this.afs.collection("Usuarios", ref => ref.where('email', '==', email)).valueChanges();
    //console.log("RESULTADO",this.users);

    this.users.subscribe(res => { 
      console.log("RES",res);
      this.user2 = res[0];
      console.log("this is the user:" + this.user2.nombre);
    });

  }

  createGroup(){}
  getNotes(){}
  saveNote(){}


}

//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
