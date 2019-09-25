import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './material.module'
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule} from '@angular/material'
import {AngularFireModule} from '@angular/fire'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {AngularFireAuth} from '@angular/fire/auth';

import { AppComponent } from './app.component'; 
import { fromEventPattern } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { environment } from '../environments/environment';
import { CardModule } from './components/card/card.module';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import {AngularFireStorageModule} from '@angular/fire/firestore'
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupPanelComponent } from './components/group-panel/group-panel.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NotesBoardComponent } from './components/notes-board/notes-board.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { AddToGroupComponent} from './components/add-to-group/add-to-group.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreateGroupComponent,
    GroupPanelComponent,
    MainNavComponent,
    NotesBoardComponent,
    CreateNoteComponent,
    AddToGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),  //de esta manera toma los datos de environment para conectar con la db
    AngularFireDatabaseModule

    
  ],
  entryComponents:[NavbarComponent,LoginComponent,RegisterComponent,CreateGroupComponent,GroupPanelComponent,MainNavComponent,CreateNoteComponent,AddToGroupComponent],
  providers: [AngularFireAuth,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
 