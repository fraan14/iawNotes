import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatButtonToggleModule, MatTooltipModule } from '@angular/material';
import { SpeedDialFabComponent } from './speed-dial-fab.component';



@NgModule({
  declarations: [SpeedDialFabComponent],
  imports: [
    CommonModule,BrowserModule, FormsModule, BrowserAnimationsModule,
    MatButtonModule, MatButtonToggleModule, MatTooltipModule
  ],
  exports:[SpeedDialFabComponent]

})
export class SpeedDialFabModule { }
