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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
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
    AngularFireModule.initializeApp(environment.firebaseConfig),  //de esta manera toma los datos de environment para conectar con la db
    AngularFireDatabaseModule

    
  ],
  entryComponents:[NavbarComponent,LoginComponent,RegisterComponent],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
 