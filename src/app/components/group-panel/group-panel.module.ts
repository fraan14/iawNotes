import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupPanelComponent } from "./group-panel.component";
import { MatSidenavModule, MatListModule } from '@angular/material';


@NgModule({
  declarations: [GroupPanelComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [GroupPanelComponent]
})

export class GroupPanelModule { }
