import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
//tengo que importar las interfaces.

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs:AngularFirestore) { }

  createGroup(){}
  getNotes(){}
  saveNote(){}


}
