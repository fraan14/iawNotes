import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './material.module'
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout'

import { AppComponent } from './app.component'; 
import { fromEventPattern } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 