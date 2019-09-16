import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import { GrupInterface } from '../models/grupo';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import * as firebase from 'firebase';
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
  private user:Observable<UserInterface>;
  private user2:UserInterface = null;

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

  CreateNewUser(person: firebase.User){
    
    let auxName = "";

    if(person.displayName != undefined)
      auxName = person.displayName;
    else
      auxName = person.email.split('@',1)[0]; //si se registra con email, el nombre que le queda es el del inicio del mail.
    
    let newgpid:string = this.CreateNewGroup(auxName,person.uid,"Mis Notas");

    console.log("GRUPO CREADO",newgpid)
    
    const newPerson = <UserInterface>
     {
       id: person.uid,
       email:person.email,
       nombre:auxName,
       Grupos:[newgpid]
     }

    this.usersCollection.doc(person.uid).set(newPerson);    //agrega el usuario a la base de datos
    return newPerson;
  }

  CreateNewGroup(pname:string,pid:string, gname:string):string{
    
    let auxName = "";
    let customId = this.generateNewKey('Grupos');
    const newGroup = <GrupInterface>
     {
      Admin:pname,
      AdminID:pid,
      nombreGrupo:gname,
      notasID:null,
      usuarioiD:[pid]
     }
    
    this.groupCollection.doc(customId).set(newGroup);    //agrega el usuario a la base de datos
    return customId;
  }

  


  getOrCreateUser(person: firebase.User){
    //primero tengo que buscar en la base de datos de usuarios por uid
    this.usersFiltrados = this.afs.collection("Usuarios", ref => ref.where('id', '==', person.uid)).valueChanges();  //este puede ser otra variable
    this.usersFiltrados.subscribe(res => { 
      //console.log("RES",res);
      if(res.length!=0){
        this.user2 = res[0];
        console.log("el usuario con ese id es: " + this.user2.nombre);
      }else{
        this.CreateNewUser(person);
        console.log("No existe el usuario en la base de datos");
      }
    });
  }

  getLoggedUser(){
    return this.usersFiltrados;
  }

  generateNewKey(ref: any) {
    const _ref = firebase.firestore().collection(ref).doc();
    const newKey = _ref.id;
    return newKey;
  }

  createGroup(){}
  getNotes(){}
  saveNote(){}


}

//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
