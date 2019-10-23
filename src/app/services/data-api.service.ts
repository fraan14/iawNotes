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

    this.notesCollection = afs.collection<GrupInterface>('Notas');

    this.getCurrentGroup();
  }
  private notesCollection: AngularFirestoreCollection<card>;
  private groupCollection: AngularFirestoreCollection<GrupInterface>;
  private usersCollection: AngularFirestoreCollection<UserInterface>;

  private grups: Observable<GrupInterface[]>;
  private users:Observable<UserInterface[]>;
  private usersFiltrados:Observable<UserInterface[]>;

  private userDoc: AngularFirestoreDocument<UserInterface>;

  private user:Observable<UserInterface>;

  private user2:UserInterface = null;
  public grupoSeleccionado:GrupInterface = null;

  
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
    //console.log("USUARIO UPDATEADO", user);
    this.afs.doc(`Usuarios/${user.id}`).set(user);
    
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

  
  //este metodo deberia eliminar la nota de la base de datos y el id de notas del arreglo de notas del grupo
  async deleteNote(id:string){
    if(this.grupoSeleccionado){

      await this.notesCollection.doc(id).delete()
      const index = this.grupoSeleccionado.notasID.indexOf(id, 0);
      if (index > -1) {
        this.grupoSeleccionado.notasID.splice(index, 1);
        this.UpdateGroup(this.grupoSeleccionado);
      }
      
    }
  }

  async deleteGroup(gp:GrupInterface){
    
    this.grupoSeleccionado = null;
    let i = 0;
    for(let notid of this.grupoSeleccionado.notasID){   //elimino todas las notas
      await this.notesCollection.doc(notid).delete()
    }
    
    await this.groupCollection.doc(gp.id).delete()  //elimino el grupo
  }

  //entonces lo que queda es verificar que al crear la nota exista un grupo seleccionado
  saveNote(miNota:card){
    console.log(this.grupoSeleccionado);
    
    if(this.grupoSeleccionado){
      console.log("card recibida",miNota);
      let customId = this.generateNewKey('Notas');
      miNota.id = customId;
    
      this.notesCollection.doc(customId).set(miNota);    //agrega la nota a la base de datos

      this.grupoSeleccionado.notasID.push(customId);                //agrega el id al arreglo de ids del grupo
      this.UpdateGroup(this.grupoSeleccionado);

      return customId;
    }
  }

  //este metodo tiene que iterar por todos los idNotas del grupo generando un arreglo de notas cargadas.
  async getAllNotesFromGroup(){
    let notaux : card;
    let toRet: card[]= new Array();
    let i = 0;
    for(let notid of this.grupoSeleccionado.notasID){
      await this.getNotaPorId(notid).then(function(res){
        notaux = res;
      });
      toRet[i]=notaux;
      i+=1;
    }

    return toRet; // si el resultado de esto te da undefined tenes que sacar este metodo y llamar a las funciones como en el componente add-to-group.component.ts linea 24
  }

  async getNotaPorId(idNota:string){
    
    //return await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get()
    let nt: card;
    await this.afs.doc<card>(`Notas/${idNota}`).ref.get().then(function(nuevaNota){
      nt = nuevaNota.data();
      //console.log("nuevo usuario "+usr.nombre);
    });
    //console.log("Este es el usiario perteneciente al grupo: "+usr.nombre);
    return nt;
  }


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



  //------------------DEPRECATED-----------------------------
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
  //este metodo debe retornar un arreglo de notas a partir de las ids de nota del grupo seleccionado
  getNotes(){
    let cards: card[] = [];

    let card_1 = {
      id: "123",
      texto: '[  {"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} ,{"check":true, "text":"Chequeado"} , {"check":false, "text":"No Check"}]',
      color: "rojo",
      titulo: "El titulo mas largo delasd nknajk ldsjkl djklj ldasj dkla ",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      tipo: 2,
      label: ["card", "prueba", "checkbox"]
    }

    let card_2 = {
      id: "124",
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor tristique condimentum. Fusce non mauris id nibh volutpat facilisis vel in sem. Nunc aliquet augue quis dui laoreet, sit amet aliquet velit ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi faucibus lobortis nulla, quis volutpat metus eleifend vitae. Nulla quis nisl enim. Nunc fringilla nulla in egestas dictum. Morbi consectetur nibh lorem, non tincidunt risus vestibulum non. Pellentesque varius vulputate sem sit amet convallis. Pellentesque blandit leo at dignissim ornare. Quisque ut eros enim.',
      color: "rojo",
      titulo: "Un titulo de prueba 2 ",
      img: "",
      tipo: 1,
      label: ["card", "prueba", "comun"]
    }

    let card_3 = {
      id: "124",
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor tristique condimentum. Fusce non mauris id nibh volutpat facilisis vel in sem. Nunc aliquet augue quis dui laoreet, sit amet aliquet velit ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi faucibus lobortis nulla, quis volutpat metus eleifend vitae. Nulla quis nisl enim. Nunc fringilla nulla in egestas dictum. Morbi consectetur nibh lorem, non tincidunt risus vestibulum non. Pellentesque varius vulputate sem sit amet convallis. Pellentesque blandit leo at dignissim ornare. Quisque ut eros enim.',
      color: "rojo",
      titulo: "Un titulo de prueba 2 ",
      img: "https://lh3.googleusercontent.com/YH6zn6nGGvf5g48KFRTsocF9jMmMVl00pcMrCF3mm43-0OAk3qt4DOUVo1Jnog5f7nv5cnPFpvTBoS7203rtc0amG5KfGPYtYf438H3Tl1M4SEzMEPaQ22oNOJK0E1UYHHcYfees7G-TQkww_XnjnAfiPaH631hv809hJRcf2qnWwb4y3gcVjk-5ks2TiFCKUQsX470K4ukP_pr9ezvhRRt2HssB--R8695sstKacAHgERC0yevYF49WO1Q8ZRuFzCEyE1GIrsyekdJbZpKdpNZIOBfI5Ntfyji2JMZ5yJi4mbfOYH59A7nj7vXHbd5RKdgHrW6Updsg_Gh6FKAUw2Pn4cku1khto7-Dcea6VifSSVZU0tfbciRKQod7-oKpzpv4Z5edAZmBI4sYdUxsPev8rZKrCosImAnDLlrL2Hc7ieLmmkor1dhHHOiB1tLQ7N9iE-m8J9vKDiA6Hut5iihNE6hUhqEhqT0klFntDNiq2nJFr4LlskY8dPrl2Yha1RC860ARrjfxV2lIthUGc6BLYl5lPB1FbMdv4vz6T02Srl45KcLigzb0dj5PkcCeemyX6IxZRnxGK-PI4jvX_x0vOFwsZ_FaiMHl3dbZYYPT7pizxzmipD8mZQysGCzHdhz4km7wTSEBHxCU-LTDFERFdGrz035ijpdFVyAi3d6a6nmM49Nm7GMY=w462-h615-no",
      tipo: 1,
      label: ["card", "prueba", "comun"]
    }

    return cards = [card_1, card_2, card_3];

  }


}

//this.afs.collection("Usuarios", ref => ref.where('id', '==', person.uid)).valueChanges()



//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
