import { NgModule } from '@angular/core';
import{MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatSidenav, MatIcon, } from '@angular/material';
import { fromEventPattern } from 'rxjs';

@NgModule({
    imports:[
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ],
    exports:[
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ]
})

export class MaterialModule{}