import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { UserInterface } from '../models/user';
import { Observable,of, Subject } from 'rxjs';
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
  public $grupoSeleccionado: Subject<GrupInterface> = new Subject<GrupInterface>();
  public grupoSeleccionado$: Observable<GrupInterface> = this.$grupoSeleccionado.asObservable();
  public usuarioActual:UserInterface = null;

  
  async getUsuarioPorId(idUser:string){
    
    //return await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get()
    let usr: UserInterface;
    await this.afs.doc<UserInterface>(`Usuarios/${idUser}`).ref.get().then(function(nuevoUsuario){
      usr = nuevoUsuario.data();
      if(!usr.nombre){
        usr.nombre = usr.email;
      }
      //console.log("nuevo usuario "+usr.nombre);
    });
    //console.log("Este es el usiario perteneciente al grupo: "+usr.nombre);
    return usr;
  }


  public updateGrupoSeleccionado(gi: GrupInterface) {
    this.$grupoSeleccionado.next(gi);
  }

  public actualGroup(): Observable<GrupInterface> {
    // const mocked: Plant[] = [
    //   { id: 1, image: 'hello.png' }
    // ];
    // returns an Observable that emits one value, mocked; which in this case is an array,
    // and then a complete notification
    // You can easily just add more arguments to emit a list of values instead
    this.$grupoSeleccionado.next(this.grupoSeleccionado);
    return this.$grupoSeleccionado.asObservable();
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

  getCurrentUser():UserInterface{
    return this.usuarioActual;
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
    let i = 0;
    if(this.grupoSeleccionado.notasID){
      for(let notid of this.grupoSeleccionado.notasID){   //elimino todas las notas
        await this.notesCollection.doc(notid).delete();
      }
    }
    await this.groupCollection.doc(gp.id).delete(); //elimino el grupo
    this.grupoSeleccionado = null;
  }

  //entonces lo que queda es verificar que al crear la nota exista un grupo seleccionado
  saveNote(miNota:card){
    if(miNota != null && miNota!=undefined){
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
  }

  //este metodo tiene que iterar por todos los idNotas del grupo generando un arreglo de notas cargadas.
  async getAllNotesFromGroup(){
    let notaux : card;
    let toRet: card[]= new Array();
    let i = 0;
    if(this.grupoSeleccionado.notasID != null){
      for(let notid of this.grupoSeleccionado.notasID){
        await this.getNotaPorId(notid).then(function(res){
          notaux = res;
          
        });
        toRet[i]=notaux;
        i+=1;
      }
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
    return this.afs.collection("Notas").valueChanges();
  }


}

//this.afs.collection("Usuarios", ref => ref.where('id', '==', person.uid)).valueChanges()



//https://stackoverflow.com/questions/51678820/how-to-retrieve-user-from-firestore-based-on-property
