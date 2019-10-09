import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth, User } from 'firebase/app';
import { GrupInterface } from '../models/grupo';
import * as firebase from 'firebase';
import { card } from '../interfaces/card.interface';


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

    this.getCurrentGroup();
  }

  private groupCollection: AngularFirestoreCollection<GrupInterface>;
  private grups: Observable<GrupInterface[]>;

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private users:Observable<UserInterface[]>;
  private usersFiltrados:Observable<UserInterface[]>;
  private user:Observable<UserInterface>;
  private user2:UserInterface = null;


  getUBI(idUser: string){
    this.userDoc = this.afs.doc<UserInterface>(`Usuarios/${idUser}`);
    return this.user = this.userDoc.valueChanges().pipe(map(action =>{
      return action;
      // if(action.payload.exists===false){
      //   return null;
      // }else{
      //   const data = action.payload.data() as UserInterface;
      //   data.id = action.payload.id;
      //   console.log("data-service", data);
        
      //   return data;
      // }
    }));
  }
  public grupoSeleccionado:GrupInterface = null;

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

  async getUsuarioPorId(idUser:string){
    
    //return await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get()
    let usr: UserInterface;
    await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get().then(function(nuevoUsuario){
      usr = nuevoUsuario.data();
      //console.log("nuevo usuario "+usr.nombre);
    });
    //console.log("Este es el usiario perteneciente al grupo: "+usr.nombre);
    return usr;
  }

  async CrearGrupoYactualizarUser(idUser: string, groupName:string){
    
    const aux = await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get(); //este me lo transforma en promesa
    // if (aux.exists) {
    //   console.log("Document data:", aux.data());
    // } else {
    //   console.log("No such document!");
    // }
    let user:UserInterface = aux.data();
    let idGroup = this.CreateNewGroup(user.nombre,user.id,groupName);
    user.Grupos.push(idGroup);
    console.log("USUARIO UPDATEADO", user);
    this.afs.doc(`Usuarios/${user.id}`).set(user);
    
  }

  //este metodo se encarga de actualizar la lista de referencias a grupos de los usuarios.
  updateUserGroups(user:UserInterface,idGroup:string){
    
    // this.userDoc = this.afs.doc<UserInterface>(`Usuarios/${idUser}`);

    // this.userDoc.snapshotChanges().pipe(map(action =>{
    //   if(action.payload.exists===false){
    //     return null;
    //   }else{
    //     const data = action.payload.data() as UserInterface;
    //     data.id = action.payload.id;
    //     return data;
    //   }
    // })).toPromise().then(user=>{
     user.Grupos.push(idGroup);
     console.log("USUARIO UPDATEADO", user);
     this.afs.doc(`Usuarios/${user.id}`).set(user);
    // });
    
    // this.userDoc = this.afs.doc<UserInterface>(`Usuarios/${idUser}`);
    // this.userDoc.valueChanges().subscribe(res=>{
    //   res.Grupos.push(idGroup);
    //   this.userDoc.update(res);
      
    // });
    
  }



  CreateNewUser(person: firebase.User){
    let auxName = "";
    if(person.displayName != undefined)
      auxName = person.displayName;
    else
      auxName = person.email.split('@',1)[0]; //si se registra con email, el nombre que le queda es el del inicio del mail.
    
    let newgpid:string = this.CreateNewGroup(auxName,person.uid,"Mis Notas");
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
      usuarioiD:[pid],
      id:customId
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
        console.log("No existe el usuario en la base de datos, se procede a crearlo...");
        this.CreateNewUser(person);
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

  //este metodo recibe como parametro el uid del usuario logueado y retorna los grupos en los que el usuario aparece registrado.
  getKnownGroups(idUser:string){
    return this.afs.collection("Grupos", ref => ref.where('usuarioiD', "array-contains", idUser)).valueChanges();
  }

  getCurrentGroup():GrupInterface{
    return this.grupoSeleccionado;
  }

  getNotes(){}
  saveNote(miNota:card){}


  //****************ACA VA LO DE AÑADIR USUARIO A GRUPO***********************/

  ///este metodo tiene que
  ///primero dado un mail verificar si el usuario exite y retornarlo
  async VerifyAndAddUser(mail:string){
    
    // const aux = await this.afs.collection<UserInterface>("Usuarios", ref => ref.where('email',"==","garcia.andi90@gmail.com")).ref.get();
    const aux = await this.afs.collection<UserInterface>("Usuarios", ref => ref.where('email',"==",mail)).ref.get();
    let finalUser:UserInterface;
    aux.forEach(function(doc){
          let miuser:UserInterface = doc.data();
          let mimail:string = miuser.email;
          if(mimail===mail){
            finalUser = miuser;            
          }
        });
    return finalUser;
    
  }
  
  UpdateGroup(grp:GrupInterface){
    this.groupCollection.doc(grp.id).set(grp);    //agrega el usuario a la base de datos
  }

  updateUser(usr:UserInterface){
    this.usersCollection.doc(usr.id).set(usr);    //agrega el usuario a la base de datos
  }

}

//this.afs.collection("Usuarios", ref => ref.where('id', '==', person.uid)).valueChanges()



//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
