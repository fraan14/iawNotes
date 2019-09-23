import { NgModule } from '@angular/core';
import{MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatSidenav, MatIcon, MatTabsModule,MatGridListModule,MatMenuModule,MatCardModule,MatButtonToggleModule} from '@angular/material';
import { fromEventPattern } from 'rxjs';

@NgModule({
    imports:[
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatMenuModule,
        MatCardModule,
        MatButtonToggleModule
    ],
    exports:[
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatMenuModule,
        MatCardModule,
        MatButtonToggleModule
    ]
})

export class MaterialModule{}