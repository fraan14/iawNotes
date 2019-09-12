import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import undefined = require('firebase/empty-import');
import { GrupInterface } from '../models/grupo';
//tengo que importar las interfaces.

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { 
    this.usersCollection = afs.collection<UserInterface>('Usuarios');
    this.users = this.usersCollection.valueChanges();

    this.groupCollection = afs.collection<GrupInterface>('Grupos');
    this.grups = this.groupCollection.valueChanges();
  }

  private groupCollection: AngularFirestoreCollection<GrupInterface>;
  private grups: Observable<GrupInterface[]>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private users:Observable<UserInterface[]>;
  private usersFiltrados:Observable<UserInterface[]>;
  //private user:Observable<UserInterface>;
  private user2:UserInterface;

  // getUserById(idUser: string){
  //   this.userDoc = this.afs.doc<UserInterface>(`Usuarios/${idUser}`);
  //   return this.user = this.userDoc.snapshotChanges().pipe(map(action =>{
  //     if(action.payload.exists===false){
  //       return null;
  //     }else{
  //       const data = action.payload.data() as UserInterface;
  //       data.id = action.payload.id;
  //       return data;
  //     }
  //   }));
  // }

  getEmailFromUser(email:string, person:firebase.User)
  {
    this.usersFiltrados = this.afs.collection("Usuarios", ref => ref.where('email', '==', email)).valueChanges();  //este puede ser otra variable
    //console.log("RESULTADO",this.users);

    this.usersFiltrados.subscribe(res => { 
      //console.log("RES",res);
      if(res.length!=0){
        this.user2 = res[0];
        console.log("this is the user:" + this.user2.nombre);
      }else{
        this.user2 = this.CreateNewUser(person);
        console.log("No existe el usuario en la bd");
      }
    });

    

  }

  CreateNewUser(person: firebase.User){
    
    let auxName = "";
    if(person.displayName != undefined)
      auxName = person.displayName;
    else
      auxName = person.email.split('@',1)[0]; //si se registra con email, el nombre que le queda es el del inicio del mail.
    const newPerson = <UserInterface>
     {
       id: person.uid,
       email:person.email,
       nombre:auxName,
       Grupos:null
     }

    this.usersCollection.add(newPerson);    //agrega el usuario a la base de datos
    return newPerson;
  }



  getOrCreateUser(person: firebase.User){
    // this.getEmailFromUser(person.email,person);
    // if( this.user2 == null){
    //   console.log("ENTRO ACA")
    //   //this.user2 = this.CreateNewUser(person);
    // }
    // return this.user2;

    //primero tengo que buscar en la base de datos de usuarios por uid
    this.usersFiltrados = this.afs.collection("Usuarios", ref => ref.where('id', '==', person.uid)).valueChanges();  //este puede ser otra variable
    this.usersFiltrados.subscribe(res => { 
      console.log("RES",res);
      if(res.length!=0){
        this.user2 = res[0];
        console.log("el usuario con ese id es: " + this.user2.nombre);
      }else{
        this.user2 = this.CreateNewUser(person);
        console.log("No existe el usuario en la base de datos");
      }
    });

    console.log("AL FINAL DE TODO ESTO TENGO: ",this.user2.nombre);
  }


  createGroup(){}
  getNotes(){}
  saveNote(){}


}

//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
